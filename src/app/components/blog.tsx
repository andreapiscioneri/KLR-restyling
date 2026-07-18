"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { softShadow } from "./ui-bits";
import { fallbackPosts, images, type Post } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const CATEGORIES = ["All", "Loyalty Marketing", "Retail Trends", "Leadership & Culture", "KLR Life"] as const;
const PAGE_SIZE = 9;

type InsightCategory = (typeof CATEGORIES)[number];
type InsightPost = Post & {
  normalizedCategory: Exclude<InsightCategory, "All">;
  authorName: string;
  authorAvatar: string;
  readingTime: string;
};

function normalizeCategory(raw: string): Exclude<InsightCategory, "All"> {
  const v = raw.toLowerCase();
  if (v.includes("loyalty")) return "Loyalty Marketing";
  if (v.includes("retail") || v.includes("trend") || v.includes("business")) return "Retail Trends";
  if (v.includes("leadership") || v.includes("culture")) return "Leadership & Culture";
  return "KLR Life";
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 220))} min read`;
}

function toInsightPost(p: Post): InsightPost {
  return {
    ...p,
    normalizedCategory: normalizeCategory(p.category),
    authorName: "KLR Editorial Team",
    authorAvatar: images.teamPhoto,
    readingTime: estimateReadingTime(p.excerpt),
  };
}

type BlogHeroData = { eyebrow?: string; title?: string; subtitle?: string; _visible?: boolean };
type RawPost = { id: number | string; slug: string; title: string; date: string; excerpt?: string; img?: string; category?: string; contentHtml?: string };

function toInsightPostFromCms(p: RawPost): InsightPost {
  return {
    id: typeof p.id === "number" ? p.id : Number(p.id) || 0,
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt || "",
    img: p.img || images.human,
    link: `/blog/${p.slug}`,
    category: p.category || "KLR Life",
    normalizedCategory: normalizeCategory(p.category || ""),
    authorName: "KLR Editorial Team",
    authorAvatar: images.teamPhoto,
    readingTime: estimateReadingTime(p.contentHtml || p.excerpt || ""),
  };
}

type BlogProps = {
  go: (r: Route) => void;
  initialPosts?: RawPost[];
  initialHero?: BlogHeroData;
};

export function Blog({ go, initialPosts, initialHero }: BlogProps) {
  const posts: InsightPost[] = initialPosts?.length
    ? initialPosts.map(toInsightPostFromCms)
    : fallbackPosts.map(toInsightPost);
  const [cat, setCat] = useState<InsightCategory>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const heroEyebrow = initialHero?.eyebrow || "Insights";
  const heroTitle = initialHero?.title || "Ideas, Trends & Stories from KLR hands on experience";
  const heroSubtitle = initialHero?.subtitle || "Fresh perspectives on loyalty marketing, retail innovation, and the people behind our work.";
  const heroVisible = initialHero?._visible !== false;

  const filtered = cat === "All" ? posts : posts.filter((p) => p.normalizedCategory === cat);
  const featured = filtered[0] || posts[0];
  const feed = filtered.filter((p) => p.id !== featured?.id);

  return (
    <>
      {heroVisible && <PageHero
        eyebrow={heroEyebrow}
        title={(() => {
          const idx = heroTitle.indexOf(" from ");
          if (idx > -1) {
            return <>{heroTitle.slice(0, idx)}<br /><span className="text-[#F8AE01]">{heroTitle.slice(idx + 1)}</span></>;
          }
          const words = heroTitle.split(" ");
          const mid = Math.ceil(words.length / 2);
          return <>{words.slice(0, mid).join(" ")}<br /><span className="text-[#F8AE01]">{words.slice(mid).join(" ")}</span></>;
        })()}
        subtitle={heroSubtitle}
        image={images.human}
        cta={{ label: "Explore Articles", href: "#insight-feed" }}
      />}

      {/* FEATURED ARTICLE — yellow */}
      {featured && (
        <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
          <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
          <div className="max-w-6xl mx-auto px-8">
            <AnimatedSection>
              <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                Featured Article
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-8 rounded-[32px] overflow-hidden border border-[#2E2784]/20 bg-[#2E2784]/8" style={softShadow}>
                <div className="min-h-[280px] md:min-h-[420px]">
                  <ImageWithFallback src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="text-[#2E2784] tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                    {featured.normalizedCategory}
                  </div>
                  <h2 className="text-[#2E2784] tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.7rem)", lineHeight: 1.15, fontWeight: 800 }}>
                    {featured.title}
                  </h2>
                  <p className="text-black/60 tracking-tight mt-5" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {featured.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <img src={featured.authorAvatar} alt={featured.authorName} className="w-9 h-9 rounded-full object-cover border border-[#2E2784]/20" />
                    <div className="text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.82rem" }}>
                      {featured.authorName} · {featured.readingTime} · {featured.date}
                    </div>
                  </div>

                  <button
                    onClick={() => go({ page: "blog-detail", slug: featured.slug })}
                    className="mt-auto pt-8 inline-flex items-center gap-2 text-[#2E2784] hover:text-black transition-colors tracking-tight"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    Read featured article <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* INSIGHTS FEED — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-[#C8B8F0]/10 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div id="insight-feed" className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Categories
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
              Insights Feed
            </h2>

            {/* Category filter */}
            <div className="flex flex-wrap gap-3 mt-10">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCat(c); setVisible(PAGE_SIZE); }}
                  className={`rounded-full px-5 py-2 tracking-tight transition-all ${
                    cat === c
                      ? "bg-[#F8AE01] text-black font-semibold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                >
                  {c}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid */}
          <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {feed.slice(0, visible).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => go({ page: "blog-detail", slug: p.slug })}
                className="group rounded-[28px] overflow-hidden border border-white/20 text-left cursor-pointer flex flex-col h-full"
                style={{ background: "rgba(255,255,255,0.07)", touchAction: "manipulation", ...softShadow }}
              >
                {/* Fixed aspect ratio container for images */}
                <div className="aspect-[16/10] w-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                </div>
                
                {/* Flex column container for details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                    {p.normalizedCategory}
                  </div>
                  <div className="text-white tracking-[-0.02em] mt-3 line-clamp-2" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}>
                    {p.title}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <img src={p.authorAvatar} alt={p.authorName} className="w-8 h-8 rounded-full object-cover border border-white/15" />
                    <div className="text-white/65 tracking-tight" style={{ fontSize: "0.78rem" }}>
                      {p.authorName} · {p.readingTime}
                    </div>
                  </div>

                  <div className="text-white/55 tracking-tight mt-3" style={{ fontSize: "0.78rem" }}>{p.date}</div>
                  <p className="text-white/75 tracking-tight mt-3 line-clamp-3" style={{ fontSize: "0.85rem", lineHeight: 1.55 }}>{p.excerpt}…</p>
                  
                  {/* Read More pulled perfectly to the bottom */}
                  <div className="text-[#F8AE01] tracking-tight font-semibold mt-auto pt-4 group-hover:text-white transition-colors inline-flex items-center gap-2" style={{ fontSize: "0.85rem" }}>
                    Read More <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Load More */}
          {visible < feed.length && (
            <div className="mt-14 pb-2 flex justify-center relative z-10">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full px-10 py-4 bg-[#F8AE01] text-black tracking-tight transition-all active:scale-95 cursor-pointer"
                style={{ fontSize: "0.9rem", fontWeight: 600, touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Keep in Touch!
                </h3>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  Share your goals and let's shape the next loyalty success story together.
                </p>
              </div>
              <div className="md:text-right">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>Let's talk</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}