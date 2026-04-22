import type { Metadata } from "next";
import { BrandsClient } from "./_client";

const CDN = "https://klr-europe.com/wp-content/uploads";
const OG = `${CDN}/2022/12/KLR_TailorMade-.png`;

export const metadata: Metadata = {
  title: "Brands | Exceptional Rewards for Retail Loyalty",
  description:
    "KLR Europe partners with world-class brands — Oracle Red Bull Racing, NASA, Bugatti, Pintinox, Zanussi and more — to create exclusive reward collections for retail loyalty campaigns across Europe.",
  alternates: { canonical: "https://klr-europe.com/brands" },
  openGraph: {
    type: "website",
    url: "https://klr-europe.com/brands",
    title: "Brand Partners | Exceptional Rewards for Retail Loyalty",
    description:
      "Oracle Red Bull Racing, NASA, Bugatti, Pintinox and more — premium reward collections for European retail loyalty campaigns.",
    siteName: "KLR Europe",
    images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Brand Partners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Partners | Exceptional Rewards for Retail Loyalty",
    description: "Oracle Red Bull Racing, NASA, Bugatti and more — premium rewards for loyalty campaigns.",
    images: [OG],
  },
};

export default function Page() {
  return <BrandsClient />;
}
