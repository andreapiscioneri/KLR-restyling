import type { Metadata } from "next";
import { AboutClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2025/09/KLR10-14-e1758293512394.jpg`;
const SITE = "https://klr-europe.com";

export const metadata: Metadata = {
  title: "About | People First to Deliver the Best Results",
  description:
    "KLR Europe is a human-centered loyalty marketing company: 10+ years, 340+ campaigns, 150+ retail clients, 43 people from 11 nationalities across 20+ European markets.",
  alternates: { canonical: "https://klr-europe.com/about" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/about",
    title: "About KLR Europe | People First to Deliver the Best Results",
    description:
      "A 43-person international team. 11 nationalities. One shared passion: designing loyalty experiences that customers feel, trust, and value.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About KLR Europe | People First",
    description:
      "43 people, 11 nationalities, 10+ years and 340+ campaigns across 20+ European markets.",
    images: [OG],
  },
};

export default function Page() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE}/about#aboutpage`,
    url: `${SITE}/about`,
    name: "About KLR Europe",
    description:
      "KLR Europe is a human-centered loyalty marketing company delivering campaigns for grocery and petrol retail chains across Europe.",
    inLanguage: "en",
    about: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "KLR-EVROPA d.o.o.",
      alternateName: "KLR Europe",
      url: SITE,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: OG,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
