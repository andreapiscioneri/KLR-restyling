import type { Metadata } from "next";
import { fallbackPosts } from "@/src/app/data";
import { BlogDetailClient } from "./_client";

export async function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = fallbackPosts.find((p) => p.slug === params.slug);
  return {
    title: post?.title ?? "Blog Post",
    description: post?.excerpt ?? "KLR Europe insights.",
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogDetailClient slug={params.slug} />;
}
