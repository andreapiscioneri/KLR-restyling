import type { Metadata } from "next";
import { fallbackPosts } from "@/src/app/data";
import { BlogDetailClient } from "./_client";

export const dynamicParams = true;

export async function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = fallbackPosts.find((p) => p.slug === params.slug);
  return {
    title: post ? `${post.title} | KLR Europe` : "Blog Post | KLR Europe",
    description: post?.excerpt ?? "KLR Europe insights on loyalty marketing.",
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogDetailClient slug={params.slug} />;
}
