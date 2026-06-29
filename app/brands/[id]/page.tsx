import type { Metadata } from "next";
import { brands as fallbackBrands } from "@/src/app/data";
import { getBrands } from "@/lib/content";
import { BrandDetailClient } from "./_client";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  return fallbackBrands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cmsBrands = (await getBrands()) as typeof fallbackBrands | null;
  const brands = cmsBrands?.length ? cmsBrands : fallbackBrands;
  const brand = brands.find((b) => b.id === params.id);
  const title = brand ? `${brand.name} | Brand Partner — KLR Europe` : "Brand Partner | KLR Europe";
  const description = brand
    ? `${brand.desc} ${brand.campaigns} campaigns across ${brand.countries} countries — partnered with KLR Europe since ${brand.since}.`
    : "KLR Europe brand partner details.";
  const image = brand?.img ?? "https://klr-europe.com/wp-content/uploads/2022/12/KLR_TailorMade-.png";
  return {
    title,
    description,
    alternates: { canonical: `https://klr-europe.com/brands/${params.id}` },
    openGraph: {
      type: "website",
      url: `https://klr-europe.com/brands/${params.id}`,
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: image, width: 1200, height: 630, alt: brand?.name ?? "KLR Brand Partner" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <BrandDetailClient id={params.id} />;
}
