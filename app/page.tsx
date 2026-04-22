import type { Metadata } from "next";
import { HomePage } from "./_home";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2022/12/KLR-HERO-HOME-scaled.jpg`;

export const metadata: Metadata = {
  title: "KLR Europe | Key to Loyalty in Retail",
  description:
    "KLR Europe designs emotional loyalty campaigns for grocery and fuel retail chains. 340+ campaigns delivered across 20+ European countries. Built on trust and teamwork.",
  alternates: { canonical: "https://klr-europe.com/" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/",
    title: "KLR Europe | Key to Loyalty in Retail",
    description:
      "340+ loyalty campaigns across 20+ European countries. We design emotional reward experiences that make customers come back.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe — Emotional Loyalty Marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KLR Europe | Key to Loyalty in Retail",
    description: "340+ loyalty campaigns across 20+ European countries.",
    images: [OG],
  },
};

export default function Page() {
  return <HomePage />;
}
