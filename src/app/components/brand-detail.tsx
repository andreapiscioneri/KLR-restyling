"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { brands as fallbackBrands, studies as fallbackStudies } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

type BrandDetailProps = {
  id: string;
  go: (r: Route) => void;
  initialBrands?: typeof fallbackBrands;
  initialStudies?: typeof fallbackStudies;
};

export function BrandDetail({ id, go, initialBrands, initialStudies }: BrandDetailProps) {
  const brands = initialBrands?.length ? initialBrands : fallbackBrands;
  const studies = initialStudies?.length ? initialStudies : fallbackStudies;

  const brand = brands.find((b) => b.id === id) || brands[0];
  const related = studies.filter((s) => s.brand === brand.name).slice(0, 3);
  const more = brands.filter((b) => b.id !== brand.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={brand.tag}
        title={<>{brand.name}<span className="text-[#F8AE01]">.</span></>}
        subtitle={brand.desc}
        image={brand.img}
        cta={{ label: "All Brands", href: "/brands" }}
      />

      {/* FACTS BAR — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] p-10 md:p-14 border border-black/5" style={{ background: "#2E2784", ...softShadow }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white">
                {[
                  { k: "EU-wide", v: "Distribution" },
                  { k: "100%", v: "Licensed" },
                  { k: "Turnkey", v: "Logistics" },
                  { k: "Made-to-fit", v: "Campaigns" },
                ].map((f) => (
                  <div key={f.v}>
                    <div className="tracking-[-0.03em] text-[#F8AE01]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}>{f.k}</div>
                    <div className="text-white tracking-tight mt-2" style={{ fontSize: "0.85rem" }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* RELATED STUDIES — blue */}
      {related.length > 0 && (
        <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
          <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
          <div className="max-w-6xl mx-auto px-8">
            <AnimatedSection>
              <Eyebrow onDark>Featured in</Eyebrow>
              <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
                Campaigns featuring<br /><span className="text-[#F8AE01]">{brand.name}.</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-10 md:mt-14">
                {related.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => go({ page: "study-detail", id: s.id })}
                    className="group rounded-[32px] overflow-hidden bg-white border border-white/10 text-left"
                    style={softShadow}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                    </div>
                    <div className="p-7">
                      <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>{s.client}</div>
                      <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{s.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* MORE BRANDS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>More brands</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Explore our<br /><span className="text-black">full portfolio.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 md:mt-14">
              {more.map((b) => (
                <button
                  key={b.id}
                  onClick={() => go({ page: "brand-detail", id: b.id })}
                  className="group rounded-[28px] overflow-hidden bg-white border border-black/5 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[16/9] sm:aspect-square overflow-hidden">
                    <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-5">
                    <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontWeight: 600 }}>{b.name}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
              <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
                Interested in becoming a brand partner?
              </h3>
              <div className="flex justify-center sm:justify-end">
                <CTA label="Get in Touch" variant="dark" onClick={() => go({ page: "contact" })} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
