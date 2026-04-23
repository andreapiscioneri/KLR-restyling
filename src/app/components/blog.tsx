"use client";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CTA, softShadow } from "./ui-bits";
import { fallbackPosts, images, type Post } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const CATEGORIES = ["All Posts", "KLR Life", "Leadership&Culture", "Retail & Business Trends", "Loyalty Marketing Insights"];
const PAGE_SIZE = 9;

export function Blog({ go }: { go: (r: Route) => void }) {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All Posts");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const r = await fetch("https://klr-europe.com/wp-json/wp/v2/posts?per_page=100&_embed", { signal: ctrl.signal });
        if (!r.ok) throw new Error("fetch failed");
        const data = await r.json();
        const strip = (s: string) =>
          s.replace(/<[^>]+>/g, "").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, "&").replace(/&#8220;|&#8221;/g, '"').replace(/&nbsp;/g, " ");
        const normalized: Post[] = data.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: strip(p.title.rendered),
          date: String(p.date).slice(0, 10),
          excerpt: strip(p.excerpt.rendered).trim().slice(0, 220),
          img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          link: p.link,
          category: p._embedded?.["wp:term"]?.[0]?.[0]?.name || "Post",
        }));
        if (normalized.length) setPosts(normalized);
      } catch {
        /* fallback */
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const filtered = cat === "All Posts" ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<><span className="text-[#F8AE01]">Blog</span></>}
        subtitle="Welcome to the KLR blog—your go-to spot for fresh takes on loyalty marketing, industry trends, and the people behind our success. Quick reads, big insights—always with a human touch."
        image={images.human}
        cta={{ label: "Contact us", href: "/contact" }}
      />

      {/* BLOG INTRO — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative flex justify-center md:justify-start">
                <div className="absolute -bottom-10 -left-6 w-[180px] h-[180px] rounded-full bg-[#F8AE01]" />
                <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden" style={softShadow}>
                  <ImageWithFallback src={images.aboutTonda} alt="KLR Blog" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", lineHeight: 1.7 }}>
                  Welcome to the KLR blog — a space where we explore the latest marketing trends, share insights from the world of loyalty, and offer a behind-the-scenes look at our corporate culture.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", lineHeight: 1.7 }}>
                  From emerging technologies shaping customer engagement to proven strategies for building lasting brand partnerships, our articles are designed to inform, inspire, and spark conversation.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", lineHeight: 1.7 }}>
                  Whether you're a marketing manager, a business partner, or simply curious about what drives loyalty success, you'll find valuable perspectives here.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ARTICLES GRID — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="text-white tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1, fontWeight: 800 }}>
              Articles
              <br />
              <span className="text-[#F8AE01]" style={{ fontStyle: "italic" }}>News</span>
            </h2>

            {loading && (
              <div className="text-white/50 tracking-tight mt-4" style={{ fontSize: "0.85rem" }}>Loading latest articles…</div>
            )}

            {/* Category filter */}
            <div className="flex flex-wrap gap-3 mt-10">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCat(c); setVisible(PAGE_SIZE); }}
                  className={`rounded-full px-5 py-2 tracking-tight transition-all border ${
                    cat === c
                      ? "bg-[#F8AE01] text-black border-[#F8AE01] font-semibold"
                      : "text-white border-white/20 hover:border-[#F8AE01] hover:text-[#F8AE01]"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {filtered.slice(0, visible).map((p) => (
                <button
                  key={p.id}
                  onClick={() => go({ page: "blog-detail", slug: p.slug })}
                  className="group rounded-[28px] overflow-hidden bg-white border border-white/10 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6">
                    <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35 }}>{p.title}</div>
                    <div className="text-black/40 tracking-tight mt-1" style={{ fontSize: "0.75rem" }}>No Comments</div>
                    <p className="text-black/65 tracking-tight mt-3 line-clamp-3" style={{ fontSize: "0.85rem", lineHeight: 1.55 }}>{p.excerpt}…</p>
                    <div className="text-[#2E2784] tracking-tight font-semibold mt-4 group-hover:text-[#F8AE01] transition-colors" style={{ fontSize: "0.85rem" }}>
                      Read More
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Load More */}
            {visible < filtered.length && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-full px-10 py-3.5 bg-[#2E2784] text-white tracking-tight transition-all hover:bg-[#F8AE01] hover:text-black border border-white/10"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  Load More
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="text-[#2E2784] tracking-[-0.04em] max-w-xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Are you ready to <span className="text-black">start something new</span> together?
                </h3>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  Get in touch with us and we'll find the right solution for you
                </p>
              </div>
              <CTA label="Get in Touch" variant="dark" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
