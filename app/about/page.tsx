import type { Metadata } from "next";
import { AboutClient } from "./_client";
import { getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-4569";
const SITE = "https://klr-europe.com";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.about?.seo;
  const title = seo?.title || "About | People First to Deliver the Best Results";
  const description = seo?.description ||
    "KLR Europe is a human-centered loyalty marketing company: 10+ years, 340+ campaigns, 150+ retail clients, 43 people from 11 nationalities across 20+ European markets.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/about" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/about",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Team" }],
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
  const aboutCms = (pages as Record<string, unknown>)?.about as Parameters<typeof AboutClient>[0]["initialCms"];
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
      <AboutClient initialCms={aboutCms} />
    </>
  );
}
