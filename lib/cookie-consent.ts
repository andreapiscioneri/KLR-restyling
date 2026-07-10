"use client";

export type ConsentCategories = {
  basic: boolean;
  content: boolean;
  optimization: boolean;
  ads: boolean;
};

export type ConsentLevel = "silver" | "gold" | "platinum" | "custom";
export type ConsentDuration = "1m" | "6m" | "12m";

export type ConsentRecord = {
  id: string;
  level: ConsentLevel;
  duration: ConsentDuration;
  categories: ConsentCategories;
  consentedAt: string;
  expiresAt: string;
};

export const STORAGE_KEY = "klr_cookie_consent";
export const CONSENT_EVENT = "klr:cookie-consent-changed";
export const OPEN_PREFERENCES_EVENT = "klr:cookie-consent-open";

export const LEVEL_PRESETS: Record<Exclude<ConsentLevel, "custom">, ConsentCategories> = {
  silver:   { basic: true, content: false, optimization: false, ads: false },
  gold:     { basic: true, content: true,  optimization: true,  ads: false },
  platinum: { basic: true, content: true,  optimization: true,  ads: true },
};

export const DURATION_MONTHS: Record<ConsentDuration, number> = {
  "1m": 1,
  "6m": 6,
  "12m": 12,
};

export function detectLevel(categories: ConsentCategories): ConsentLevel {
  for (const [level, preset] of Object.entries(LEVEL_PRESETS) as [Exclude<ConsentLevel, "custom">, ConsentCategories][]) {
    if (
      preset.basic === categories.basic &&
      preset.content === categories.content &&
      preset.optimization === categories.optimization &&
      preset.ads === categories.ads
    ) {
      return level;
    }
  }
  return "custom";
}

export function makeExpiry(duration: ConsentDuration, from = new Date()): string {
  const d = new Date(from);
  d.setMonth(d.getMonth() + DURATION_MONTHS[duration]);
  return d.toISOString();
}

export function makeConsentId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw) as ConsentRecord;
    if (!record?.expiresAt || new Date(record.expiresAt).getTime() < Date.now()) return null;
    return record;
  } catch {
    return null;
  }
}

export function writeConsent(record: ConsentRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  document.cookie = `klr_consent=${record.level}; max-age=${DURATION_MONTHS[record.duration] * 30 * 86400}; path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
}

export function clearConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  document.cookie = "klr_consent=; max-age=0; path=/";
}
