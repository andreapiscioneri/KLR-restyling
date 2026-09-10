"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { readConsent } from "@/lib/cookie-consent";

const SESSION_KEY = "klr_analytics_sid";
const ATTRIBUTION_KEY = "klr_analytics_attribution";

/**
 * crypto.randomUUID() esiste solo nei contesti sicuri (HTTPS o
 * localhost): servito da un IP in HTTP semplice è undefined, e la
 * chiamata sollevava un TypeError che faceva fallire l'idratazione
 * dell'intera pagina — non solo il tracciamento.
 *
 * crypto.getRandomValues() non ha quella restrizione, quindi si usa
 * quello per comporre un UUID v4 con lo stesso formato: l'endpoint
 * /api/track valida il sessionId con /^[0-9a-f-]{8,64}$/i.
 */
function randomId(): string {
  const c: Crypto | undefined = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;

  if (typeof c?.randomUUID === "function") {
    return c.randomUUID();
  }

  if (typeof c?.getRandomValues === "function") {
    const bytes = c.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // versione 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variante RFC 4122
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // Nessuna API crittografica disponibile: l'id serve solo a raggruppare
  // le visite di una stessa scheda, non ha requisiti di sicurezza.
  const rand = () => Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, "0");
  return `${rand()}-${rand().slice(0, 4)}-4${rand().slice(0, 3)}-a${rand().slice(0, 3)}-${rand()}${rand().slice(0, 4)}`;
}

function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = randomId();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    // sessionStorage può essere inaccessibile (navigazione privata,
    // cookie di terze parti bloccati): l'id si rigenera a ogni chiamata.
    return randomId();
  }
}

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
};

// Reads the first-touch paid/campaign attribution stored for this session (set on first landing).
export function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function captureAttribution(params: URLSearchParams | null) {
  try {
    if (!params) return;
    const existing = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (existing) return; // first-touch only, keep the original campaign for this session
    const attribution: Attribution = {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      gclid: params.get("gclid") || undefined,
    };
    if (Object.values(attribution).some(Boolean)) {
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    }
  } catch {
    // ignore
  }
}

// Fires a custom analytics event (e.g. CTA click). Silently no-ops without optimization consent.
export function trackEvent(type: "cta_click", label: string) {
  try {
    if (typeof window === "undefined") return;
    if (!readConsent()?.categories?.optimization) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname, sessionId: getSessionId(), type, label }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

// Basic pageview counting runs regardless of cookie consent: it uses a
// per-tab sessionStorage id (not a persistent cookie) and no cross-site
// identifiers, so it isn't gated behind the "optimization" consent category.
export function SiteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    captureAttribution(searchParams);
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    if (!path || lastTracked.current === path) return;
    lastTracked.current = path;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || undefined,
        sessionId: getSessionId(),
        ...getAttribution(),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
}
