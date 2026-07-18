import type { Metadata } from "next";
import { HomePage, type HomeStats, type HomeStudies } from "./_home";
import { getStats, getStudies, getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-1010";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.home?.seo;
  const title = seo?.title || "KLR Europe | Key to Loyalty in Retail";
  const description = seo?.description ||
    "KLR Europe designs emotional loyalty campaigns for grocery and fuel retail chains. 340+ campaigns delivered across 20+ European countries. Built on trust and teamwork.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe — Emotional Loyalty Marketing" }],
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
  const [stats, studies, pages] = await Promise.all([getStats(), getStudies(), getPages()]);
  return (
    <HomePage
      initialStats={stats as HomeStats | undefined}
      initialStudies={(studies ?? undefined) as HomeStudies | undefined}
      initialPages={pages as Record<string, Record<string, unknown>>}
    />
  );
}
