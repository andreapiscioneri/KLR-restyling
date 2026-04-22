import type { Metadata } from "next";
import { ServicesClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2022/12/KLR-SERVICES-scaled.jpg`;
const SITE = "https://klr-europe.com";

export const metadata: Metadata = {
  title: "Services | 360° Loyalty Campaign Design & Execution",
  description:
    "KLR Europe offers 360° loyalty marketing services: strategy, full campaign management, and analytics. Proven across 340+ campaigns in 20+ European countries.",
  alternates: { canonical: "https://klr-europe.com/services" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/services",
    title: "Services | 360° Loyalty Campaign Design & Execution",
    description:
      "From strategy to delivery, we handle every stage of your loyalty campaign. Emotional design, exceptional rewards, memorable moments.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | 360° Loyalty Campaign Design & Execution",
    description:
      "From strategy to delivery, proven in 340+ campaigns across 20+ European countries.",
    images: [OG],
  },
};

export default function Page() {
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
      <ServicesClient />
    </>
  );
}
