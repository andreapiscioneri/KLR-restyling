import type { Metadata } from "next";
import { BrandsClient } from "./_client";

export const metadata: Metadata = {
  title: "Brands | Exceptional Rewards for Retail Loyalty",
  description:
    "KLR Europe partners with world-class brands — Oracle Red Bull Racing, NASA, Bugatti, Pintinox, Zanussi and more — to create exclusive reward collections for retail loyalty campaigns across Europe.",
  alternates: { canonical: "/brands" },
};

export default function Page() {
  return <BrandsClient />;
}
