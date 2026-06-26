import type { Metadata } from "next";
import { TeamClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2025/09/KLR10-14-e1758293512394.jpg`;

export const metadata: Metadata = {
  title: "Team | The People Behind KLR Europe",
  description:
    "Meet the 43-person international team behind KLR Europe's loyalty campaigns. Leadership, operations, and creative talent from 11 nationalities working across 20+ European markets.",
  alternates: { canonical: "https://klr-europe.com/team" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/team",
    title: "Team | The People Behind KLR Europe",
    description:
      "43 people. 11 nationalities. 11 locations across Europe. One shared passion for designing loyalty experiences.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team | The People Behind KLR Europe",
    description: "43 people. 11 nationalities. 11 locations across Europe.",
    images: [OG],
  },
};

export default function Page() {
  return <TeamClient />;
}
