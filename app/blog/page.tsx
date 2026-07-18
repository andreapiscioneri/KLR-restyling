import type { Metadata } from "next";
import { BlogClient } from "./_client";
import { getPosts, getPages } from "@/lib/content";

export const revalidate = 60;

const OG = "/api/media/wp-991";

export async function generateMetadata(): Promise<Metadata> {
  const pages = await getPages() as Record<string, { seo?: { title?: string; description?: string } }>;
  const seo = pages.blog?.seo;
  const title = seo?.title || "Insights | Loyalty Marketing Trends & Stories";
  const description = seo?.description ||
    "Your go-to spot for fresh takes on loyalty marketing, industry trends, and the people behind KLR's success. Expert insights on grocery and fuel retail loyalty across Europe.";
  return {
    title,
    description,
    alternates: { canonical: "https://klr-europe.com/blog" },
    openGraph: {
      type: "website",
      url: "https://klr-europe.com/blog",
      title,
      description,
      siteName: "KLR Europe",
      images: [{ url: OG, width: 1200, height: 630, alt: "KLR Europe Insights" }],
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
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  const hero = (pages as Record<string, unknown>)?.blog as { hero?: unknown } | undefined;
  return (
    <BlogClient
      initialPosts={posts as Parameters<typeof BlogClient>[0]["initialPosts"]}
      initialHero={hero?.hero as Parameters<typeof BlogClient>[0]["initialHero"]}
    />
  );
}
