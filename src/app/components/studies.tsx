"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { studies, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

type Sector = "all" | "petrol" | "retail";

export function Studies({ go }: { go: (r: Route) => void }) {
  const [sector, setSector] = useState<Sector>("all");
  const [brand, setBrand] = useState<string>("all");

  const allBrands = Array.from(new Set(studies.map((s) => s.brand)));
  const filtered = studies.filter((s) => (sector === "all" || s.cat === sector) && (brand === "all" || s.brand === brand));

  const sectorChips: { id: Sector; label: string }[] = [
    { id: "all", label: "All" },
    { id: "retail", label: "Grocery" },
    { id: "petrol", label: "Fuel" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={<>Real Results for<br /><span className="text-[#F8AE01]">Real Retail Chains.</span></>}
        subtitle="340+ campaigns across 20+ countries. Explore how we've helped grocery and fuel retail chains achieve measurable results."
        image={images.mask}
      />

      {/* FILTER — yellow */}
      <section className="relative pt-20 pb-10 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <div
              className="rounded-full p-1.5 inline-flex gap-1 border border-black/10"
              style={{ background: "#2E2784" }}
            >
              {sectorChips.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSector(c.id)}
                  className={`px-6 py-2 rounded-full tracking-tight transition-all duration-500 ${
                    sector === c.id ? "bg-[#F8AE01] text-black" : "text-white"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="rounded-full p-1.5 flex flex-wrap gap-1 bg-white border border-black/5">
              {["all", ...allBrands].map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`px-5 py-2 rounded-full tracking-tight transition-all duration-500 ${
                    brand === b ? "bg-[#2E2784] text-white" : "text-black hover:text-[#2E2784]"
                  }`}
                  style={{ fontSize: "0.8rem" }}
                >
                  {b === "all" ? "All brands" : b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES LIST — blue */}
      <section className="relative pt-10 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <div className="space-y-24 md:space-y-32 pt-14">
            {filtered.map((s, i) => (
              <AnimatedSection key={s.id} delay={0}>
                <article
                  className={`group cursor-pointer ${i % 3 === 0 ? "md:mr-16" : i % 3 === 1 ? "md:ml-16" : ""}`}
                  onClick={() => go({ page: "study-detail", id: s.id })}
                >
                  <div className="relative rounded-[40px] overflow-hidden border border-white/10" style={softShadow}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
                    </div>
                    <div
                      className="absolute top-6 left-6 rounded-full px-4 py-1.5 border border-white/25 text-white tracking-[0.2em] uppercase"
                      style={{ background: "rgba(46,39,132,0.5)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", fontSize: "0.65rem" }}
                    >
                      {s.cat === "petrol" ? "Fuel" : "Grocery"} · {s.brand}
                    </div>
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-8 flex-wrap">
                    <div>
                      <div className="text-white/60 tracking-tight" style={{ fontSize: "0.85rem" }}>
                        {s.client} — {s.location} — {s.year}
                      </div>
                      <h2 className="text-white tracking-[-0.035em] mt-3" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05, fontWeight: 700 }}>
                        {s.title}
                      </h2>
                    </div>
                    <div className="inline-flex items-center gap-3 text-white">
                      <span className="border-b border-white/40 group-hover:border-[#F8AE01] pb-0.5 transition-colors" style={{ fontSize: "0.9rem" }}>Read study</span>
                      <span className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
                Are you ready to start something new together?
              </h3>
              <CTA label="Get in Touch" variant="dark" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
