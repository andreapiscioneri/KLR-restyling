import type { Metadata } from "next";
import { CareerClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2022/12/KLR-CAREER-SUPERHERO-1024x1024.jpg`;

export const metadata: Metadata = {
  title: "Career | A Loyal Team of Professionals",
  description:
    "Join KLR Europe — a team of professionals of different nationalities, beliefs and cultures united by cohesion, trust and mutual respect. Be part of our international loyalty marketing team.",
  alternates: { canonical: "https://klr-europe.com/career" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/career",
    title: "Career at KLR Europe | A Loyal Team of Professionals",
    description:
      "Join a team of 43 professionals from 11 nationalities. Freedom to contribute, support to grow, recognition for the value you bring.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Career" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career at KLR Europe",
    description: "43 professionals, 11 nationalities. Freedom to contribute, support to grow.",
    images: [OG],
  },
};

export default function Page() {
  return <CareerClient />;
}
