"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";
import { softShadow } from "./ui-bits";
import { studies as fallbackStudies, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Studies({ go }: { go: (r: Route) => void }) {
  const [sector, setSector] = useState<"all" | "retail" | "petrol">("all");
  const [brand, setBrand] = useState<string>("all");
  const [studies, setStudies] = useState(fallbackStudies);
  const [heroEyebrow, setHeroEyebrow] = useState("Case Studies");
  const [heroTitle, setHeroTitle] = useState("Real Results for Real Retail Chains");
  const [heroSubtitle, setHeroSubtitle] = useState("340+ campaigns across 20+ countries. Explore how we've helped grocery and fuel retail chains increase visits, grow basket size, and build lasting customer relationships.");
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    fetch("/api/content?type=studies", { cache: "no-store" }).then(r => r.json()).then(j => { if (j.data?.length) setStudies(j.data); }).catch(() => {});
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(j => {
        const cs = j.data?.caseStudies?.hero;
        if (cs) {
          if (cs.eyebrow) setHeroEyebrow(cs.eyebrow);
          if (cs.title) setHeroTitle(cs.title);
          if (cs.subtitle) setHeroSubtitle(cs.subtitle);
          if (cs._visible === false) setHeroVisible(false);
        }
      })
      .catch(() => {});
  }, []);

  const brands = Array.from(new Set(studies.map((s) => s.brand))).sort((a, b) => a.localeCompare(b));

  const filtered = studies.filter((s) => {
    const sectorMatch = sector === "all" || s.cat === sector;
    const brandMatch = brand === "all" || s.brand === brand;
    return sectorMatch && brandMatch;
  });

  return (
    <>
      {heroVisible && <PageHero
        eyebrow={heroEyebrow}
        title={<>{heroTitle.split(" ").slice(0, 3).join(" ")}<br /><span className="text-[#F8AE01]">{heroTitle.split(" ").slice(3).join(" ")}</span></>}
        subtitle={heroSubtitle}
        image={images.services}
      />}

      {/* FILTERS + GRID — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#C8B8F0]/10 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Filters
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Find the Right <span className="text-[#F8AE01]">Campaign Story</span>
            </h2>

            <div className="mt-10 grid lg:grid-cols-2 gap-6">
              <div className="rounded-[24px] p-6 border border-white/15" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="text-[#F8AE01]/70 tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                  By Sector
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All" },
                    { id: "retail", label: "Grocery" },
                    { id: "petrol", label: "Fuel" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSector(item.id as "all" | "retail" | "petrol")}
                      className={`px-4 py-2 rounded-full transition-all tracking-tight text-[0.85rem] ${
                        sector === item.id ? "bg-[#F8AE01] text-black" : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] p-6 border border-white/15" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="text-[#F8AE01]/70 tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                  By Brand
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setBrand("all")}
                    className={`px-4 py-2 rounded-full transition-all tracking-tight text-[0.85rem] ${
                      brand === "all" ? "bg-[#F8AE01] text-black" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={`px-4 py-2 rounded-full transition-all tracking-tight text-[0.85rem] ${
                        brand === b ? "bg-[#F8AE01] text-black" : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go({ page: "study-detail", id: s.id })}
                  className="group rounded-[28px] overflow-hidden text-left border border-white/20 bg-[#2E2784] h-full flex flex-col"
                  style={softShadow}
                >
                  <div className="aspect-[16/10] overflow-hidden shrink-0">
                    <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                      {s.cat === "retail" ? "Grocery" : "Fuel"}
                    </div>
                    <h3 className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.25 }}>
                      {s.title}
                    </h3>
                    <p className="text-white/65 tracking-tight mt-3" style={{ fontSize: "0.88rem", lineHeight: 1.55 }}>
                      {s.client} · {s.location} · {s.year} · {s.brand}
                    </p>
                    <p className="text-white/75 tracking-tight mt-3" style={{ fontSize: "0.88rem", lineHeight: 1.55 }}>
                      {s.summary}
                    </p>
                    <div className="mt-auto pt-5 inline-flex items-center gap-2 text-[#F8AE01] group-hover:text-white transition-colors" style={{ fontSize: "0.86rem", fontWeight: 600 }}>
                      Explore case study <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-10 rounded-[24px] p-8 border border-white/15" style={{ background: "rgba(255,255,255,0.07)" }}>
                <p className="text-white/70 tracking-tight" style={{ fontSize: "1rem" }}>
                  No campaigns match this filter combination yet.
                </p>
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
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Let's Talk About
                  <br />
                  <span className="text-black">Your Goals</span>
                </h3>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  Tell us your targets and we will craft the next campaign story for your retail chain.
                </p>
              </div>
              <div className="md:text-right">
                <button
                  onClick={() => go({ page: "contact" })}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>Let's Talk About Your Goals</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
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
