"use client";

import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { softShadow } from "./ui-bits";
import { studies, brands } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function StudyDetail({ id, go }: { id: string; go: (r: Route) => void }) {
  const s = studies.find((x) => x.id === id) || studies[0];
  const brand = brands.find((b) => b.name === s.brand);
  const related = studies
    .filter((x) => x.id !== s.id)
    .sort((a, b) => {
      const aScore = (a.brand === s.brand ? 2 : 0) + (a.cat === s.cat ? 1 : 0);
      const bScore = (b.brand === s.brand ? 2 : 0) + (b.cat === s.cat ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  const duration = s.results.find((r) => /wk/i.test(r.k))?.k || "8-16 weeks";
  const sector = s.cat === "petrol" ? "Fuel" : "Grocery";
  const campaignType = s.cat === "petrol" ? "Fuel Loyalty Campaign" : "Grocery Loyalty Campaign";

  const quickFacts = [
    { label: "Client", value: s.client },
    { label: "Country", value: s.location },
    { label: "Sector", value: sector },
    { label: "Duration", value: duration },
    { label: "Brand", value: s.brand },
    { label: "Campaign Type", value: campaignType },
  ];

  const approachSteps = [
    "Strategy workshop to align client goals, audience and commercial KPIs.",
    "Mechanics design for participation, repeat visits and basket-size growth.",
    "Reward curation and campaign storytelling around the featured brand.",
    "Multi-channel execution: in-store POSM, digital communication and weekly optimisation.",
  ];

  const testimonials: Record<string, string> = {
    "spar-redbull": "The campaign created real excitement in-store and generated measurable commercial uplift week after week.",
    "mol-pintinox": "KLR made execution simple for our teams and transformed routine forecourt traffic into active participation.",
    "circle-k-nasa": "A campaign that combined operational precision and strong emotional pull for our customers.",
  };

  const gallery = [s.img, brand?.img || s.img, "/3.png"];

  return (
    <>
      <PageHero
        eyebrow={s.cat === "petrol" ? "Fuel · Case Study" : "Grocery · Case Study"}
        title={<>{s.title}</>}
        subtitle={`${s.client} · ${s.location} · ${s.year}`}
        image={s.img}
        cta={{ label: "All Case Studies", href: "/work" }}
      >
        <div className="mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2 border border-white/30 bg-white/10 text-white tracking-tight" style={{ fontSize: "0.86rem" }}>
          <span className="text-[#F8AE01]" style={{ fontWeight: 700 }}>{s.client}</span>
          <span className="text-white/55">|</span>
          <span>{s.brand}</span>
        </div>
      </PageHero>

      {/* QUICK FACTS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Quick Facts
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
              Campaign Snapshot
            </h2>

            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {quickFacts.map((fact) => (
                <article key={fact.label} className="rounded-[24px] p-6 border border-white/50" style={{ background: "rgba(255,255,255,0.22)" }}>
                  <div className="text-[#2E2784]/45 tracking-[0.16em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                    {fact.label}
                  </div>
                  <div className="text-[#2E2784] tracking-tight mt-3" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}>
                    {fact.value}
                  </div>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CHALLENGE + APPROACH — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5">
                <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  The Challenge
                </div>
                <h2 className="text-white tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.1 }}>
                  What was the client trying to achieve?
                </h2>
                <p className="text-white/75 tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                  {s.summary}
                </p>
              </div>

              <div className="md:col-span-7">
                <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  Our Approach
                </div>
                <h3 className="text-white tracking-[-0.025em] mt-5" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", fontWeight: 800, lineHeight: 1.15 }}>
                  Strategy, mechanics, rewards, execution
                </h3>

                <div className="mt-7 space-y-3">
                  {approachSteps.map((step) => (
                    <div key={step} className="rounded-[18px] p-4 border border-white/15 bg-white/5 text-white/80 tracking-tight" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* RESULTS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              The Results
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
              Quantified Performance Impact
            </h2>

            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {s.results.map((r) => (
                <article key={r.v} className="rounded-[24px] p-6 border border-white/50 bg-white/75" style={softShadow}>
                  <div className="text-[#2E2784]/45 tracking-[0.14em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>{r.v}</div>
                  <div className="text-[#2E2784] tracking-[-0.03em] mt-3" style={{ fontSize: "clamp(2rem, 3.2vw, 2.8rem)", lineHeight: 1, fontWeight: 800 }}>{r.k}</div>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GALLERY — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Gallery
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
              POSM, in-store moments, products, video-ready assets
            </h2>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {gallery.map((img, i) => (
                <div key={`${img}-${i}`} className="rounded-[24px] overflow-hidden border border-white/10" style={softShadow}>
                  <ImageWithFallback src={img} alt={`${s.title} gallery ${i + 1}`} className="w-full h-[260px] object-cover" />
                </div>
              ))}
            </div>

            {brand && (
              <div className="mt-10 rounded-[24px] p-6 border border-white/15 bg-white/5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[#F8AE01] tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Featured Brand</div>
                  <div className="text-white tracking-tight mt-2" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{brand.name}</div>
                </div>
                <button
                  onClick={() => go({ page: "brand-detail", id: brand.id })}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                >
                  <span>Explore Brand</span>
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* TESTIMONIAL — yellow (optional) */}
      {testimonials[s.id] && (
        <section className="relative pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
          <div className="max-w-6xl mx-auto px-8">
            <AnimatedSection>
              <div className="rounded-[28px] p-8 md:p-10 border border-white/60 bg-white/70" style={softShadow}>
                <div className="text-[#2E2784]/55 tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                  Testimonial
                </div>
                <p className="text-[#2E2784] tracking-[-0.01em] mt-4" style={{ fontSize: "clamp(1.2rem, 2.1vw, 1.8rem)", lineHeight: 1.4, fontWeight: 600 }}>
                  "{testimonials[s.id]}"
                </p>
                <p className="text-[#2E2784]/65 tracking-tight mt-4" style={{ fontSize: "0.92rem" }}>
                  {s.client}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* RELATED — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Related
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
              More Campaign Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => go({ page: "study-detail", id: r.id })}
                  className="group rounded-[28px] overflow-hidden bg-[#2E2784] border border-white/15 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6">
                    <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                      {r.cat === "retail" ? "Grocery" : "Fuel"}
                    </div>
                    <div className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25 }}>{r.title}</div>
                    <div className="text-white/65 tracking-tight mt-3" style={{ fontSize: "0.85rem" }}>{r.client} · {r.location}</div>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — blue */}
      <section className="relative pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.8rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  Let's Talk About
                  <br />
                  <span className="text-[#F8AE01]">Your Goals</span>
                </h2>
              </div>
              <div className="md:text-right">
                <button
                  onClick={() => go({ page: "contact" })}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                >
                  <span>Let's Talk About Your Goals</span>
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
