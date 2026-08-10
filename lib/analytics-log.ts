import { readContent, writeContent } from "./storage";

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

const KEY = "siteVisits";
const MAX_RECORDS = 20000;

export async function readVisitLog(): Promise<VisitRecord[]> {
  return readContent<VisitRecord[]>(KEY, []);
}

export async function appendVisit(record: VisitRecord): Promise<void> {
  const log = await readVisitLog();
  const next = [...log, record].slice(-MAX_RECORDS);
  await writeContent(KEY, next);
}

export async function clearVisitLog(): Promise<void> {
  await writeContent(KEY, []);
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
