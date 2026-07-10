"use client";

import Script from "next/script";
import { useConsentCategories } from "@/components/layout/CookieConsent";

export function GoogleAnalyticsLoader({ gaId }: { gaId?: string }) {
  const categories = useConsentCategories();

  if (!gaId || !categories?.optimization) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('config', ${JSON.stringify(gaId)});
        `}
      </Script>
    </>
  );
}
