import type { Metadata } from "next";
import { BrandsClient } from "./_client";
import { getBrands, getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-916";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.brands?.seo;
  const title = seo?.title || "Brands | Exceptional Rewards for Retail Loyalty";
  const description = seo?.description ||
    "KLR Europe partners with world-class brands — Oracle Red Bull Racing, NASA, Bugatti, Pintinox, Zanussi and more — to create exclusive reward collections for retail loyalty campaigns across Europe.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/brands" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/brands",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Brand Partners" }],
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
  const [brands, pages] = await Promise.all([getBrands(), getPages()]);
  const brandsCms = (pages as Record<string, unknown>)?.brands as Parameters<typeof BrandsClient>[0]["initialBrandsCms"];
  return (
    <BrandsClient
      initialBrands={brands as Parameters<typeof BrandsClient>[0]["initialBrands"]}
      initialBrandsCms={brandsCms}
    />
  );
}
