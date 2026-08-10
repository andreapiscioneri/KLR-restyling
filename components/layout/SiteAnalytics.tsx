"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsentCategories } from "@/components/layout/CookieConsent";
import { readConsent } from "@/lib/cookie-consent";

const SESSION_KEY = "klr_analytics_sid";
const ATTRIBUTION_KEY = "klr_analytics_attribution";

function getSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
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

export function SiteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categories = useConsentCategories();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!categories?.optimization) return;
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
  }, [pathname, searchParams, categories?.optimization]);

  return null;
}
