import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { fallbackPosts } from "@/src/app/data";
import { BlogDetailClient } from "./_client";

export const dynamicParams = true;

const WP_API = "https://klr-europe.com/wp-json/wp/v2/posts";
const SITE = "https://klr-europe.com";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  img: string;
  link: string;
  category: string;
  contentHtml?: string;
};

function stripHtml(value: string) {
  return value
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&nbsp;/g, " ");
}

const fetchBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const local = fallbackPosts.find((p) => p.slug === slug);
  if (local) {
    return local;
  }

  try {
    const response = await fetch(`${WP_API}?slug=${encodeURIComponent(slug)}&_embed`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const post = data[0];
    return {
      id: post.id,
      slug: post.slug,
      title: stripHtml(post.title.rendered.replace(/<[^>]+>/g, "")),
      date: String(post.date).slice(0, 10),
      excerpt: stripHtml(post.excerpt.rendered.replace(/<[^>]+>/g, "")).trim().slice(0, 280),
      img: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || fallbackPosts[0].img,
      link: `/blog/${post.slug}`,
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Post",
      contentHtml: stripHtml(post.content.rendered),
    };
  } catch {
    return null;
  }
});

export async function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  return {
    title: `${post.title} | KLR Europe`,
    description: post.excerpt || "KLR Europe insights on loyalty marketing.",
    alternates: { canonical: `/blog/${params.slug}` },
    authors: [{ name: "KLR Europe", url: SITE }],
    publisher: "KLR-EVROPA d.o.o.",
    openGraph: {
      type: "article",
      url: `/blog/${params.slug}`,
      title: `${post.title} | KLR Europe`,
      description: post.excerpt || "KLR Europe insights on loyalty marketing.",
      siteName: "KLR Europe",
      images: [{ url: post.img, width: 1200, height: 630, alt: post.title }],
      publishedTime: `${post.date}T00:00:00.000Z`,
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | KLR Europe`,
      description: post.excerpt || "KLR Europe insights on loyalty marketing.",
      images: [post.img],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE}/blog/${params.slug}#article`,
    mainEntityOfPage: `${SITE}/blog/${params.slug}`,
    headline: post.title,
    description: post.excerpt,
    datePublished: `${post.date}T00:00:00.000Z`,
    dateModified: `${post.date}T00:00:00.000Z`,
    inLanguage: "en",
    image: [post.img],
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: "KLR Europe",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "KLR-EVROPA d.o.o.",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: "https://klr-europe.com/wp-content/uploads/2022/10/KLR-Logosito.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailClient slug={params.slug} initialPost={post} />
    </>
  );
}
