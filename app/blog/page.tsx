import type { Metadata } from "next";
import { BlogClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2022/12/KLR-HUMAN-CENTERED-scaled-e1674495532538.jpg`;

export const metadata: Metadata = {
  title: "Insights | Loyalty Marketing Trends & Stories",
  description:
    "Your go-to spot for fresh takes on loyalty marketing, industry trends, and the people behind KLR's success. Expert insights on grocery and fuel retail loyalty across Europe.",
  alternates: { canonical: "https://klr-europe.com/blog" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/blog",
    title: "Insights | Loyalty Marketing Trends & Stories",
    description:
      "Fresh takes on loyalty marketing, industry trends, and the people behind KLR's success.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Insights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Loyalty Marketing Trends & Stories",
    description: "Fresh takes on loyalty marketing, industry trends, and the people behind KLR.",
    images: [OG],
  },
};

export default function Page() {
  return <BlogClient />;
}
