import type { Metadata } from "next";
import { Klr10Client } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2025/05/KLR-anniverarsio-10-anni-def.png`;

export const metadata: Metadata = {
  title: "KLR 10 Years | A Decade of Trust and Teamwork",
  description:
    "KLR Europe celebrates 10 years of commitment, teamwork and growth. From a single office in Koper in 2015 to 43 professionals across 20+ European markets.",
  alternates: { canonical: "https://klr-europe.com/10-years" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/10-years",
    title: "KLR 10 Years | A Decade of Trust and Teamwork",
    description:
      "10 years. 340+ campaigns. 20+ countries. From Koper to Europe — a decade of loyalty, trust and teamwork.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe 10th Anniversary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KLR 10 Years | A Decade of Trust and Teamwork",
    description: "10 years. 340+ campaigns. 20+ countries.",
    images: [OG],
  },
};

export default function Page() {
  return <Klr10Client />;
}
