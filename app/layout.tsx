import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LogoLoader } from "@/components/ui/LogoLoader";
import { PageTransition } from "@/components/ui/PageTransition";

const CDN = "https://klr-europe.com/wp-content/uploads";
const SITE = "https://klr-europe.com";
const DEFAULT_OG = `${CDN}/2022/12/KLR-HERO-HOME-scaled.jpg`;

export const viewport: Viewport = {
  themeColor: "#2E2784",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: {
    canonical: SITE,
  },
  title: {
    default: "KLR Europe | Key to Loyalty in Retail",
    template: "%s | KLR Europe",
  },
  description:
    "KLR Europe designs and delivers emotional loyalty campaigns for grocery and fuel retail chains across 20+ European markets. 340+ campaigns, 150+ clients, 10+ years.",
  keywords: [
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
  ],
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
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/favicon.svg", type: "image/svg+xml" },
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

const orgJsonLd = {
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
      streetAddress: "Via XXV Aprile 68",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
        </LenisProvider>
      </body>
    </html>
  );
}
