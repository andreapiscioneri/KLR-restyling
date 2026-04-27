"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, Star, Award } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { images, stats, brandPartners, studies, fallbackPosts, loyaltyFramework, sectors, retailers, locations } from "@/src/app/data";

const gradients = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={images.hero} alt="KLR Hero" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-[#2E2784]/65" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-6xl mx-auto px-8 flex flex-col justify-center min-h-screen pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="tracking-[0.3em] uppercase text-[#F8AE01]"
          style={{ fontSize: "0.65rem", fontWeight: 600 }}
        >
          Key to Loyalty in Retail
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We Design
          <br />
          <span className="text-[#F8AE01]">Emotional Loyalty.</span>
        </motion.h1>

        <motion.p
          className="text-white/85 tracking-tight max-w-2xl mt-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Loyalty campaigns that excite and engage customers of all targets. Deliver real impact to your stores with measurable KPIs. Easy to run for retailers and their marketing teams.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
          >
            <span>Discover How We Work</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            KLR In Numbers
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            When Figures Matter…
          </h2>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-[24px] p-7 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.campaigns}
              </div>
              <div className="mt-3 text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.9rem" }}>Campaigns Delivered</div>
            </div>
            <div className="rounded-[24px] p-7 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.retailers}
              </div>
              <div className="mt-3 text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.9rem" }}>Retail Chains as Clients</div>
            </div>
            <div className="rounded-[24px] p-7 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.countries}
              </div>
              <div className="mt-3 text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.9rem" }}>Countries Operating</div>
            </div>
            {/* 10+ Years — highlighted anniversary stat */}
            <div className="rounded-[24px] p-7 border border-[#2E2784]/20" style={{ background: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 60%, #241f69 100%)" }}>
              <div className="text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.years}
              </div>
              <div className="mt-3 text-white/80 tracking-tight" style={{ fontSize: "0.9rem" }}>Years of Loyalty Activity</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-[24px] p-7 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.combinedExperience}
              </div>
              <div className="mt-3 text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.9rem" }}>Years of Combined Loyalty Experience</div>
            </div>
            <div className="rounded-[24px] p-7 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.people}
              </div>
              <div className="mt-3 text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.9rem" }}>People in Our Team</div>
            </div>
            <div className="rounded-[24px] p-7 border border-white/40" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1 }}>
                {stats.nationalities}
              </div>
              <div className="mt-3 text-[#2E2784]/70 tracking-tight" style={{ fontSize: "0.9rem" }}>Nationalities in House</div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
            >
              <span>Discover More About Us</span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternationalPresence() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Presence
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            We Are Truly <span className="text-[#F8AE01]">International</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img src={images.map} alt="KLR European presence" className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {locations.map((loc) => (
                <div key={loc.city} className="rounded-[16px] px-5 py-4 border border-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="text-white font-semibold tracking-tight" style={{ fontSize: "1rem" }}>{loc.city}</div>
                  <div className="text-white/50 mt-0.5 tracking-tight" style={{ fontSize: "0.8rem" }}>{loc.country}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

{/* LOYALTY FRAMEWORK: SOLO GIALLO E BLU, NIENTE BIANCO/NERO */}
function LoyaltyFramework() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F8AE01]/50 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Column: Text & Pillars */}
            <div className="lg:w-1/2 w-full">
              <div className="inline-block  text-[#2E2784]  tracking-[0.1em] uppercase px-4 py-1.5 rounded-full mb-8" style={{ fontSize: "0.65rem" }}>
                The KLR Loyalty Framework
              </div>
              
              <h2 className="text-[#2E2784] tracking-[-0.035em] mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
                Designing <br />
                <span className="text-black italic">Emotional Loyalty</span>
              </h2>
              
              <p className="text-[#2E2784]/80 tracking-tight mb-8" style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                Our 3 Pillars of Loyalty:
              </p>

              <div className="space-y-6">
                {/* 1. Desire */}
                <div className="bg-[#2E2784]/5 backdrop-blur-sm border border-[#2E2784]/20 rounded-[28px] p-6 shadow-sm">
                  <Heart className="w-8 h-8 text-[#2E2784] mb-4" />
                  <div className="inline-block bg-[#2E2784] text-[#F8AE01] font-bold uppercase tracking-wider px-4 py-1 rounded-full mb-3" style={{ fontSize: "0.75rem" }}>
                    Desire
                  </div>
                  <p className="text-[#2E2784] text-lg leading-snug">
                    "Dream" High-Quality <span className="font-black text-[#2E2784]">Rewards</span> that Money Can't Buy
                  </p>
                </div>
                
                {/* 2. Experience */}
                <div className="bg-[#2E2784]/5 backdrop-blur-sm border border-[#2E2784]/20 rounded-[28px] p-6 shadow-sm">
                  <Star className="w-8 h-8 text-[#2E2784] mb-4" fill="currentColor" />
                  <div className="inline-block bg-[#2E2784] text-[#F8AE01] font-bold uppercase tracking-wider px-4 py-1 rounded-full mb-3" style={{ fontSize: "0.75rem" }}>
                    Experience
                  </div>
                  <p className="text-[#2E2784] text-lg leading-snug">
                    High Participation is The Key to <span className="font-black italic text-[#2E2784]">Real Engagement</span>
                  </p>
                </div>
                
                {/* 3. Satisfaction */}
                <div className="bg-[#2E2784]/5 backdrop-blur-sm border border-[#2E2784]/20 rounded-[28px] p-6 shadow-sm">
                  <Award className="w-8 h-8 text-[#2E2784] mb-4" />
                  <div className="inline-block bg-[#2E2784] text-[#F8AE01] font-bold uppercase tracking-wider px-4 py-1 rounded-full mb-3" style={{ fontSize: "0.75rem" }}>
                    Satisfaction
                  </div>
                  <p className="text-[#2E2784] text-lg leading-snug">
                    High Perceived Value Rewards that last 4ever into Your Best Customers' Heart <span className="font-black italic block mt-1 text-[#2E2784]">Long Positive Memory Effect</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic CSS Venn Diagram (Solo Giallo e Blu) */}
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end items-center min-h-[450px]">
              <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">
                
                {/* Top Circle - Desire (Heart) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] border-[#2E2784] bg-[#2E2784]/5 flex justify-center pt-8 sm:pt-10 backdrop-blur-sm transition-transform hover:scale-105 duration-500">
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-[#2E2784]" />
                </div>

                {/* Bottom Left Circle - Experience (Star) */}
                <div className="absolute bottom-4 left-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] border-[#2E2784] bg-[#1a1752]/5 flex items-end justify-start pb-10 pl-10 sm:pb-14 sm:pl-14 backdrop-blur-sm transition-transform hover:scale-105 duration-500">
                  <Star className="w-10 h-10 sm:w-14 sm:h-14 text-[#2E2784]" fill="currentColor" />
                </div>

                {/* Bottom Right Circle - Satisfaction (Award) */}
                <div className="absolute bottom-4 right-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] border-[#2E2784] bg-[#5b53bf]/5 flex items-end justify-end pb-10 pr-10 sm:pb-14 sm:pr-14 backdrop-blur-sm transition-transform hover:scale-105 duration-500">
                  <Award className="w-10 h-10 sm:w-14 sm:h-14 text-[#2E2784]" />
                </div>

                {/* Center Core - Emotional Loyalty (Heart) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 z-20 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#2E2784] shadow-[0_0_40px_rgba(46,39,132,0.4)] animate-pulse">
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-[#F8AE01] fill-[#F8AE01]" />
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-16 flex justify-center lg:justify-start">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-[#F8AE01] hover:bg-[#1a1752] "
            >
              <span>Explore Our Services</span>
              <span className="w-8 h-8 rounded-full bg-[#F8AE01]/20 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

        </AnimatedSection>
      </div>
    </section>
  );
}

function TwoSectors() {
  const sectorImgs = [images.family, images.petrolCouple];

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Expertise
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            Two Sectors. <span className="text-[#F8AE01]">Deep Expertise.</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {sectors.map((s, i) => (
              <div key={s.title} className="rounded-[32px] overflow-hidden relative" style={{ minHeight: "380px" }}>
                <img src={sectorImgs[i]} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(36,31,105,0.92) 0%, rgba(36,31,105,0.5) 50%, transparent 100%)" }} />
                <div className="relative flex flex-col justify-end p-8" style={{ minHeight: "380px" }}>
                  <h3 className="text-white tracking-[-0.02em]" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700 }}>{s.title}</h3>
                  <p className="text-white/75 mt-4 max-w-sm tracking-tight" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ClientLogos() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Our Clients
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            The Leading Retailers Who<br className="hidden md:block" /> Already Trusted Us
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-[#2E2784] tracking-[0.2em] uppercase font-bold border-b border-[#2E2784]/20 pb-3 mb-6" style={{ fontSize: "0.75rem" }}>
                Grocery
              </div>
              <p className="text-[#2E2784] tracking-tight leading-relaxed" style={{ fontSize: "1rem" }}>
                {retailers.grocery.join(" · ")}
              </p>
            </div>
            <div>
              <div className="text-[#2E2784] tracking-[0.2em] uppercase font-bold border-b border-[#2E2784]/20 pb-3 mb-6" style={{ fontSize: "0.75rem" }}>
                Petrol
              </div>
              <p className="text-[#2E2784] tracking-tight leading-relaxed" style={{ fontSize: "1rem" }}>
                {retailers.petrol.join(" · ")}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function OurBrands() {
  const logos = brandPartners.filter((b) => b.logo);
  const rows = [logos.slice(0, 6), logos.slice(6, 12), logos.slice(12)].filter((r) => r.length > 0);
  const durations = [28, 32, 30];

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Brand Partners
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            Global Brands That<br /><span className="text-[#F8AE01]">Power Our Campaigns</span>
          </h2>
        </AnimatedSection>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-14 overflow-hidden">
        <div className="space-y-8">
          {rows.map((row, rowIdx) => (
            <div key={`brands-row-${rowIdx}`} className="logo-marquee">
              <div
                className="logo-marquee-track"
                style={{
                  animationDuration: `${durations[rowIdx % durations.length]}s`,
                  animationDirection: rowIdx % 2 === 1 ? "reverse" : "normal",
                }}
              >
                {[...row, ...row, ...row].map((b, idx) => (
                  <div key={`${b.name}-${idx}`} className="shrink-0 flex items-center justify-center px-7 md:px-10 min-h-[52px]">
                    <img
                      src={b.logo as string}
                      alt={b.name}
                      className="max-h-10 md:max-h-12 w-auto object-contain opacity-90"
                      style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-14">
        <AnimatedSection>
          <Link
            href="/brands"
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
          >
            <span>Discover Our Brand Portfolio</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CaseStudies() {
  const entries = studies.slice(0, 3);

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-20 -left-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Case Studies
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            Loyalty Campaigns That <span className="text-black">Drive Results</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <Link key={entry.id} href={`/work/${entry.id}`} className="group flex flex-col rounded-[28px] overflow-hidden bg-[#241f69] border border-white/10">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={entry.img} alt={entry.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-white tracking-[-0.02em]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.35rem)", lineHeight: 1.3 }}>
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-white/60 tracking-tight" style={{ fontSize: "0.88rem", lineHeight: 1.55 }}>{entry.summary}</p>
                  <div className="mt-auto pt-4 text-[#F8AE01] tracking-tight font-semibold group-hover:text-white transition-colors" style={{ fontSize: "0.88rem" }}>
                    Read More
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/work"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
            >
              <span>See All Case Studies</span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function BlogPreview() {
  const posts = fallbackPosts.slice(0, 3);

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-24 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Insights
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            Latest <span className="text-[#F8AE01]">Insights</span>
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col rounded-[28px] overflow-hidden bg-white/10 border border-white/15">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-white tracking-[-0.02em]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.35rem)", lineHeight: 1.3 }}>
                    {post.title}
                  </h3>
                  <p className="mt-3 text-white/60 tracking-tight" style={{ fontSize: "0.88rem", lineHeight: 1.55 }}>{post.excerpt}</p>
                  <div className="mt-auto pt-4 text-[#F8AE01] tracking-tight font-semibold group-hover:text-white transition-colors" style={{ fontSize: "0.88rem" }}>
                    Read More
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
            >
              <span>See All Insights</span>
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[#2E2784]" style={{ fontSize: "clamp(1.6rem, 2.8vw, 3rem)", lineHeight: 1.1, fontWeight: 800 }}>
                Ready to Design Your Next<br />Loyalty Experience?
              </h2>
              <p className="mt-8 text-black" style={{ fontSize: "clamp(1.08rem, 1.5vw, 1.5rem)", lineHeight: 1.4 }}>
                Let's talk about how we can help your customers come back more often, spend more, and feel great about it.
              </p>
            </div>
            <div className="md:text-right">
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black">
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
  );
}

export function HomePage() {
  return (
    <div>
      <Hero />
      <StatsBar />
      <InternationalPresence />
      <LoyaltyFramework />
      <TwoSectors />
      <ClientLogos />
      <OurBrands />
      <CaseStudies />
      <BlogPreview />
      <ClosingCta />
    </div>
  );
}