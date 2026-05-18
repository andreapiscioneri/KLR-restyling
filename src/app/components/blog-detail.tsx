"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow } from "./ui-bits";
import { fallbackPosts, type Post } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const COLORS = {
  navy: "#1a1752",       // Sfondo pagina profondo
  purpleBox: "#241f69",  // Sfondo dei Box (più chiaro del navy)
  gold: "#F8AE01",       // Giallo per accenti e titoletti
  whiteText: "#f8f9fa",  // Bianco sporco per massima leggibilità del testo
};

type FullPost = Post & { 
  contentHtml?: string; 
  authorName?: string; 
  authorAvatar?: string;
};

export function BlogDetail({ slug, go, initialPost }: { slug: string; go: (r: Route) => void; initialPost?: FullPost }) {
  const baseInitial: FullPost = initialPost || fallbackPosts.find((p) => p.slug === slug) || fallbackPosts[0];
  const [post, setPost] = useState<FullPost>({ ...baseInitial, link: `/blog/${baseInitial.slug}` });

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const r = await fetch(`https://klr-europe.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, { signal: ctrl.signal });
        if (!r.ok) return;
        const data = await r.json();
        if (!data?.length) return;
        const p = data[0];
        const author = p._embedded?.author?.[0];
        
        setPost({
          id: p.id,
          slug: p.slug,
          title: p.title.rendered.replace(/<[^>]+>/g, ""),
          date: String(p.date).slice(0, 10),
          excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
          link: `/blog/${p.slug}`,
          img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || baseInitial.img,
          category: p._embedded?.["wp:term"]?.[0]?.[0]?.name || "KLR Insights",
          // Pulisce le classi spazzatura e mantiene pulito l'HTML
          contentHtml: p.content.rendered.replace(/class="[^"]*"/g, ""), 
          authorName: author?.name || "Nina Bjelivuk",
          authorAvatar: author?.avatar_urls?.['96']
        });
      } catch (e) {
        try {
          const r2 = await fetch(`/api/content?type=posts`, { cache: "no-store" });
          if (r2.ok) {
            const d2 = await r2.json();
            const found = (d2.data || []).find((p: any) => p.slug === slug);
            if (found) {
              setPost({
                id: found.id ?? found.slug,
                slug: found.slug,
                title: found.title,
                date: found.date,
                excerpt: found.excerpt || "",
                link: `/blog/${found.slug}`,
                img: found.img || baseInitial.img,
                category: found.category || "KLR Insights",
                contentHtml: found.contentHtml || found.excerpt || "",
                authorName: "KLR Editorial Team",
                authorAvatar: undefined,
              });
            }
          }
        } catch {}
      }
    })();
    return () => ctrl.abort();
  }, [slug]);

  const others = fallbackPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // LOGICA DEL TITOLO HERO: Dividiamo le parole per colorarle
  const titleWords = post.title ? post.title.split(" ") : [];
  const titleFirstPart = titleWords.slice(0, 2).join(" ");
  const titleSecondPart = titleWords.slice(2).join(" ");

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#F8AE01] selection:text-[#1a1752]" style={{ background: COLORS.navy }}>
      
      {/* INIEZIONE CSS: Tutti i titoletti (h3, h4) diventano gialli */}
      <style dangerouslySetInnerHTML={{ __html: `
        .klr-editorial-content * {
          color: #f8f9fa !important;
          background-color: transparent !important;
          font-family: inherit !important;
        }
        
        .klr-editorial-content p {
          font-size: 1rem !important;
          line-height: 1.75 !important;
          margin-bottom: 1.75rem !important;
          font-weight: 300 !important;
          opacity: 0.9 !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content p {
            font-size: 1.15rem !important;
            margin-bottom: 2rem !important;
          }
        }

        .klr-editorial-content h1, 
        .klr-editorial-content h2 {
          color: ${COLORS.gold} !important;
          font-size: clamp(2.2rem, 5vw, 3.5rem) !important;
          font-weight: 900 !important;
          letter-spacing: -0.05em !important;
          line-height: 1.05 !important;
          margin-top: 4.5rem !important;
          margin-bottom: 1.5rem !important;
        }

        /* MODIFICA: Ora h3 e h4 forzati in Giallo Oro */
        .klr-editorial-content h3,
        .klr-editorial-content h4 {
          color: ${COLORS.gold} !important;
          font-size: 1.3rem !important;
          font-weight: 800 !important;
          letter-spacing: -0.02em !important;
          margin-top: 2.5rem !important;
          margin-bottom: 0.75rem !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content h3,
          .klr-editorial-content h4 {
            font-size: 1.75rem !important;
            margin-top: 3.5rem !important;
            margin-bottom: 1rem !important;
          }
        }

        .klr-editorial-content img,
        .klr-editorial-content video,
        .klr-editorial-content iframe {
          width: 100% !important;
          height: auto !important;
          border-radius: 30px !important;
          margin: 4.5rem 0 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }

        .klr-editorial-content a {
          color: ${COLORS.gold} !important;
          text-decoration: none !important;
          font-weight: 700 !important;
          border-bottom: 2px solid rgba(248,174,1,0.3) !important;
          transition: all 0.3s ease !important;
        }

        .klr-editorial-content a:hover {
          border-bottom-color: ${COLORS.gold} !important;
        }

        .klr-editorial-content blockquote {
          border-left: 5px solid ${COLORS.gold} !important;
          background: rgba(255,255,255,0.04) !important;
          padding: 1.5rem 1.5rem !important;
          margin: 2rem 0 !important;
          border-radius: 0 20px 20px 0 !important;
          font-size: 1.1rem !important;
          font-weight: 600 !important;
          font-style: italic !important;
          line-height: 1.5 !important;
          letter-spacing: -0.01em !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content blockquote {
            padding: 2.5rem 3rem !important;
            margin: 3.5rem 0 !important;
            border-radius: 0 28px 28px 0 !important;
            font-size: 1.6rem !important;
          }
        }

        .klr-editorial-content ul, 
        .klr-editorial-content ol {
          margin-bottom: 2.5rem !important;
          padding-left: 1.75rem !important;
        }

        .klr-editorial-content li {
          margin-bottom: 0.75rem !important;
          font-size: 1rem !important;
          line-height: 1.65 !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content li {
            font-size: 1.15rem !important;
            margin-bottom: 0.85rem !important;
            line-height: 1.7 !important;
          }
        }
        
        .klr-editorial-content strong,
        .klr-editorial-content b {
          font-weight: 800 !important;
          color: #ffffff !important;
        }
      `}} />

      {/* 1. HERO */}
      <PageHero
        eyebrow={post.category}
        title={
          <span className="font-black tracking-tighter leading-[0.9]">
            <span className="text-white">{titleFirstPart} </span>
            {titleSecondPart && <span className="text-[#F8AE01]">{titleSecondPart}</span>}
          </span>
        }
        subtitle={post.excerpt}
        image={post.img}
        cta={{ label: "Back to Insights", href: "/blog" }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 space-y-16">
        
        {/* 2. OVERVIEW & AUTHOR */}
        <AnimatedSection>
          <div className="rounded-[40px] border border-white/10 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left: Author Profilo */}
            <div className="lg:w-1/3 p-10 md:p-14 flex flex-col items-center justify-center text-center" style={{ background: COLORS.purpleBox }}>
              <div className="w-32 h-32 rounded-full border-4 border-[#F8AE01] overflow-hidden mb-6">
                <img src={post.authorAvatar || "https://klr-europe.com/wp-content/uploads/2023/01/logo-klr.png"} alt={post.authorName} className="w-full h-full object-cover" />
              </div>
              <div className="text-white/50 font-bold tracking-[0.2em] uppercase text-xs mb-2">Author</div>
              {/* MODIFICA: Nome Autore Giallo Oro */}
              <h3 className="text-[#F8AE01] text-xl md:text-3xl font-black tracking-tight leading-none mb-4">{post.authorName}</h3>
            </div>

            {/* Right: Overview/Estratto (Giallo) */}
            <div className="lg:w-2/3 p-10 md:p-14 flex flex-col justify-center" style={{ background: COLORS.gold }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1a1752] flex items-center justify-center text-[#F8AE01] rotate-3">
                  <Target size={24} strokeWidth={3} />
                </div>
                <div className="text-[#2E2784] font-bold tracking-[0.2em] uppercase text-xs">Executive Summary</div>
              </div>
              
              <h2 className="text-[#2E2784] text-2xl md:text-5xl font-black tracking-tighter mb-6 leading-none italic">
                The core concept.
              </h2>
              <p className="text-[#1a1752] text-base md:text-3xl font-medium leading-snug tracking-tight border-l-4 border-[#2E2784] pl-5 md:pl-8 opacity-90">
                "{post.excerpt}"
              </p>
            </div>

          </div>
        </AnimatedSection>

        {/* 3. CONTENUTO INTERNO: Tutti gli h3/h4 nel contenuto saranno gialli grazie all'iniezione CSS */}
        <AnimatedSection>
          <div className="rounded-[50px] border border-white/10 py-16 md:py-24 px-6 md:px-12" style={{ background: COLORS.purpleBox }}>
            <div className="max-w-3xl mx-auto">
              <div 
                className="klr-editorial-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} 
              />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* 4. RELATED ARTICLES */}
      <section className="py-16 md:py-32 px-6 md:px-8 mt-10 md:mt-20" style={{ background: COLORS.gold }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-[#2E2784] font-bold tracking-[0.3em] uppercase text-xs mb-6">Keep reading</div>
            <h2 className="text-[#2E2784] tracking-[-0.04em] md:tracking-[-0.07em] text-4xl md:text-8xl font-black leading-[0.9] md:leading-[0.85] mb-10 md:mb-20">
              More Insights,<br /><span className="text-black">Same Ambition.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {others.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => go({ page: "blog-detail", slug: p.slug })}
                  className="group relative rounded-[40px] overflow-hidden text-left transition-all duration-500 hover:-translate-y-4 border-2 border-[#2E2784]"
                  style={{ background: COLORS.navy }}
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                    <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                  </div>
                  <div className="p-5 md:p-10">
                    <div className="text-white/50 font-bold tracking-[0.2em] uppercase text-[10px] mb-4">0{i+1} · {p.category}</div>
                    {/* MODIFICA: Titoletto Card Giallo Oro */}
                    <h4 className="text-[#F8AE01] text-lg md:text-2xl font-black leading-tight group-hover:text-white transition-colors">{p.title}</h4>
                    
                    <div className="mt-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F8AE01] group-hover:text-[#2E2784] transition-all">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-20 md:py-40 px-6 md:px-8 text-center" style={{ background: COLORS.gold }}>
        <AnimatedSection>
          <h2 className="text-[#2E2784] text-3xl md:text-8xl font-black tracking-[-0.04em] md:tracking-tighter leading-tight md:leading-none mb-10 md:mb-14">
            This isn't just Loyalty...<br />
            <span className="text-white drop-shadow-md">this is Marketing!</span>
          </h2>
          <button
            onClick={() => go({ page: "contact" })}
            className="group inline-flex items-center gap-3 md:gap-5 rounded-full pl-7 md:pl-10 pr-4 md:pr-6 py-4 md:py-5 bg-[#2E2784] text-[#F8AE01] text-lg md:text-2xl font-black hover:bg-black transition-all active:scale-95"
          >
            <span>Let's talk Strategy</span>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight size={28} />
            </div>
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}