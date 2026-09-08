import { getDb } from "./db";

export type VisitRecord = {
  id: string;
  path: string;
  referrer?: string;
  sessionId: string;
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  visitedAt: string;
  eventType?: "pageview" | "cta_click";
  eventLabel?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
};

const MAX_RECORDS = 20000;

type Row = {
  id: string; path: string; referrer: string | null; session_id: string;
  device: string; browser: string; visited_at: string;
  event_type: string; event_label: string | null;
  utm_source: string | null; utm_medium: string | null; utm_campaign: string | null;
  utm_term: string | null; utm_content: string | null; gclid: string | null;
};

function fromRow(r: Row): VisitRecord {
  const rec: VisitRecord = {
    id: r.id, path: r.path, sessionId: r.session_id,
    device: r.device as VisitRecord["device"], browser: r.browser, visitedAt: r.visited_at,
    eventType: r.event_type as VisitRecord["eventType"],
  };
  if (r.referrer) rec.referrer = r.referrer;
  if (r.event_label) rec.eventLabel = r.event_label;
  if (r.utm_source) rec.utmSource = r.utm_source;
  if (r.utm_medium) rec.utmMedium = r.utm_medium;
  if (r.utm_campaign) rec.utmCampaign = r.utm_campaign;
  if (r.utm_term) rec.utmTerm = r.utm_term;
  if (r.utm_content) rec.utmContent = r.utm_content;
  if (r.gclid) rec.gclid = r.gclid;
  return rec;
}

export async function readVisitLog(): Promise<VisitRecord[]> {
  const rows = getDb().prepare("SELECT * FROM site_visits ORDER BY visited_at ASC").all() as Row[];
  return rows.map(fromRow);
}

/**
 * Percorso caldo: gira a ogni pageview del sito pubblico.
 *
 * La versione precedente rileggeva e riscriveva l'intero log a ogni
 * visita — a regime (20.000 record) sarebbero stati ~6,8 MB letti e
 * riscritti per singola pageview, con le visite concorrenti che si
 * sovrascrivevano a vicenda. Qui è una INSERT da poche centinaia di
 * byte, e la concorrenza la gestisce SQLite.
 */
export async function appendVisit(record: VisitRecord): Promise<void> {
  const db = getDb();
  db.prepare(`INSERT INTO site_visits
    (id, path, referrer, session_id, device, browser, visited_at, event_type, event_label,
     utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid)
    VALUES (@id, @path, @referrer, @session_id, @device, @browser, @visited_at, @event_type, @event_label,
     @utm_source, @utm_medium, @utm_campaign, @utm_term, @utm_content, @gclid)`).run({
    id: record.id, path: record.path, referrer: record.referrer ?? null, session_id: record.sessionId,
    device: record.device, browser: record.browser, visited_at: record.visitedAt,
    event_type: record.eventType ?? "pageview", event_label: record.eventLabel ?? null,
    utm_source: record.utmSource ?? null, utm_medium: record.utmMedium ?? null,
    utm_campaign: record.utmCampaign ?? null, utm_term: record.utmTerm ?? null,
    utm_content: record.utmContent ?? null, gclid: record.gclid ?? null,
  });

  const { c } = db.prepare("SELECT COUNT(*) AS c FROM site_visits").get() as { c: number };
  if (c > MAX_RECORDS) {
    db.prepare(
      "DELETE FROM site_visits WHERE rowid IN (SELECT rowid FROM site_visits ORDER BY visited_at DESC LIMIT -1 OFFSET ?)"
    ).run(MAX_RECORDS);
  }
}

export async function clearVisitLog(): Promise<void> {
  getDb().prepare("DELETE FROM site_visits").run();
}

export function detectDevice(userAgent: string): VisitRecord["device"] {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return "tablet";
  if (/mobile|iphone|android|phone/.test(ua)) return "mobile";
  return "desktop";
}

export function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome/") && !ua.includes("chromium")) return "Chrome";
  if (ua.includes("crios")) return "Chrome";
  if (ua.includes("fxios") || ua.includes("firefox")) return "Firefox";
  if (ua.includes("safari/") && !ua.includes("chrome")) return "Safari";
  return "Altro";
}
