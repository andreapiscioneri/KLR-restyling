import type { Metadata } from "next";
import { Klr10Client } from "./_client";
import { getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-4231";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.tenYears?.seo;
  const title = seo?.title || "KLR 10 Years | A Decade of Trust and Teamwork";
  const description = seo?.description ||
    "KLR Europe celebrates 10 years of commitment, teamwork and growth. From a single office in Koper in 2015 to 43 professionals across 20+ European markets.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/10-years" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/10-years",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe 10th Anniversary" }],
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
  const tenYearsCms = (pages as Record<string, unknown>)?.tenYears as Parameters<typeof Klr10Client>[0]["initialCms"];
  return <Klr10Client initialCms={tenYearsCms} />;
}
