import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, getColors } from "@/lib/content";
import { BlogDetailClient } from "./_client";

export const dynamicParams = true;
export const revalidate = 60;

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
  authorName?: string;
  authorAvatar?: string;
};

async function loadPosts(): Promise<BlogPost[]> {
  const posts = (await getPosts()) as BlogPost[] | null;
  return posts ?? [];
}

export async function generateStaticParams() {
  const posts = await loadPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const posts = await loadPosts();
  const post = posts.find((p) => p.slug === params.slug);
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
  const posts = await loadPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const colors = (await getColors()) as { logoUrl?: string } | null;
  const logoUrl = colors?.logoUrl || "/klr-logo.png";
  const absoluteLogoUrl = logoUrl.startsWith("http") ? logoUrl : `${SITE}${logoUrl}`;

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
        url: absoluteLogoUrl,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogDetailClient slug={params.slug} initialPost={post} initialOthers={others} />
    </>
  );
}
