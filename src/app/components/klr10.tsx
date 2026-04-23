"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { images, journey, stats, fallbackPosts } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Klr10({ go }: { go: (r: Route) => void }) {
  const anniversary = fallbackPosts.find((p) => p.slug.includes("10-anniversary")) || fallbackPosts[4];

  return (
    <>
      <PageHero
        eyebrow="KLR 10 Years"
        title={<>A decade<br /><span className="text-[#F8AE01]">built together.</span></>}
        subtitle="From three founders in Koper to a 43-person international team delivering loyalty campaigns across 20+ European markets. This is our story."
        image={images.anniversario}
      />

      {/* ANNIVERSARIO FULL BLEED — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="relative h-[80vh] min-h-[520px] rounded-[40px] overflow-hidden border border-black/5" style={softShadow}>
              <ImageWithFallback src={images.anniversario} alt="KLR 10 Years" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 via-[#2E2784]/10 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between flex-wrap gap-8">
                <div className="text-[#F8AE01] tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 0.95 }}>
                  10 Years of Loyalty.<br /><span className="text-white">10 Years of Teamwork.</span>
                </div>
                <div className="flex gap-8 text-white">
                  {[{ k: stats.years, v: "Years" }, { k: stats.countries, v: "Countries" }, { k: stats.campaigns, v: "Campaigns" }, { k: stats.people, v: "People" }].map((s) => (
                    <div key={s.v}>
                      <div className="text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)", fontWeight: 800 }}>{s.k}</div>
                      <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.8rem" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* JOURNEY — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Journey</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Milestone by<br /><span className="text-[#F8AE01]">milestone.</span>
            </h2>
            <div className="mt-14 relative">
              <div className="absolute left-[1.15rem] top-0 bottom-0 w-px bg-[#F8AE01]/40 hidden md:block" />
              <div className="space-y-6">
                {journey.map((j, i) => (
                  <div key={i} className="md:pl-14 relative">
                    <div className="absolute left-0 top-4 w-10 h-10 rounded-full bg-[#F8AE01] text-black items-center justify-center hidden md:flex" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                      {i + 1}
                    </div>
                    <div className="rounded-[28px] p-8 border border-white/10 flex flex-wrap items-baseline gap-6 md:gap-10" style={i % 2 === 0 ? { background: "rgba(255,255,255,0.07)", ...softShadow } : { background: "#F8AE01", ...softShadow }}>
                      <div className={`tracking-[-0.03em] ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"}`} style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800 }}>{j.year}</div>
                      <div className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-[-0.02em] flex-1 min-w-[200px]`} style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", fontWeight: 600 }}>{j.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ANNIVERSARY RECAP — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <button onClick={() => go({ page: "blog-detail", slug: anniversary.slug })} className="w-full rounded-[40px] overflow-hidden bg-white border border-black/5 text-left group" style={softShadow}>
              <div className="grid md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <ImageWithFallback src={anniversary.img} alt={anniversary.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-between gap-8">
                  <div>
                    <Eyebrow>Franciacorta · 2025</Eyebrow>
                    <h3 className="text-[#2E2784] tracking-[-0.03em] mt-8" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>{anniversary.title}</h3>
                    <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{anniversary.excerpt}</p>
                  </div>
                  <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5 self-start" style={{ fontSize: "0.9rem" }}>Read the anniversary story →</span>
                </div>
              </div>
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="text-[#F8AE01] tracking-[-0.035em] max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
              The next ten years<br /><span className="text-white">start now.</span>
            </h2>
            <p className="text-white/80 tracking-tight mt-8 max-w-2xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              Join us as we continue to design emotional loyalty for retailers, brands and shoppers across Europe.
            </p>
            <div className="mt-12">
              <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
