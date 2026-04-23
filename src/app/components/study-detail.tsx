"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
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
  const related = studies.filter((x) => x.id !== s.id && x.cat === s.cat).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={s.cat === "petrol" ? "Fuel · Case Study" : "Grocery · Case Study"}
        title={<>{s.title}</>}
        subtitle={`${s.client} · ${s.location} · ${s.year}`}
        image={s.img}
        cta={{ label: "All Case Studies", href: "/work" }}
      />

      {/* SUMMARY + RESULTS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-7">
                <Eyebrow>The challenge</Eyebrow>
                <p className="text-[#2E2784] tracking-[-0.02em] mt-8" style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", lineHeight: 1.35, fontWeight: 500 }}>
                  {s.summary}
                </p>
                <p className="text-[#2E2784] tracking-tight mt-8" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                  KLR partnered with {s.client} from the first workshop to the final redemption — crafting a
                  program that aligned with brand values, logistical reality and shopper expectation. The result
                  was a campaign that did not just move product but cemented the relationship with customers.
                </p>
              </div>
              <div className="md:col-span-5 space-y-4">
                {s.results.map((r) => (
                  <div key={r.v} className="rounded-[28px] p-7 border border-black/5 bg-white flex items-center justify-between" style={softShadow}>
                    <div className="tracking-[0.2em] uppercase text-black" style={{ fontSize: "0.7rem" }}>{r.v}</div>
                    <div className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "2rem", fontWeight: 700 }}>{r.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND FEATURED — blue */}
      {brand && (
        <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
          <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
          <div className="max-w-6xl mx-auto px-8">
            <AnimatedSection>
              <div className="rounded-[40px] p-10 md:p-14 border border-white/10 grid md:grid-cols-12 gap-10 items-center" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                <div className="md:col-span-5 rounded-[28px] overflow-hidden aspect-square">
                  <ImageWithFallback src={brand.img} alt={brand.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-7 text-white">
                  <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>Featured brand</div>
                  <h3 className="text-[#F8AE01] tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>{brand.name}</h3>
                  <p className="text-white/80 tracking-tight mt-6 max-w-md" style={{ fontSize: "1rem", lineHeight: 1.55 }}>{brand.desc}</p>
                  <div className="mt-8">
                    <CTA label="Explore brand" variant="yellow" onClick={() => go({ page: "brand-detail", id: brand.id })} />
                  </div>
                </div>
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
            <Eyebrow>More in {s.cat === "petrol" ? "Fuel" : "Grocery"}</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Related<br /><span className="text-black">case studies.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-10 md:mt-14">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => go({ page: "study-detail", id: r.id })}
                  className="group rounded-[32px] overflow-hidden bg-white border border-black/5 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-7">
                    <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>{r.client}</div>
                    <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{r.title}</div>
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
