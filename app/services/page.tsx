import type { Metadata } from "next";
import { ServicesClient } from "./_client";
import { getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-934";
const SITE = "https://klr-europe.com";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.services?.seo;
  const title = seo?.title || "Services | 360° Loyalty Campaign Design & Execution";
  const description = seo?.description ||
    "KLR Europe offers 360° loyalty marketing services: strategy, full campaign management, and analytics. Proven across 340+ campaigns in 20+ European countries.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/services" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/services",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Services" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG],
    },
  };
}

export default async function Page() {
  const pages = await getPages();
  const servicesCms = (pages as Record<string, unknown>)?.services as Parameters<typeof ServicesClient>[0]["initialCms"];
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}/services#service`,
    name: "KLR Europe Loyalty Marketing Services",
    description:
      "End-to-end loyalty campaign services for grocery and petrol retailers: strategy, campaign management, and analytics.",
    serviceType: "Loyalty Marketing",
    provider: {
      "@type": "Organization",
      name: "KLR-EVROPA d.o.o.",
      url: SITE,
    },
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
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Campaign Management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Measurement and Analytics",
          },
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}/services#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does KLR Europe provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KLR Europe provides loyalty campaign strategy, full campaign management, and measurement and analytics for retail and petrol chains.",
        },
      },
      {
        "@type": "Question",
        name: "Does KLR Europe manage campaign logistics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. KLR manages procurement, warehousing, distribution, and campaign rollout support across multiple European markets.",
        },
      },
      {
        "@type": "Question",
        name: "Which industries are covered by KLR loyalty campaigns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KLR focuses on grocery retail and petrol retail, delivering loyalty programs tailored to each sector's shopper behavior.",
        },
      },
      {
        "@type": "Question",
        name: "In how many countries can KLR activate campaigns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KLR supports loyalty campaigns across 20+ European countries through local operational presence and partner networks.",
        },
      },
      {
        "@type": "Question",
        name: "How does KLR measure campaign performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KLR tracks KPIs such as uplift, engagement, redemption, and repeat behavior, then provides post-campaign analysis and optimization recommendations.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicesClient initialCms={servicesCms} />
    </>
  );
}
