import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { GoogleAnalyticsLoader } from "@/components/layout/GoogleAnalyticsLoader";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LogoLoader } from "@/components/ui/LogoLoader";
import { PageTransition } from "@/components/ui/PageTransition";
import { getColors, getSettings } from "@/lib/content";

const CDN = "https://klr-europe.com/wp-content/uploads";
const SITE = "https://klr-europe.com";
const DEFAULT_OG = `${CDN}/2022/12/KLR-HERO-HOME-scaled.jpg`;

export const revalidate = 60;

export const viewport: Viewport = {
  themeColor: "#2E2784",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

type SiteSettings = {
  siteDescription?: string;
  siteKeywords?: string;
  socialLinks?: Record<string, string>;
  googleAnalyticsId?: string;
  customCss?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getSettings()) as SiteSettings;
  const description = settings.siteDescription ||
    "KLR Europe designs and delivers emotional loyalty campaigns for grocery and fuel retail chains across 20+ European markets. 340+ campaigns, 150+ clients, 10+ years.";
  const keywords = settings.siteKeywords
    ? settings.siteKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [
        "loyalty marketing",
        "retail loyalty",
        "loyalty campaigns",
        "grocery retail",
        "petrol retail",
        "KLR Europe",
        "loyalty program Europe",
        "emotional loyalty",
        "reward campaigns",
        "collectible campaigns",
        "fuel loyalty",
      ];

  return {
  metadataBase: new URL(SITE),
  alternates: {
    canonical: SITE,
  },
  title: {
    default: "KLR Europe | Key to Loyalty in Retail",
    template: "%s | KLR Europe",
  },
  description,
  keywords,
  authors: [{ name: "KLR Europe", url: SITE }],
  creator: "KLR Europe",
  publisher: "KLR-EVROPA d.o.o.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "KLR Europe",
    title: "KLR Europe | Key to Loyalty in Retail",
    description:
      "We design and deliver emotional loyalty campaigns for European retail and petrol chains. 340+ campaigns, 150+ clients, 10+ years.",
    images: [
      {
        url: DEFAULT_OG,
        width: 1200,
        height: 630,
        alt: "KLR Europe — Emotional Loyalty Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@klreurope",
    creator: "@klreurope",
    title: "KLR Europe | Key to Loyalty in Retail",
    description:
      "Emotional loyalty campaigns for European retail and petrol chains. 340+ campaigns across 20+ countries.",
    images: [DEFAULT_OG],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: { url: "/favicon.png", type: "image/png" },
    shortcut: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  };
}

function buildOrgJsonLd(extraSameAs: string[]) {
  return {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "KLR-EVROPA d.o.o.",
  alternateName: "KLR Europe",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: "https://klr-europe.com/wp-content/uploads/2022/10/KLR-Logosito.png",
    width: 400,
    height: 135,
  },
  image: DEFAULT_OG,
  description:
    "KLR Europe is a human-centered loyalty marketing company specializing in emotional loyalty campaigns for grocery and petrol retail chains across Europe. 10+ years, 340+ campaigns, 20+ countries.",
  foundingDate: "2015",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 43,
  },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Ulica 15. Maja 19",
      addressLocality: "Koper",
      postalCode: "SI-6000",
      addressRegion: "Obalno-kraška",
      addressCountry: "SI",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Via XXV Aprile 66",
      addressLocality: "Rovato",
      postalCode: "25038",
      addressRegion: "Brescia",
      addressCountry: "IT",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "info@klr-europe.com",
      telephone: "+386-5-902-87-58",
      contactType: "customer service",
      areaServed: "EU",
      availableLanguage: ["English", "Italian", "Slovenian"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/klr-key-to-loyalty-in-retail/",
    "https://www.youtube.com/@klreurope",
    ...extraSameAs,
  ],
  areaServed: {
    "@type": "Place",
    name: "Europe",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Loyalty Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Loyalty Campaign Strategy",
          description: "Strategic design and development of collectible loyalty campaigns for retail and petrol chains.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Campaign Management",
          description: "End-to-end execution of loyalty campaigns including brand licensing, procurement, and distribution.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Loyalty Measurement & Analytics",
          description: "KPI tracking, post-campaign analytics, and customer engagement measurement.",
        },
      },
    ],
  },
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "KLR Europe",
  description: "Human-centered loyalty marketing for European retail chains.",
  publisher: { "@id": `${SITE}/#organization` },
  hasPart: [
    { "@type": "WebPage", "@id": `${SITE}/about` },
    { "@type": "WebPage", "@id": `${SITE}/services` },
    { "@type": "WebPage", "@id": `${SITE}/work` },
    { "@type": "WebPage", "@id": `${SITE}/brands` },
    { "@type": "WebPage", "@id": `${SITE}/team` },
    { "@type": "WebPage", "@id": `${SITE}/blog` },
    { "@type": "WebPage", "@id": `${SITE}/contact` },
    { "@type": "WebPage", "@id": `${SITE}/geo` },
  ],
};

const SUPPORTED_FONTS = [
  "Inter","Poppins","Montserrat","Raleway","Nunito","Open Sans","Roboto","Lato",
  "DM Sans","Plus Jakarta Sans","Playfair Display","Merriweather","Libre Baskerville","Source Sans 3",
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [colors, settings] = await Promise.all([
    getColors() as Promise<{ headingFont?: string; bodyFont?: string; primaryColor?: string; accentColor?: string }>,
    getSettings() as Promise<SiteSettings>,
  ]);
  const headingFont = SUPPORTED_FONTS.includes(colors.headingFont ?? "") ? (colors.headingFont ?? "Inter") : "Inter";
  const bodyFont    = SUPPORTED_FONTS.includes(colors.bodyFont    ?? "") ? (colors.bodyFont    ?? "Inter") : "Inter";
  const uniqueFonts = [...new Set([headingFont, bodyFont])];
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${uniqueFonts.map(f => `family=${f.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400`).join("&")}&display=swap`;
  const primaryColor = colors.primaryColor || "#2E2784";
  const accentColor  = colors.accentColor  || "#F8AE01";
  const sameAs = Object.values(settings.socialLinks || {}).filter(Boolean);
  const gaId = settings.googleAnalyticsId?.trim();
  const customCss = settings.customCss || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={googleFontsUrl} />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-heading: '${headingFont}', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-body: '${bodyFont}', -apple-system, BlinkMacSystemFont, sans-serif;
            --color-primary: ${primaryColor};
            --color-accent: ${accentColor};
          }
          body { font-family: var(--font-body); }
          h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }
        `}} />
        {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrgJsonLd(sameAs)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {gaId && !gaId.includes("XXXXXXXXX") && <GoogleAnalyticsLoader gaId={gaId} />}
      </head>
      <body className="antialiased">
        <LenisProvider>
          <CustomCursor />
          <LogoLoader />
          <Nav />
          <main className="relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CookieConsent />
        </LenisProvider>
      </body>
    </html>
  );
}
