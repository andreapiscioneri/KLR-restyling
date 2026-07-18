import type { Metadata } from "next";
import { WorkClient } from "./_client";
import { getStudies, getPages } from "@/lib/content";
import { studies as fallbackStudies } from "@/src/app/data";

export const revalidate = 60;

const OG = "/api/media/wp-4522";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.caseStudies?.seo;
  const title = seo?.title || "Case Studies | Loyalty Campaigns that Drive Success";
  const description = seo?.description ||
    "340+ loyalty campaigns across 20+ European countries. Explore how KLR Europe helped grocery and fuel retail chains increase visits, grow basket size, and build lasting customer relationships.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/work" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/work",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Case Studies" }],
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
  const [cmsStudies, pages] = await Promise.all([
    getStudies() as Promise<typeof fallbackStudies | null>,
    getPages(),
  ]);
  const pageData = (pages as Record<string, unknown>)?.caseStudies;
  return (
    <WorkClient
      initialStudies={cmsStudies?.length ? cmsStudies : fallbackStudies}
      initialPageData={pageData as Parameters<typeof WorkClient>[0]["initialPageData"]}
    />
  );
}
