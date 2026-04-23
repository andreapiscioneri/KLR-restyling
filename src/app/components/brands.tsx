"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { brands, brandPartners, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Brands({ go }: { go: (r: Route) => void }) {
  const logos = brandPartners.filter((b) => b.logo).slice(0, 21);
  const rows = [logos.slice(0, 7), logos.slice(7, 14), logos.slice(14, 21)].filter((r) => r.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Brands"
        title={<>Our<br /><span className="text-[#F8AE01]">Brands.</span></>}
        subtitle="We are exciting shoppers and rewarding their loyalty in meaningful ways. We turn doing grocery or filling fuel into rewarding experiences to engage in, encouraging them to return to their favourite retail chains."
        image={images.tailorMade}
        cta={{ label: "Our Case Studies", href: "/work" }}
      />

      {/* EXCLUSIVE REWARDS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
              <h2 className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, fontWeight: 800 }}>
                Exclusive<br />Rewards
              </h2>
              <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "clamp(1rem, 1.5vw, 1.35rem)", lineHeight: 1.55 }}>
                Our partnerships with the world's leading brands guarantee that our rewards collections are tangible, sustainable and unique!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {brands.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  onClick={() => go({ page: "brand-detail", id: b.id })}
                  className="group rounded-[32px] overflow-hidden border border-black/5 text-left bg-white"
                  style={softShadow}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6">
                    <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{b.tag}</div>
                    <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.name}</div>
                  </div>
                </button>
              ))}
            </div>

            {brands.length > 3 && (
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {brands.slice(3, 6).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => go({ page: "brand-detail", id: b.id })}
                    className="group rounded-[32px] overflow-hidden border border-black/5 text-left bg-white"
                    style={softShadow}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                    </div>
                    <div className="p-6">
                      <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{b.tag}</div>
                      <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND PARTNERS + LOGO MARQUEE — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
              <h2 className="text-white tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, fontWeight: 800 }}>
                Brand<br /><span className="text-[#F8AE01]">Partners</span>
              </h2>
              <p className="text-white/80 tracking-tight" style={{ fontSize: "clamp(1rem, 1.5vw, 1.35rem)", lineHeight: 1.55 }}>
                Our partnerships with the world's leading brands guarantee that our rewards collections are tangible, sustainable and unique!
              </p>
            </div>
          </AnimatedSection>
        </div>

        <div className="space-y-8 mt-4">
          {rows.map((row, rowIdx) => {
            const reverse = rowIdx % 2 === 1;
            const durations = [28, 32, 30];
            return (
              <div key={`logos-row-${rowIdx}`} className="logo-marquee">
                <div
                  className="logo-marquee-track"
                  style={{
                    animationDuration: `${durations[rowIdx % durations.length]}s`,
                    animationDirection: reverse ? "reverse" : "normal",
                  }}
                >
                  {[...row, ...row].map((logo, idx) => (
                    <div key={`${logo.name}-${idx}`} className="shrink-0 flex items-center justify-center px-7 md:px-10 min-h-[52px]">
                      <img
                        src={logo.logo as string}
                        alt={logo.name}
                        className="max-h-10 md:max-h-12 w-auto object-contain opacity-90"
                        style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CASE STUDIES CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h2 className="text-[#2E2784] tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                Discover <em className="not-italic text-black">real stories of success</em> with our clients!
              </h2>
              <CTA label="Our Case Studies" variant="dark" onClick={() => go({ page: "studies" })} />
            </div>

            {/* Full-bleed couple image */}
            <div className="mt-16 rounded-[40px] overflow-hidden" style={{ aspectRatio: "16/7" }}>
              <ImageWithFallback src={images.human} alt="Happy KLR customers" className="w-full h-full object-cover object-top" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="text-white tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Are you ready to <span className="text-[#F8AE01]">start something new</span> together?
                </h3>
                <p className="text-white/70 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  Get in touch with us and we'll find the right solution for you
                </p>
              </div>
              <CTA label="Get in Touch" variant="yellow" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
