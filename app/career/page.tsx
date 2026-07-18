import type { Metadata } from "next";
import { CareerClient } from "./_client";
import { getPages, getPositions } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-1064";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.career?.seo;
  const title = seo?.title || "Career | A Loyal Team of Professionals";
  const description = seo?.description ||
    "Join KLR Europe — a team of professionals of different nationalities, beliefs and cultures united by cohesion, trust and mutual respect. Be part of our international loyalty marketing team.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/career" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/career",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Career" }],
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
  const [pages, positions] = await Promise.all([getPages(), getPositions()]);
  const careerCms = (pages as Record<string, unknown>)?.career as Parameters<typeof CareerClient>[0]["initialCms"];
  return <CareerClient initialCms={careerCms} initialPositions={positions as Parameters<typeof CareerClient>[0]["initialPositions"]} />;
}
