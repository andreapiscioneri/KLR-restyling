import { getDb, json } from "./db";

export type StoredConsentRecord = {
  id: string;
  level: "silver" | "gold" | "platinum" | "custom";
  duration: "1m" | "6m" | "12m";
  categories: { basic: boolean; content: boolean; optimization: boolean; ads: boolean };
  consentedAt: string;
  expiresAt: string;
  path?: string;
  userAgent?: string;
  loggedAt: string;
};

// NOTA: i record di consenso sono la prova da esibire in caso di
// contestazione GDPR. Il tetto è ereditato dall'implementazione
// precedente e non è mai scattato (40 record su 5000), ma andrebbe
// valutato se troncarli sia corretto: vedi nota nel README.
const MAX_RECORDS = 5000;

type Row = {
  id: string; level: string; duration: string; categories: string;
  consented_at: string; expires_at: string; path: string | null;
  user_agent: string | null; logged_at: string;
};

function fromRow(r: Row): StoredConsentRecord {
  const rec: StoredConsentRecord = {
    id: r.id,
    level: r.level as StoredConsentRecord["level"],
    duration: r.duration as StoredConsentRecord["duration"],
    categories: json.parse(r.categories, { basic: false, content: false, optimization: false, ads: false }),
    consentedAt: r.consented_at,
    expiresAt: r.expires_at,
    loggedAt: r.logged_at,
  };
  if (r.path) rec.path = r.path;
  if (r.user_agent) rec.userAgent = r.user_agent;
  return rec;
}

export async function readConsentLog(): Promise<StoredConsentRecord[]> {
  const rows = getDb().prepare("SELECT * FROM cookie_consents ORDER BY logged_at ASC").all() as Row[];
  return rows.map(fromRow);
}

export async function appendConsentRecord(record: StoredConsentRecord): Promise<void> {
  const db = getDb();
  // Lo stesso id può essere reinviato quando l'utente aggiorna le
  // preferenze: l'upsert sostituisce il record invece di duplicarlo.
  db.prepare(`INSERT INTO cookie_consents
    (id, level, duration, categories, consented_at, expires_at, path, user_agent, logged_at, source)
    VALUES (@id, @level, @duration, @categories, @consented_at, @expires_at, @path, @user_agent, @logged_at, 'live')
    ON CONFLICT(id) DO UPDATE SET
      level = excluded.level, duration = excluded.duration, categories = excluded.categories,
      consented_at = excluded.consented_at, expires_at = excluded.expires_at,
      path = excluded.path, user_agent = excluded.user_agent, logged_at = excluded.logged_at`).run({
    id: record.id, level: record.level, duration: record.duration,
    categories: json.stringify(record.categories), consented_at: record.consentedAt,
    expires_at: record.expiresAt, path: record.path ?? null,
    user_agent: record.userAgent ?? null, logged_at: record.loggedAt,
  });

  const { c } = db.prepare("SELECT COUNT(*) AS c FROM cookie_consents").get() as { c: number };
  if (c > MAX_RECORDS) {
    db.prepare(
      "DELETE FROM cookie_consents WHERE rowid IN (SELECT rowid FROM cookie_consents ORDER BY logged_at DESC LIMIT -1 OFFSET ?)"
    ).run(MAX_RECORDS);
  }
}

export async function deleteConsentRecord(id: string): Promise<void> {
  getDb().prepare("DELETE FROM cookie_consents WHERE id = ?").run(id);
}

export async function clearConsentLog(): Promise<void> {
  getDb().prepare("DELETE FROM cookie_consents").run();
}
