"use client";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CTA, softShadow } from "./ui-bits";
import { studies, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

type Filter = "all" | "case-studies";

export function Studies({ go }: { go: (r: Route) => void }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? studies : studies.filter((s) => s.cat === "retail" || s.cat === "petrol");

  return (
    <>
      <PageHero
        eyebrow="Work"
        title={<>Our Works<br /><span className="text-[#F8AE01]">& Case Studies.</span></>}
        subtitle="Have a look at the success stories of our clients who have implemented loyalty marketing campaigns with us."
        image={images.mask}
      />

      {/* LOYALTY CAMPAIGNS INTRO — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative flex justify-center md:justify-start">
                <div className="absolute -bottom-10 -left-6 w-[180px] h-[180px] rounded-full bg-[#F8AE01]" />
                <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden" style={softShadow}>
                  <ImageWithFallback src={images.aboutTonda} alt="Loyalty Campaigns" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Loyalty Campaigns<br />that drive success!
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-8" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65 }}>
                  Have a look at the success stories of our clients who have implemented loyalty marketing campaigns with us. From supermarkets to petrol stations, our solutions have helped them increase customer engagement and boost revenue.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65 }}>
                  Browse through our diverse range of case studies to see how we have helped businesses to achieve their goals and discover the benefits for your company. Take inspiration and let's work together to create a loyalty program that drives results for your business!
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65 }}>
                  We'd be happy to share more case studies or provide references from our satisfied clients upon request.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CASE STUDIES GRID — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="text-white tracking-[-0.04em] text-center max-w-3xl mx-auto" style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", lineHeight: 1.1, fontWeight: 700 }}>
              Some examples of the successful projects<br />we've completed for our clients
            </h2>

            {/* Filter chips */}
            <div className="flex justify-center gap-3 mt-12">
              <div className="rounded-full p-1.5 inline-flex gap-1 border border-white/10" style={{ background: "rgba(255,255,255,0.08)" }}>
                {[
                  { id: "all" as Filter, label: "All Posts" },
                  { id: "case-studies" as Filter, label: "Case Studies" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`px-6 py-2 rounded-full tracking-tight transition-all duration-300 ${
                      filter === c.id ? "bg-[#F8AE01] text-black font-semibold" : "text-white hover:text-[#F8AE01]"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go({ page: "study-detail", id: s.id })}
                  className="group rounded-[28px] overflow-hidden bg-white text-left border border-white/10"
                  style={softShadow}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6">
                    <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.3 }}>{s.title}</div>
                    <div className="text-black/60 tracking-tight mt-3" style={{ fontSize: "0.85rem", lineHeight: 1.55 }}>{s.summary}</div>
                    <div className="text-[#2E2784] tracking-tight mt-4 font-semibold group-hover:text-[#F8AE01] transition-colors" style={{ fontSize: "0.85rem" }}>
                      Read More
                    </div>
                  </div>
                </button>
              ))}
            </div>
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
