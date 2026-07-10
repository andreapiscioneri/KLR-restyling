import { readContent, writeContent } from "./storage";

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

const KEY = "cookieConsents";
const MAX_RECORDS = 5000;

export async function readConsentLog(): Promise<StoredConsentRecord[]> {
  return readContent<StoredConsentRecord[]>(KEY, []);
}

export async function appendConsentRecord(record: StoredConsentRecord): Promise<void> {
  const log = await readConsentLog();
  const withoutDuplicate = log.filter((r) => r.id !== record.id);
  const next = [...withoutDuplicate, record].slice(-MAX_RECORDS);
  await writeContent(KEY, next);
}

export async function deleteConsentRecord(id: string): Promise<void> {
  const log = await readConsentLog();
  await writeContent(KEY, log.filter((r) => r.id !== id));
}

export async function clearConsentLog(): Promise<void> {
  await writeContent(KEY, []);
}
