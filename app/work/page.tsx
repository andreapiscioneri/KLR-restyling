import type { Metadata } from "next";
import { WorkClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2025/08/Spar-TZ_RedBull-cover-circle.jpg`;

export const metadata: Metadata = {
  title: "Case Studies | Loyalty Campaigns that Drive Success",
  description:
    "340+ loyalty campaigns across 20+ European countries. Explore how KLR Europe helped grocery and fuel retail chains increase visits, grow basket size, and build lasting customer relationships.",
  alternates: { canonical: "https://klr-europe.com/work" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/work",
    title: "Case Studies | Real Results for Real Retail Chains",
    description:
      "340+ campaigns across 20+ countries. Explore how KLR helps grocery and fuel chains achieve measurable loyalty results.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Case Studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Real Results for Real Retail Chains",
    description: "340+ campaigns across 20+ countries.",
    images: [OG],
  },
};

export default function Page() {
  return <WorkClient />;
}
