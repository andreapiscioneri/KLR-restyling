"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/src/app/components/page-hero";
import { pillars, sectors, images } from "@/src/app/data";

const G = {
  blue:   "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa:   "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

const pillarImages = ["/1.png", "/2.png", "/3.png"];

// Pillar 1 (blue), Pillar 2 (yellow), Pillar 3 (blue)
const pillarBg = [G.blue, G.yellow, G.blue];

function PillarSection({
  pillar,
  img,
  bg,
  index,
}: {
  pillar: (typeof pillars)[0];
  img: string;
  bg: string;
  index: number;
}) {
  const isYellow = index % 2 === 1;
  const eyebrowColor = isYellow ? "text-[#2E2784]/60" : "text-[#F8AE01]/70";
  const headingColor = isYellow ? "text-[#2E2784]" : "text-white";
  const textColor = isYellow ? "text-black/60" : "text-white/60";
  const rowCard = isYellow
    ? { background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)" }
    : { background: "rgba(248,174,1,0.12)", border: "1px solid rgba(248,174,1,0.25)" };
  const rowLabelColor = isYellow ? "text-[#2E2784]" : "text-[#F8AE01]";
  const rowTextColor = isYellow ? "text-[#2E2784]/75" : "text-white/65";

  // Alternate image side: odd index → image right (default), even → image left
  const imageRight = index % 2 === 0;

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: bg }}>
      {isYellow ? (
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      ) : (
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
      )}

      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${imageRight ? "" : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"}`}>
            {/* Text */}
            <div>
              <div className={`tracking-[0.3em] uppercase ${eyebrowColor}`} style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                Pillar {pillar.n}
              </div>
              <h2 className={`${headingColor} tracking-[-0.04em] mt-6`} style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", lineHeight: 1.05, fontWeight: 800 }}>
                {pillar.title}
              </h2>

              {/* What / How / You Get */}
              <div className="mt-10 flex flex-col gap-4">
                {[
                  { label: "What it is", value: pillar.what },
                  { label: "How it works", value: pillar.how },
                  { label: "What you get", value: pillar.out },
                ].map((row) => (
                  <div key={row.label} className="rounded-[20px] p-5" style={rowCard}>
                    <div className={`${rowLabelColor} tracking-[0.2em] uppercase`} style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                      {row.label}
                    </div>
                    <p className={`${rowTextColor} tracking-tight mt-2`} style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>

              {index === 1 && (
                <div className="mt-8 flex">
                  <Link
                    href="/case-studies/"
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                  >
                    <span>See How We Execute</span>
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Circle image */}
            <div className="relative flex justify-center md:justify-end">
              <div
                className="absolute -bottom-10 -left-6 w-[200px] h-[200px] rounded-full"
                style={{ background: isYellow ? "color-mix(in oklab, #2E2784 20%, transparent)" : "color-mix(in oklab, #F8AE01 20%, transparent)" }}
              />
              <div
                className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden"
                style={{ boxShadow: "0 40px 100px -40px rgba(46,39,132,0.18)" }}
              >
                <img src={img} alt={pillar.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

type ServicesCms = Record<string, Record<string, string | string[]>>;

export function ServicesClient() {
  const [cms, setCms] = useState<ServicesCms>({});

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { if (d?.data?.services) setCms(d.data.services as ServicesCms); })
      .catch(() => {});
  }, []);

  const sHero    = cms.hero    || {};
  const sOverview= cms.overview|| {};
  const sNext    = cms.nextChallenge || {};
  const sClosing = cms.closing || {};

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow={String(sHero.eyebrow || "Our Services")}
        title={sHero.title ? String(sHero.title) : <>360° Loyalty<br /><span className="text-[#F8AE01]">Campaign Design & Execution</span></>}
        subtitle={String(sHero.subtitle || "From the first strategic brief to the last reward delivered — we cover every stage, in every market.")}
        image={String(sHero.image || images.human)}
        cta={{ label: "Let's Talk", href: "/contact" }}
      >
        <div className="max-w-2xl mt-5">
          <p className="text-white/65 tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            {String(sOverview.bodyText || "We design and execute loyalty campaigns that increase store visits, grow average ticket, turn occasional shoppers into loyal customers, build emotional brand connection, and make your banner stand out with buzz, reputation, virality, and market share.")}
          </p>
          <p className="text-[#F8AE01] tracking-tight mt-4" style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 }}>
            {String(sOverview.tagline || "Emotionally engaging for customers and simple to run for retailers.")}
          </p>
        </div>
      </PageHero>

      {/* SERVICE OVERVIEW — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {String(sOverview.eyebrow || "Our Services")}
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {String(sOverview.title || "Three Pillars. One Seamless Experience.")}
            </h2>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p) => (
                <div key={p.n} className="rounded-[28px] p-8" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <div className="text-[#2E2784]/40 tracking-[0.1em]" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    {p.n}
                  </div>
                  <h3 className="text-[#2E2784] tracking-[-0.02em] mt-4" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25 }}>
                    {p.title}
                  </h3>
                  <p className="text-black/55 tracking-tight mt-3" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {p.what}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PILLAR SECTIONS */}
      {pillars.map((p, i) => (
        <PillarSection
          key={p.n}
          pillar={p}
          img={pillarImages[i]}
          bg={pillarBg[i]}
          index={i}
        />
      ))}

      {/* BORN FOR GROCERY & PETROL + NEXT CHALLENGE */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>

            {/* ── Born for Grocery & Petrol ── */}
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Our Ecosystem
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4 mb-10" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              We Were Born for<br /><span className="text-black">Grocery &amp; Petrol</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {[
                { title: sectors[0].title, desc: sectors[0].desc, img: images.family },
                { title: sectors[1].title, desc: sectors[1].desc, img: images.hero },
              ].map((s) => (
                <div key={s.title} className="rounded-[28px] overflow-hidden relative" style={{ minHeight: "280px" }}>
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(46,39,132,0.92) 0%, rgba(46,39,132,0.5) 50%, transparent 100%)" }} />
                  <div className="relative flex flex-col justify-end p-8" style={{ minHeight: "280px" }}>
                    <h3 className="text-white tracking-[-0.02em]" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{s.title}</h3>
                    <p className="text-white/70 mt-3 tracking-tight" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Next Challenge — 2 col: text+pills left, image right ── */}
            <div className="rounded-[32px] overflow-hidden grid md:grid-cols-2" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}>
              {/* Left */}
              <div className="p-10 md:p-12 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-[#2E2784] tracking-tight mb-8" style={{ fontSize: "1.05rem", fontWeight: 600 }}>
                    {String(sNext.intro || "But we are ready to take on the next challenge:")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {(Array.isArray(sNext.challenges) ? sNext.challenges : ["Drugstores", "Pet Stores", "Convenience Stores & On-The-Go", "All-In-Stores (Bazaars)"]).map((cat) => (
                      <span
                        key={String(cat)}
                        className="px-5 py-2.5 rounded-full tracking-tight"
                        style={{ background: "rgba(255,255,255,0.6)", border: "2px solid #2E2784", color: "#2E2784", fontSize: "0.88rem", fontWeight: 700 }}
                      >
                        {String(cat)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* "Overall" statement */}
                <div className="rounded-[20px] px-7 py-6" style={{ background: "#241f69" }}>
                  <p className="tracking-[-0.02em]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", fontWeight: 800, lineHeight: 1.25, color: "white" }}>
                    {String(sNext.closing || "Overall, we are loyalty Makers for any retailer.")}
                  </p>
                </div>
              </div>

              {/* Right — cartoon in circle with blue bg */}
              <div className="relative flex items-center justify-center min-h-[320px] p-10" style={{ background: "#2E2784" }}>
                <div className="absolute bottom-6 left-6 w-28 h-28 rounded-full" style={{ background: "rgba(46,39,132,0.5)" }} />
                <img src="/1.png" alt="Loyalty for any retailer" className="relative z-10 w-full max-w-[320px] h-auto object-contain" />
              </div>
            </div>

          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 4rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  {String(sClosing.title || "Every Campaign Is Different. Let's Find the Right Approach for Yours.")}
                </h2>
                <p className="text-[#2E2784]/65 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  {String(sClosing.subtitle || "Whether you're launching your first loyalty programme or optimising an existing one — we'd love to hear from you.")}
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href={String(sClosing.ctaHref || "/contact")}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>{String(sClosing.ctaLabel || "Get in Touch")}</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
