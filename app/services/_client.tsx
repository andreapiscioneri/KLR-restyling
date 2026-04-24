"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/src/app/components/page-hero";
import { pillars, sectors } from "@/src/app/data";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
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

              <p className={`${textColor} tracking-tight mt-6 italic`} style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Overall, we are loyalty makers for any retailer.
              </p>

              {index === 1 && (
                <div className="mt-8">
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
                className={`absolute -bottom-10 -left-6 w-[200px] h-[200px] rounded-full border-[5px] ${isYellow ? "border-[#2E2784]" : "border-[#F8AE01]"}`}
                style={{ background: isYellow ? "color-mix(in oklab, #2E2784 20%, transparent)" : "color-mix(in oklab, #F8AE01 20%, transparent)" }}
              />
              <div
                className={`relative w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[5px] ${isYellow ? "border-[#2E2784]" : "border-[#F8AE01]"}`}
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

export function ServicesClient() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Our Services"
        title={<>360° Loyalty<br /><span className="text-[#F8AE01]">Campaign Design & Execution</span></>}
        subtitle="From the first strategic brief to the last reward delivered — we cover every stage, in every market."
        image="/3.png"
        cta={{ label: "Let's Talk", href: "/contact" }}
      >
        <div className="max-w-2xl mt-5">
          <p className="text-white/65 tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
            We design and execute loyalty campaigns that increase store visits, grow average ticket, turn occasional shoppers into loyal customers, build emotional brand connection, and make your banner stand out with buzz, reputation, virality, and market share.
          </p>
          <p className="text-[#F8AE01] tracking-tight mt-4" style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 }}>
            Emotionally engaging for customers and simple to run for retailers.
          </p>
        </div>
      </PageHero>

      {/* SERVICE OVERVIEW — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Born for Grocery &amp; Petrol
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Three Pillars.<br />One Seamless Experience.
            </h2>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {sectors.map((s) => (
                <div key={s.title} className="rounded-[28px] p-8" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <h3 className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                    {s.title}
                  </h3>
                  <p className="text-black/60 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
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

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 4rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  Every Campaign Is Different.<br />
                  <span className="text-black">Let's Find the Right Approach for Yours.</span>
                </h2>
                <p className="text-[#2E2784]/65 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  Whether you're launching your first loyalty programme or optimising an existing one — we'd love to hear from you.
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>Keep in Touch!</span>
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
