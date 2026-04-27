"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight, Baby, ChefHat, Dumbbell, Plane, Sparkles, Trees } from "lucide-react";
import { softShadow } from "./ui-bits";
import { brandPartners, brandPartnershipProcess, brands, images, productCategories, whyBrandsPartner } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Brands({ go }: { go: (r: Route) => void }) {
  const featured = brands.slice(0, 6);
  const additional = [
    "Zanussi",
    "Guzzini Chefline",
    "Police",
    "Waverley",
    "O bag",
    "Mustang",
    "Carl Schmidt Sohn",
    "Luminarc",
    "Goodyear",
    "Blaupunkt",
    "Elle",
    "NewME",
    "Wastebusters",
  ];
  const categoryIcons = [ChefHat, Trees, Plane, Sparkles, Baby, Dumbbell] as const;

  // Immagini dalla cartella /public come richiesto
  const globalBrandLogos = [
    "/Senza titolo.png",
    "/Senza titolo2.png",
    "/Senza titolo4.png",
    "/Senza titolo3.png",
    "/Senza titolo5.png",
    "/Senza titolo6.png",
    "/Senza titolo7.png",
    "/Senza titolo8.png",
    "/Senza titolo9.png",
    "/Senza titolo10.png",
  ];

  return (
    <>
      <PageHero
        eyebrow="Brands"
        title={<>Exceptional Brands.<br /><span className="text-[#F8AE01]">Unforgettable Rewards.</span></>}
        subtitle="We partner with world-class brands to create exclusive reward collections that inspire desire, deliver satisfaction, and elevate retail loyalty campaigns across Europe."
        image={images.tailorMade}
        cta={{ label: "Explore Brand Partners", href: "#brand-showcases" }}
      />

      {/* PRODUCT CATEGORIES — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Product Categories
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              The Full Scope of Loyalty
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {productCategories.map((c, i) => {
                const Icon = categoryIcons[i % categoryIcons.length];
                return (
                  <article
                    key={c.title}
                    className="rounded-[28px] p-8 border border-white/40"
                    style={{ background: "rgba(255,255,255,0.18)" }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "radial-gradient(120% 120% at 20% 10%, #5b53bf 0%, #2E2784 75%)" }}>
                      <Icon className="w-6 h-6 text-[#F8AE01]" />
                    </div>
                    <h3 className="text-[#2E2784] tracking-[-0.02em] mt-5" style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.25 }}>
                      {c.title}
                    </h3>
                    <p className="text-black/60 tracking-tight mt-3" style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>
                      {c.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND SHOWCASES — blue */}
      <section id="brand-showcases" className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Our Brand Partners
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Selected Partners.
              <br />
              <span className="text-[#F8AE01]">Proven Market Impact.</span>
            </h2>

            <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featured.map((b) => (
                <article key={b.id} className="rounded-[28px] overflow-hidden border border-white/10 bg-[#241f69]" style={softShadow}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      {b.tag}
                    </div>
                    <h3 className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.25 }}>
                      {b.name}
                    </h3>
                    <p className="text-white/65 tracking-tight mt-3" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
                      {b.desc}
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
                        <div className="text-white/45 tracking-[0.14em] uppercase" style={{ fontSize: "0.58rem", fontWeight: 700 }}>Campaigns</div>
                        <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{b.campaigns}</div>
                      </div>
                      <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
                        <div className="text-white/45 tracking-[0.14em] uppercase" style={{ fontSize: "0.58rem", fontWeight: 700 }}>Countries</div>
                        <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{b.countries}</div>
                      </div>
                      <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/10">
                        <div className="text-white/45 tracking-[0.14em] uppercase" style={{ fontSize: "0.58rem", fontWeight: 700 }}>Since</div>
                        <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{b.since}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => go({ page: "brand-detail", id: b.id })}
                      className="mt-5 inline-flex items-center gap-2 text-[#F8AE01] hover:text-white transition-colors tracking-tight"
                      style={{ fontSize: "0.88rem", fontWeight: 600 }}
                    >
                      Explore brand story <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-[24px] p-6 border border-[#F8AE01]/20 bg-[#1f1a5f]">
              <div className="text-[#F8AE01]/75 tracking-[0.2em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                Additional Brands
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {additional.map((name) => (
                  <div
                    key={name}
                    className="rounded-[14px] px-4 py-3 border border-white/12 bg-white/5 text-white/85"
                    style={{ fontSize: "0.86rem", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GLOBAL BRANDS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-24 md:pb-28 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-20 -left-24 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-[340px] h-[340px] rounded-full bg-[#2E2784]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Brand partener
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2.3rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.03 }}>
              Global Brands
            </h2>
            
            {/* Nuovo paragrafo aggiunto qui in stile Hero subtitle */}
            <p className="text-[#2E2784] tracking-tight mt-6 max-w-2xl" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
              We partner up with leading global brands to create loyalty programs able to drive high participation.
            </p>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-10 md:gap-y-12 items-center">
              {globalBrandLogos.map((src, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center min-h-[92px]"
                >
                  <img
                    src={src}
                    alt={`Global Brand ${idx + 1}`}
                    className="max-h-14 md:max-h-16 w-auto object-contain opacity-95"
                    style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(21%) saturate(2500%) hue-rotate(222deg) brightness(88%) contrast(98%)" }}
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY PARTNER — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Why Brands Partner With Us
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Unlock the Power of Loyalty
              <br />
              <span className="text-[#F8AE01]">for Your Brand</span>
            </h2>

            <p className="text-white/70 tracking-tight mt-8 max-w-4xl" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              For global and premium brands, retail loyalty campaigns are one of the most effective ways to reach millions of consumers in a trusted, high-frequency shopping environment.
            </p>

            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {whyBrandsPartner.map((item) => (
                <article key={item.title} className="rounded-[24px] p-6 border border-white/15" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <h3 className="text-[#F8AE01] tracking-[-0.01em]" style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p className="text-white/70 tracking-tight mt-3" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROCESS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              How Brand Partnerships Work
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              From Licensing to In-Store:
              <br />
              <span className="text-black">A Seamless Process</span>
            </h2>

            <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-5 gap-4">
              {brandPartnershipProcess.map((step) => (
                <article
                  key={step.n}
                  className="rounded-[24px] p-6 border border-white/50"
                  style={{ background: "rgba(255,255,255,0.22)" }}
                >
                  <div className="text-[#2E2784]/45 tracking-[0.12em]" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                    {step.n}
                  </div>
                  <h3 className="text-[#2E2784] tracking-[-0.01em] mt-3" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}>
                    {step.title}
                  </h3>
                  <p className="text-black/60 tracking-tight mt-3" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DUAL CTA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="rounded-[30px] p-8 border border-white/15 flex flex-col" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="tracking-[0.22em] uppercase text-[#F8AE01]/75" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                  Brand CTA
                </div>
                <h3 className="text-white tracking-[-0.025em] mt-4" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", lineHeight: 1.15, fontWeight: 800 }}>
                  Interested in Reaching Millions of European Consumers Through Loyalty?
                </h3>
                <p className="text-white/70 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  We're always looking for exciting brands to bring into our loyalty ecosystem.
                </p>
                <div className="mt-auto pt-6 flex flex-col items-start gap-4">
                  <a href="mailto:brands@klr-europe.com" className="text-[#F8AE01] hover:text-white transition-colors tracking-tight" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    brands@klr-europe.com
                  </a>
                  <button
                    onClick={() => go({ page: "contact" })}
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                  >
                    <span>Become a Brand Partner</span>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </article>

              <article className="rounded-[30px] p-8 border border-white/15 flex flex-col" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="tracking-[0.22em] uppercase text-[#F8AE01]/75" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                  Retailer CTA
                </div>
                <h3 className="text-white tracking-[-0.025em] mt-4" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", lineHeight: 1.15, fontWeight: 800 }}>
                  Looking for the Perfect Collection for Your Campaign?
                </h3>
                <p className="text-white/70 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Tell us your goals and we'll shape the right brand mix for your market and audience.
                </p>
                <div className="mt-auto pt-6 flex flex-col items-start gap-4">
                  <button
                    onClick={() => go({ page: "contact" })}
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                  >
                    <span>Keep in Touch!</span>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </article>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* EXTRA CTA — yellow */}
      <section className="relative pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-20 right-12 w-[300px] h-[300px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", lineHeight: 1.1, fontWeight: 800 }}>
                  Want to see campaigns already live in market?
                </h2>
                <p className="text-black/60 tracking-tight mt-5" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                  Explore selected case studies from grocery and petrol retail across Europe.
                </p>
              </div>
              <div className="md:text-right">
                <button
                  onClick={() => go({ page: "studies" })}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>See How We Execute</span>
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