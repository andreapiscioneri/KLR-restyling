"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/src/app/components/page-hero";
import { images, whatWeDeliver, aboutImpact, moreThanLoyalty, journey } from "@/src/app/data";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function AboutClient() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="About KLR"
        title={<>We Are Central<br /><span className="text-[#F8AE01]">to Loyalty.</span></>}
        subtitle="KLR was born from friendship — different cultures, shared ambitions, and a belief that loyalty is built on trust. Over ten years, we've grown from a three-person office in Koper to a 43-person international team delivering campaigns across 20+ European markets."
        image={images.teamPhoto}
        cta={{ label: "Meet the Team", href: "/team" }}
      />

      {/* BRAND STORY — yellow, with circle image */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  Brand Story
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  Where Others Operate Loyalty Programs, We Design{" "}
                  <span className="text-black">Emotional Loyalty Experiences</span>
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-8" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.65 }}>
                  Traditional loyalty programs focus on systems and incentives. We focus on human emotion, motivation, and satisfaction. We design campaigns that inspire genuine participation — with rewards customers truly value and experiences that feel meaningful.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-5" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.65 }}>
                  Our approach combines behavioural insight with creative design, powerful omnichannel communication, and exceptional reward collections. We help brands turn transactions into lasting relationships.
                </p>
              </div>

              {/* Circles — Services page style */}
              <div className="relative flex justify-center md:justify-end">
                <div
                  className="absolute -bottom-10 -left-6 w-[200px] h-[200px] rounded-full border-[5px] border-[#2E2784]"
                  style={{ background: "color-mix(in oklab, #2E2784 20%, transparent)" }}
                />
                <div
                  className="relative w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-[5px] border-[#2E2784]"
                  style={{ boxShadow: "0 40px 100px -40px rgba(46,39,132,0.18)" }}
                >
                  <img src={images.aboutTonda} alt="KLR — Emotional Loyalty" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* OUR ANSWER — blue, 3 cards */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Our Answer
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              We Design Loyalty Campaigns That…
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {whatWeDeliver.map((item, i) => (
                <div key={item.title} className="rounded-[28px] p-8 border border-[#F8AE01]/25" style={{ background: "rgba(248,174,1,0.12)" }}>
                  <div className="text-[#F8AE01]/50 tracking-[0.1em]" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-white tracking-[-0.02em] mt-5" style={{ fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.2 }}>
                    {item.title}
                  </h3>
                  <p className="text-white/65 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* THE IMPACT — yellow, 3 cards + typographic statement */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              The Impact
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              What This Delivers To You
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {aboutImpact.map((item) => (
                <div key={item.title} className="rounded-[28px] p-8 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
                  <h3 className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p className="text-black/60 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Typographic statement */}
            <div className="mt-24 text-center">
              <p className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1 }}>
                This isn't just Loyalty…<br />
                <span className="text-black">this is Marketing!</span>
              </p>
              <p className="text-[#2E2784]/65 tracking-tight mt-5" style={{ fontSize: "1.1rem" }}>
                And we make the process MORE than simple.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MORE THAN A LOYALTY COMPANY — blue, 3 cards + CTA */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              More Than Loyalty
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              We Are More Than<br /><span className="text-[#F8AE01]">a Loyalty Company</span>
            </h2>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {moreThanLoyalty.map((item) => (
                <div key={item.title} className="rounded-[28px] p-8 border border-[#F8AE01]/25" style={{ background: "rgba(248,174,1,0.12)" }}>
                  <h3 className="text-[#F8AE01] tracking-[-0.02em]" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-white/65 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/team"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
              >
                <span>Discover More About Our Team</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TIMELINE — yellow, horizontal scroll */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Our Journey
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              10 Years of Growth
            </h2>

            {/* Desktop timeline */}
            <div className="hidden md:block mt-14 relative">
              {/* Horizontal line */}
              <div className="absolute left-0 right-0 h-px bg-[#2E2784]/30" style={{ top: "2.25rem" }} />

              <div className="grid grid-cols-9 gap-2">
                {journey.map((j, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Dot */}
                    <div
                      className="w-4 h-4 rounded-full border-2 border-[#2E2784] shrink-0 z-10"
                      style={{ background: i % 2 === 0 ? "#F8AE01" : "#2E2784" }}
                    />
                    {/* Year */}
                    <div className="mt-3 text-[#2E2784] tracking-[0.15em] uppercase text-center" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      {j.year}
                    </div>
                    {/* Title */}
                    <div className="mt-2 text-[#2E2784]/80 tracking-tight text-center" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
                      {j.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline — vertical */}
            <div className="md:hidden mt-14 relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[0.6rem] top-2 bottom-2 w-px bg-[#2E2784]/30" />

              <div className="flex flex-col gap-6">
                {journey.map((j, i) => (
                  <div key={i} className="relative flex gap-4 items-start">
                    {/* Dot */}
                    <div
                      className="absolute -left-6 mt-1 w-4 h-4 rounded-full border-2 border-[#2E2784] shrink-0"
                      style={{ background: i % 2 === 0 ? "#F8AE01" : "#2E2784" }}
                    />
                    <div>
                      <div className="text-[#2E2784] tracking-[0.15em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                        {j.year}
                      </div>
                      <div className="mt-1 text-[#2E2784]/80 tracking-tight" style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>
                        {j.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/10-years"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
              >
                <span>Explore Our Full 10-Year Journey</span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 4rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  Let's Build Something<br /><span className="text-[#F8AE01]">Together</span>
                </h2>
                <p className="text-white/60 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  Whether you're a retailer looking for your next campaign or a brand wanting to reach millions — we'd love to hear from you.
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
                >
                  <span>Keep in Touch!</span>
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
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
