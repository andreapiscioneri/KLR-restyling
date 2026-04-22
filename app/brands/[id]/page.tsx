import type { Metadata } from "next";
import { brands } from "@/src/app/data";
import { BrandDetailClient } from "./_client";

export async function generateStaticParams() {
  return brands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const brand = brands.find((b) => b.id === params.id);
  return {
    title: brand ? `${brand.name} | Brand Partner` : "Brand Partner",
    description: brand?.desc ?? "KLR Europe brand partner details.",
    alternates: { canonical: `/brands/${params.id}` },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <BrandDetailClient id={params.id} />;
}
