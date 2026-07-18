import type { Metadata } from "next";
import { TeamClient } from "./_client";
import { getLeadership, getStats, getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-4569";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.team?.seo;
  const title = seo?.title || "Team | The People Behind KLR Europe";
  const description = seo?.description ||
    "Meet the 43-person international team behind KLR Europe's loyalty campaigns. Leadership, operations, and creative talent from 11 nationalities working across 20+ European markets.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/team" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/team",
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
  const [leadership, stats, pages] = await Promise.all([getLeadership(), getStats(), getPages()]);
  const teamCms = (pages as Record<string, unknown>)?.team as Parameters<typeof TeamClient>[0]["initialTeamCms"];
  return (
    <TeamClient
      initialLeadership={leadership as Parameters<typeof TeamClient>[0]["initialLeadership"]}
      initialStats={stats as Parameters<typeof TeamClient>[0]["initialStats"]}
      initialTeamCms={teamCms}
    />
  );
}
