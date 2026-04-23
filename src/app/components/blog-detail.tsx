"use client";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { fallbackPosts, type Post } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

type FullPost = Post & { contentHtml?: string };

export function BlogDetail({ slug, go, initialPost }: { slug: string; go: (r: Route) => void; initialPost?: FullPost }) {
  const initial: FullPost = initialPost || fallbackPosts.find((p) => p.slug === slug) || fallbackPosts[0];
  const [post, setPost] = useState<FullPost>(initial);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const r = await fetch(`https://klr-europe.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, { signal: ctrl.signal });
        if (!r.ok) return;
        const data = await r.json();
        if (!data?.length) return;
        const p = data[0];
        const strip = (s: string) => s.replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, "&").replace(/&#8220;|&#8221;/g, '"').replace(/&nbsp;/g, " ");
        setPost({
          id: p.id,
          slug: p.slug,
          title: strip(p.title.rendered.replace(/<[^>]+>/g, "")),
          date: String(p.date).slice(0, 10),
          excerpt: strip(p.excerpt.rendered.replace(/<[^>]+>/g, "")).trim().slice(0, 280),
          img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || initial.img,
          link: p.link,
          category: p._embedded?.["wp:term"]?.[0]?.[0]?.name || "Post",
          contentHtml: strip(p.content.rendered),
        });
      } catch {
        /* keep fallback */
      }
    })();
    return () => ctrl.abort();
  }, [slug]);

  const others = fallbackPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${post.date}`}
        title={<>{post.title}</>}
        subtitle={post.excerpt}
        image={post.img || "https://klr-europe.com/wp-content/uploads/2022/12/KLR-HUMAN-CENTERED-scaled-e1674495532538.jpg"}
        cta={{ label: "Back to Insights", href: "/blog" }}
      />

      {/* ARTICLE CONTENT — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-4xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] p-10 md:p-14 bg-white border border-black/5" style={softShadow}>
              {post.contentHtml ? (
                <div
                  className="klr-prose text-black tracking-tight"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              ) : (
                <div className="text-black tracking-tight" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
                  <p>{post.excerpt}</p>
                  <p className="mt-6">
                    Read the full article on{" "}
                    <a href={post.link} target="_blank" rel="noreferrer" className="text-[#2E2784] underline hover:text-[#2E2784]/70">
                      klr-europe.com
                    </a>.
                  </p>
                </div>
              )}
              <div className="mt-16 pt-8 border-t border-black/10">
                <CTA label="Read on klr-europe.com" variant="dark" onClick={() => window.open(post.link, "_blank")} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MORE ARTICLES — white */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>More articles</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Keep reading<br /><span className="text-[#F8AE01]">from our insights.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-10 md:mt-14">
              {others.map((p) => (
                <button
                  key={p.id}
                  onClick={() => go({ page: "blog-detail", slug: p.slug })}
                  className="group rounded-[32px] overflow-hidden bg-white border border-[#2E2784]/10 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-7">
                    <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.65rem" }}>{p.category}</div>
                    <div className="text-[#2E2784] tracking-[-0.02em] mt-3" style={{ fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.25 }}>{p.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
