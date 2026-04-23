"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { brands, brandPartners, productCategories, whyBrandsPartner, brandPartnershipProcess, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Brands({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Brand Partners"
        title={<>Exceptional Brands.<br /><span className="text-[#F8AE01]">Unforgettable Rewards.</span></>}
        subtitle="We turn grocery shopping and fuel stops into rewarding experiences. Our partnerships with the world's leading brands make loyalty collections tangible, sustainable and unique."
        image={images.tailorMade}
        cta={{ label: "Our Case Studies", href: "/work" }}
      />

      {/* PRODUCT CATEGORIES — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>The Full Scope of Loyalty</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Product categories<br /><span className="text-black">we curate.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {productCategories.map((c, i) => (
                <div key={c.title} className="rounded-[28px] p-8 border border-black/5" style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
                  <h3 className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.02em]`} style={{ fontSize: "1.25rem", fontWeight: 700 }}>{c.title}</h3>
                  <p className={`${i % 2 === 0 ? "text-black" : "text-white"} tracking-tight mt-4`} style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND SHOWCASES — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Brand Partners</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Every collection<br /><span className="text-[#F8AE01]">has a story.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-14">
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => go({ page: "brand-detail", id: b.id })}
                  className="group relative rounded-[32px] overflow-hidden text-left bg-white border border-white/10"
                  style={softShadow}
                >
                  <div className="aspect-[5/4] overflow-hidden">
                    <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1500ms]" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{b.tag}</div>
                        <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.375rem", fontWeight: 700 }}>{b.name}</div>
                      </div>
                      <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all shrink-0">
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-black/5">
                      <div>
                        <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.campaigns}</div>
                        <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.7rem" }}>campaigns</div>
                      </div>
                      <div>
                        <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.countries}</div>
                        <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.7rem" }}>countries</div>
                      </div>
                      <div>
                        <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.since}</div>
                        <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.7rem" }}>since</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND LOGO GRID — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Global Brands</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              A growing portfolio<br /><span className="text-black">of trusted brands.</span>
            </h2>
            <div className="mt-14 grid grid-cols-3 md:grid-cols-6 gap-3">
              {brandPartners.map((b) => (
                <div key={b.name} className="rounded-[20px] bg-white border border-black/5 flex items-center justify-center text-center min-h-[90px] overflow-hidden p-4" style={softShadow}>
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} className="max-h-12 max-w-full w-auto object-contain" />
                  ) : (
                    <span className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{b.name}</span>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY BRANDS PARTNER — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Why Brands Partner with KLR</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Unlock the power of loyalty<br /><span className="text-[#F8AE01]">for your brand.</span>
            </h2>
            <p className="text-white/80 tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}>
              For global and premium brands, retail loyalty campaigns represent one of the most effective ways to reach millions of consumers in a trusted, high-frequency shopping environment.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {whyBrandsPartner.map((v, i) => (
                <div key={v.title} className="rounded-[32px] p-6 md:p-10 border border-white/10" style={i % 2 === 0 ? { background: "rgba(255,255,255,0.07)", ...softShadow } : { background: "#F8AE01", ...softShadow }}>
                  <h3 className={`${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.02em]`} style={{ fontSize: "1.375rem", fontWeight: 700, lineHeight: 1.15 }}>{v.title}</h3>
                  <p className={`${i % 2 === 0 ? "text-white/80" : "text-[#2E2784]"} tracking-tight mt-6`} style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HOW BRAND PARTNERSHIPS WORK — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>How Brand Partnerships Work</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              From licensing to in-store:<br /><span className="text-black">a seamless process.</span>
            </h2>
            <div className="mt-14 rounded-[40px] p-6 md:p-14 border border-black/5" style={{ background: "#2E2784", ...softShadow }}>
              <div className="divide-y divide-white/15">
                {brandPartnershipProcess.map((p) => (
                  <div key={p.n} className="py-8 grid md:grid-cols-12 gap-6 first:pt-0 last:pb-0">
                    <div className="md:col-span-2 text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "2rem", fontWeight: 800 }}>{p.n}</div>
                    <div className="md:col-span-4 text-[#F8AE01] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{p.title}</div>
                    <div className="md:col-span-6 text-white tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND CTA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] overflow-hidden border border-white/10 relative" style={softShadow}>
              <ImageWithFallback src={images.human} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#2E2784]/80" />
              <div className="relative p-7 md:p-16">
                <Eyebrow onDark>For Brand Partners</Eyebrow>
                <h2 className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-3xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.05 }}>
                  Interested in reaching millions of<br /><span className="text-white">European consumers through loyalty?</span>
                </h2>
                <p className="text-white tracking-tight mt-8 max-w-xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
                  We're always looking for exciting brands to bring into our loyalty ecosystem.
                </p>
                <div className="mt-10">
                  <CTA label="Become a Brand Partner" variant="yellow" onClick={() => go({ page: "contact" })} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* RETAILER CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
                Discover real stories of success with our clients!
              </h3>
              <CTA label="Our Case Studies" variant="dark" onClick={() => go({ page: "studies" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
