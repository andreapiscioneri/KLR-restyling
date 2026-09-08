import type { Metadata } from "next";
import type { Brand, Study } from "@/lib/content-schema";
import { getBrands, getPublishedStudies } from "@/lib/content";
import { BrandDetailClient } from "./_client";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const brands = ((await getBrands()) as { id?: string }[] | null) ?? [];
  return brands.map((b) => b?.id).filter((id): id is string => Boolean(id)).map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const brands = ((await getBrands()) as Brand[] | null) ?? [];
  const brand = brands.find((b) => b.id === params.id);
  const title = brand ? `${brand.name} | Brand Partner — KLR Europe` : "Brand Partner | KLR Europe";
  const description = brand
    ? `${brand.desc} ${brand.campaigns} campaigns across ${brand.countries} countries — partnered with KLR Europe since ${brand.since}.`
    : "KLR Europe brand partner details.";
  const image = brand?.img ?? "/api/media/wp-916";
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

export default async function Page({ params }: { params: { id: string } }) {
  const [cmsBrands, cmsStudies] = await Promise.all([
    getBrands() as Promise<Brand[] | null>,
    getPublishedStudies() as Promise<Study[] | null>,
  ]);
  const brands = cmsBrands ?? [];
  const studies = cmsStudies ?? [];
  return <BrandDetailClient id={params.id} initialBrands={brands} initialStudies={studies} />;
}
