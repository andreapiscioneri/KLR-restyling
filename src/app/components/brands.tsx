"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight, ArrowDown, Baby, ChefHat, Dumbbell, Plane, Sparkles, Trees, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { softShadow } from "./ui-bits";
import { brandPartners, brandPartnershipProcess, brands as fallbackBrands, images, productCategories, whyBrandsPartner } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";


const G = {
  blue:   "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa:   "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

const collections = [
  { src: "https://klr-europe.com/wp-content/uploads/2023/04/ZAnussi-Cooking-Easy-KLR-Europe-1.jpg", label: "Zanussi — Cooking Easy" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/04/ZAnussi-SUPERGRIP-KLR-Europe.jpg", label: "Zanussi — SuperGrip" },
  { src: "https://klr-europe.com/wp-content/uploads/2024/01/ZAnussi-ZmartMove-KLR-Europe.jpg", label: "Zanussi — Zmart Move" },
  { src: "https://klr-europe.com/wp-content/uploads/2024/01/Pintinox-Trust-Forged-In-Steel.jpg", label: "Pintinox — Trust" },
  { src: "https://klr-europe.com/wp-content/uploads/2025/02/pintinox-barbeque.jpg", label: "Pintinox — Barbeque" },
  { src: "https://klr-europe.com/wp-content/uploads/2025/02/pintinox-hexacore.jpg", label: "Pintinox — Hexacore" },
  { src: "https://klr-europe.com/wp-content/uploads/2025/02/virtuoso.jpg", label: "Pintinox — Virtuoso" },
  { src: "https://klr-europe.com/wp-content/uploads/2024/01/Bugatti-Spezia-KLR-Europe.jpg", label: "Bugatti — Spezia" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Bugatti-Ergo-Pakka-KLR-Europe.jpg", label: "Bugatti — Ergo Pakka" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Bugatti-Prestigio-KLR-Europe.jpg", label: "Bugatti — Prestigio" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Bugatti-Buono-Cookiez-KLR-Europe.jpg", label: "Bugatti — Buono Cookiez" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Bugatti-Buono-Bakeware-KLR-Europe.jpg", label: "Bugatti — Buono Bakeware" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/04/Spear-and-Jackson-The-Best-Sellers-KLR-Europe.jpg", label: "Spear & Jackson — Best Sellers" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Spear-and-Jackson-Sense-of-Adventure-KLR-Europe-1.jpg", label: "Spear & Jackson — Adventure" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Spear-and-Jackson-Sense-of-Nature-KLR-Europe.jpg", label: "Spear & Jackson — Nature" },
  { src: "https://klr-europe.com/wp-content/uploads/2025/02/police.jpg", label: "Police" },
  { src: "https://klr-europe.com/wp-content/uploads/2024/04/Eurosport-Champions.jpg", label: "Eurosport — Champions" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/04/NEWME-Food-Containers-KLR-Europe.jpg", label: "NEWME — Food Containers" },
  { src: "https://klr-europe.com/wp-content/uploads/2023/01/Wastebusters-KLR-Europe-1.jpg", label: "Wastebusters" },
  { src: "https://klr-europe.com/wp-content/uploads/2024/04/NASA-STARDUST-black-KLR-Europe.jpg", label: "NASA Stardust" },
  { src: "https://klr-europe.com/wp-content/uploads/2025/02/Guzzini-Chefline.jpg", label: "Guzzini — Chefline" },
  { src: "https://klr-europe.com/wp-content/uploads/2025/02/waverely.jpg", label: "Waverley" },
];

function CollectionsSlider() {
  const [idx, setIdx] = useState(0);
  const total = collections.length;
  const visible = 3;
  const max = total - visible;

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(max, i + 1));

  return (
    <div className="mt-12 max-w-6xl mx-auto px-8">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + 24px / ${visible} * (${visible} - 1) / ${visible})))` }}
          >
            {collections.map((item) => (
              <div key={item.src} className="shrink-0 rounded-[24px] overflow-hidden" style={{ width: `calc((100% - ${(visible - 1) * 24}px) / ${visible})` }}>
                <div className="aspect-square overflow-hidden">
                  <img src={item.src} alt={item.label} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <div className="pt-3 pb-1 px-1">
                  <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          disabled={idx === 0}
          className="absolute -left-5 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
          style={{ background: "#2E2784", color: "#F8AE01" }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          disabled={idx >= max}
          className="absolute -right-5 top-[45%] -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
          style={{ background: "#2E2784", color: "#F8AE01" }}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-8">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full transition-all"
            style={{ width: i === idx ? "24px" : "8px", height: "8px", background: i === idx ? "#2E2784" : "rgba(46,39,132,0.25)" }}
          />
        ))}
      </div>
    </div>
  );
}

type BrandsCmsData = {
  hero?: { eyebrow?: string; title?: string; subtitle?: string; image?: string; ctaLabel?: string; ctaHref?: string };
  partnerSection?: { eyebrow?: string; title?: string; subtitle?: string };
  featured?: { eyebrow?: string; title?: string };
  closing?: {
    brandEyebrow?: string; brandTitle?: string; brandSubtitle?: string; brandCtaLabel?: string;
    retailerEyebrow?: string; retailerTitle?: string; retailerSubtitle?: string; retailerCtaLabel?: string;
    ctaHref?: string;
  };
};

export function Brands({ go }: { go: (r: Route) => void }) {
  const [brands, setBrands] = useState(fallbackBrands);
  const [brandsCms, setBrandsCms] = useState<BrandsCmsData>({});
  useEffect(() => {
    fetch("/api/content?type=brands", { cache: "no-store" }).then(r => r.json()).then(j => { if (j.data?.length) setBrands(j.data); }).catch(() => {});
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(j => { if (j.data?.brands) setBrandsCms(j.data.brands); })
      .catch(() => {});
  }, []);
  const featured = brands.slice(0, 4);
  const categoryIcons = [ChefHat, Trees, Plane, Sparkles, Baby, Dumbbell] as const;
  const partnerLogos = brandPartners.filter((b) => b.logo);

  const heroEyebrow = brandsCms.hero?.eyebrow || "Brands";
  const heroTitle = brandsCms.hero?.title || "Exceptional Brands. Unforgettable Rewards.";
  const heroSubtitle = brandsCms.hero?.subtitle || "We partner with world-class brands to create exclusive reward collections that inspire desire, deliver satisfaction, and elevate retail loyalty campaigns across Europe.";
  const heroImage = brandsCms.hero?.image || images.tailorMade;
  const heroCtaLabel = brandsCms.hero?.ctaLabel || "Explore Brand Partners";
  const heroCtaHref = brandsCms.hero?.ctaHref || "#featured-brands";
  const visible = (section?: Record<string, string>) => (section as Record<string, unknown> | undefined)?._visible !== false;

  // Split title at period for two-line display
  const titleParts = heroTitle.split(".");
  const titleLine1 = titleParts[0] ? titleParts[0].trim() + "." : heroTitle;
  const titleLine2 = titleParts.slice(1).join(".").trim();

  return (
    <>
      {visible(brandsCms.hero) && <PageHero
        eyebrow={heroEyebrow}
        title={titleLine2 ? <>{titleLine1}<br /><span className="text-[#F8AE01]">{titleLine2}</span></> : <>{heroTitle}</>}
        subtitle={heroSubtitle}
        image={heroImage}
        cta={{ label: heroCtaLabel, href: heroCtaHref }}
      />}

      {/* BRAND PARTNERS MARQUEE — dark */}
      {visible(brandsCms.partnerSection) && <section className="relative py-14 overflow-hidden" style={{ background: "#06051C" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(46,39,132,0.25) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto px-8 mb-10">
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/60 text-center" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {brandsCms.partnerSection?.eyebrow || "Our Brand Partners"}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-8 sm:gap-10 md:gap-12 items-center"
            style={{
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}
          >
            {[...partnerLogos, ...partnerLogos].map((b, i) => (
              <div key={i} className="flex items-center justify-center h-14 w-28 sm:w-32 md:w-36 shrink-0">
                <img
                  src={b.logo!}
                  alt={b.name}
                  className="h-full w-full object-contain"
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }}
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

        {/* CTA */}
        <div className="max-w-6xl mx-auto px-8 mt-12 flex justify-center">
          <button
            onClick={() => document.getElementById("why-partner")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white"
          >
            <span>Become our next Partner</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowDown className="w-4 h-4" />
            </span>
          </button>
        </div>
      </section>}

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

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* FEATURED BRANDS — blue */}
      {visible(brandsCms.featured) && <section id="featured-brands" className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {brandsCms.featured?.eyebrow || "Brand Excellence"}
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {brandsCms.featured?.title ? brandsCms.featured.title : <>Partners That Set<br /><span className="text-[#F8AE01]">the Standard.</span></>}
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-6">
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
          </AnimatedSection>
        </div>
      </section>}

      {/* EXCLUSIVE REWARDS CAROUSEL — rosa */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#2E2784]/08 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Exclusive Rewards
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Our Collections
            </h2>
            <p className="text-[#2E2784]/70 tracking-tight mt-4 max-w-2xl" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              Our partnerships with the world's leading brands guarantee that our rewards collections are tangible, sustainable and unique!
            </p>
          </AnimatedSection>
        </div>

        <CollectionsSlider />
      </section>

      {/* WHY PARTNER — blue */}
      <section id="why-partner" className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
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
              From Brand Strategy to In-Store:
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
      {visible(brandsCms.closing) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="rounded-[30px] p-8 border border-white/15 flex flex-col" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="tracking-[0.22em] uppercase text-[#F8AE01]/75" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                  {brandsCms.closing?.brandEyebrow || "For Brand Partners"}
                </div>
                <h3 className="text-white tracking-[-0.025em] mt-4" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", lineHeight: 1.15, fontWeight: 800 }}>
                  {brandsCms.closing?.brandTitle || "Interested in Reaching Millions of European Consumers Through Loyalty?"}
                </h3>
                <p className="text-white/70 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {brandsCms.closing?.brandSubtitle || "We're always looking for exciting brands to bring into our loyalty ecosystem."}
                </p>
                <div className="mt-auto pt-6 flex flex-col items-start gap-4">
                  <button
                    onClick={() => go({ page: "contact" })}
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                  >
                    <span>{brandsCms.closing?.brandCtaLabel || "Become a Brand Partner"}</span>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </article>

              <article className="rounded-[30px] p-8 border border-white/15 flex flex-col" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="tracking-[0.22em] uppercase text-[#F8AE01]/75" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                  {brandsCms.closing?.retailerEyebrow || "For Retailers"}
                </div>
                <h3 className="text-white tracking-[-0.025em] mt-4" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", lineHeight: 1.15, fontWeight: 800 }}>
                  {brandsCms.closing?.retailerTitle || "Looking for the Perfect Collection for Your Campaign?"}
                </h3>
                <p className="text-white/70 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {brandsCms.closing?.retailerSubtitle || "Tell us your goals and we'll shape the right brand mix for your market and audience."}
                </p>
                <div className="mt-auto pt-6 flex flex-col items-start gap-4">
                  <button
                    onClick={() => go({ page: "contact" })}
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                  >
                    <span>{brandsCms.closing?.retailerCtaLabel || "Choose brand for your next loyalty campaign"}</span>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </article>
            </div>
          </AnimatedSection>
        </div>
      </section>}

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