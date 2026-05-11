"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, Heart, Star, Award, Trophy, Globe, ShoppingCart, Clock, Users, Flag } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { images, stats, brandPartners, studies, fallbackPosts, loyaltyFramework, sectors, retailers, locations } from "@/src/app/data";

const gradients = {
  blue:   "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa:   "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={images.petrolCouple} alt="KLR Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#2E2784]/70" />
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
            href="/work"
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

/* ── Stat card color variants (inspired by corporate deck) ──
   dark  = anthracite bg, amber number
   lilac = light lilac bg, dark blue number
   blue  = KLR blue bg, amber number               */
const statCards = [
  { value: stats.campaigns,          label: "Campaigns Delivered Up to Now",          variant: "dark",  Icon: Trophy       },
  { value: stats.countries,          label: "Countries Operating",                    variant: "lilac", Icon: Globe        },
  { value: stats.retailers,          label: "Retail Chains as Clients",               variant: "lilac", Icon: ShoppingCart },
  { value: stats.combinedExperience, label: "Years of Combined Loyalty Experience",   variant: "dark",  Icon: Clock        },
  { value: stats.nationalities,      label: "Nationalities In House",                 variant: "dark",  Icon: Flag         },
  { value: stats.people,             label: "People In Our Team",                     variant: "lilac", Icon: Users        },
];

const cardStyles: Record<string, React.CSSProperties> = {
  dark:  { background: "#2C2C34", borderColor: "transparent" },
  lilac: { background: "#E8DEFF", borderColor: "transparent" },
};
const numColor: Record<string, string> = {
  dark:  "#F8AE01",
  lilac: "#2E2784",
};
const labelColor: Record<string, string> = {
  dark:  "rgba(255,255,255,0.55)",
  lilac: "rgba(46,39,132,0.65)",
};

function StatsBar() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#C8B8F0]/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            KLR In Numbers
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            When <span className="italic text-[#F8AE01]">Figures</span> Matter…
          </h2>

          {/* Main grid: big 10-anni card left + 2×3 smaller cards right */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* ── 10 Anni featured card ── */}
            <div
              className="md:col-span-4 rounded-[28px] p-8 flex flex-col justify-between min-h-[340px] relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, #1a1a24 0%, #2C2C34 60%, #2E2784 100%)" }}
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F8AE01 0%, transparent 70%)" }} />
              <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C8B8F0 0%, transparent 70%)" }} />
              <div className="relative z-10 flex flex-col h-full">
                {/* Anniversary logo */}
                <div className="flex-1 flex items-center justify-start">
                  <img
                    src="/anniv.png"
                    alt="KLR 10 Years Anniversary"
                    className="w-40 h-40 object-contain drop-shadow-[0_0_32px_rgba(248,174,1,0.35)]"
                  />
                </div>
                <div>
                  <div className="text-white/55 tracking-tight" style={{ fontSize: "0.88rem", lineHeight: 1.4 }}>
                    Years of Loyalty<br />Activity For Retail
                  </div>
                  <Link
                    href="/10-years"
                    className="mt-5 inline-flex items-center gap-2 text-[#F8AE01]/80 hover:text-[#F8AE01] transition-colors tracking-tight"
                    style={{ fontSize: "0.82rem", fontWeight: 600 }}
                  >
                    Our Anniversary <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── 6 stat cards (2 cols × 3 rows on md) ── */}
            <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {statCards.map(({ Icon, ...s }) => (
                <div
                  key={s.label}
                  className="rounded-[24px] p-6 flex flex-col justify-between"
                  style={{ ...cardStyles[s.variant], border: "1px solid transparent", minHeight: "140px" }}
                >
                  <Icon className="w-5 h-5 mb-2" style={{ color: numColor[s.variant], opacity: 0.7 }} />
                  <div>
                    <div
                      className="tracking-[-0.04em]"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1, color: numColor[s.variant] }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 tracking-tight leading-snug" style={{ fontSize: "0.82rem", color: labelColor[s.variant] }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex">
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white"
            >
              <span>Discover More About Us</span>
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

function InternationalPresence() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Presence
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            We are truly <span className="text-[#F8AE01]">international</span>
          </h2>

          <p className="text-white/60 tracking-tight mt-6 max-w-2xl" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            Based in Italy and Slovenia, we operate in 20 countries in Europe and keep growing. Having an international network of partners helps us to better serve our multinational clients by providing local expertise and understanding of different cultures and consumer behaviours.
          </p>

          <div className="mt-10 flex justify-center">
            <img src={images.map} alt="KLR European presence" className="w-full max-w-3xl h-auto" />
          </div>

          {/* City grid — 5 col desktop, 2 col mobile */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {locations.map((l, i) => {
              const accents = ["#F8AE01","#C8B8F0","#F8AE01","#C8B8F0","#F8AE01","#C8B8F0","#F8AE01","#C8B8F0","#F8AE01","#C8B8F0"];
              const acc = accents[i];
              return (
                <div
                  key={l.city}
                  className="rounded-[16px] overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {/* Colour bar top */}
                  <div style={{ height: "4px", background: acc }} />
                  <div className="px-4 py-3">
                    <div className="tracking-[0.15em] uppercase" style={{ fontSize: "0.58rem", fontWeight: 700, color: acc, opacity: 0.85 }}>
                      {l.country}
                    </div>
                    <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                      {l.city}
                    </div>
                  </div>
                </div>
              );
            })}
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
              <div className="tracking-[0.3em] uppercase text-[#2E2784]/60"  style={{fontSize: "0.65rem", fontWeight: 600, marginBottom: "0.75rem"}}>
                The KLR Loyalty Framework
              </div>
              
              <h2 className="text-[#2E2784] tracking-[-0.035em] mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
                Designing <br />
                <span className="text-black italic">Emotional Loyalty</span>
              </h2>
              
              <p className="text-[#2E2784]/80 tracking-tight mb-8" style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                Our 3 Pillars of Loyalty:
              </p>

              <div className="space-y-4">
                {/* 1. Desire — antracite */}
                <div className="rounded-[24px] p-6" style={{ background: "#2C2C34" }}>
                  <Heart className="w-7 h-7 mb-3" style={{ color: "#F8AE01" }} />
                  <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "#F8AE01", color: "#2C2C34" }}>
                    Desire
                  </div>
                  <p className="text-white/80 leading-snug" style={{ fontSize: "0.95rem" }}>
                    "Dream" High-Quality <span className="font-black text-white">Rewards</span> that Money Can't Buy
                  </p>
                </div>

                {/* 2. Experience — lilla */}
                <div className="rounded-[24px] p-6" style={{ background: "#C8B8F0" }}>
                  <Star className="w-7 h-7 mb-3" style={{ color: "#2E2784" }} fill="currentColor" />
                  <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "#2E2784", color: "#C8B8F0" }}>
                    Experience
                  </div>
                  <p className="text-[#2E2784] leading-snug" style={{ fontSize: "0.95rem" }}>
                    High Participation is The Key to <span className="font-black italic">Real Engagement</span>
                  </p>
                </div>

                {/* 3. Satisfaction — blu KLR */}
                <div className="rounded-[24px] p-6" style={{ background: "#2E2784" }}>
                  <Award className="w-7 h-7 mb-3" style={{ color: "#F8AE01" }} />
                  <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "#F8AE01", color: "#2E2784" }}>
                    Satisfaction
                  </div>
                  <p className="text-white/80 leading-snug" style={{ fontSize: "0.95rem" }}>
                    High Perceived Value Rewards that last 4ever into Your Best Customers' Heart <span className="font-black italic block mt-1 text-white">Long Positive Memory Effect</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic CSS Venn Diagram (Solo Giallo e Blu) */}
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end items-center min-h-[450px]">
              <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">
                
                {/* Top Circle - Desire — antracite */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex justify-center pt-8 sm:pt-10 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#2C2C34", background: "rgba(44,44,52,0.12)" }}>
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#2C2C34" }} />
                </div>

                {/* Bottom Left Circle - Experience — lilla */}
                <div className="absolute bottom-4 left-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex items-end justify-start pb-10 pl-10 sm:pb-14 sm:pl-14 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#C8B8F0", background: "rgba(200,184,240,0.18)" }}>
                  <Star className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#9B7FD4" }} fill="currentColor" />
                </div>

                {/* Bottom Right Circle - Satisfaction — blu KLR */}
                <div className="absolute bottom-4 right-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex items-end justify-end pb-10 pr-10 sm:pb-14 sm:pr-14 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#2E2784", background: "rgba(46,39,132,0.10)" }}>
                  <Award className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#2E2784" }} />
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
  const sectorImgs = [images.family, images.hero];

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Expertise
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            Two Sectors. <span className="text-black">Deep Expertise.</span>
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
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.rosa }}>
      <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-[#2E2784]/08 blur-3xl" />
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
  const allRows = [logos.slice(0, 6), logos.slice(6, 12), logos.slice(12)].filter((r) => r.length > 0);
  const durations = [28, 32, 30];

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.rosa }}>
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#2E2784]/08 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            Brand Partners
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            Global Brands That<br /><span className="text-black">Power Our Campaigns</span>
          </h2>
        </AnimatedSection>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-14 overflow-hidden">
        {/* Mobile: single row with all logos */}
        <div className="md:hidden logo-marquee">
          <div className="logo-marquee-track" style={{ animationDuration: "28s" }}>
            {[...logos, ...logos, ...logos].map((b, idx) => (
              <div key={`${b.name}-${idx}`} className="shrink-0 flex items-center justify-center px-7 min-h-[52px]">
                <img
                  src={b.logo as string}
                  alt={b.name}
                  className="max-h-10 w-auto object-contain opacity-80"
                  style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(21%) saturate(2500%) hue-rotate(222deg) brightness(88%) contrast(98%)" }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: 3 rows */}
        <div className="hidden md:block space-y-8">
          {allRows.map((row, rowIdx) => (
            <div key={`brands-row-${rowIdx}`} className="logo-marquee">
              <div
                className="logo-marquee-track"
                style={{
                  animationDuration: `${durations[rowIdx % durations.length]}s`,
                  animationDirection: rowIdx % 2 === 1 ? "reverse" : "normal",
                }}
              >
                {[...row, ...row, ...row].map((b, idx) => (
                  <div key={`${b.name}-${idx}`} className="shrink-0 flex items-center justify-center px-10 min-h-[52px]">
                    <img
                      src={b.logo as string}
                      alt={b.name}
                      className="max-h-12 w-auto object-contain opacity-80"
                      style={{ filter: "brightness(0) saturate(100%) invert(18%) sepia(21%) saturate(2500%) hue-rotate(222deg) brightness(88%) contrast(98%)" }}
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
          <div className="flex">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
            >
              <span>Discover Our Brand Portfolio</span>
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

function CaseStudies() {
  const entries = studies.slice(0, 3);
  const [idx, setIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    const next = Math.max(0, Math.min(entries.length - 1, i));
    setIdx(next);
    const el = scrollRef.current?.children[next] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

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

          <div ref={scrollRef} className="mt-14 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none">
            {entries.map((entry, i) => (
              <Link key={entry.id} href={`/work/${entry.id}`} className={`group flex flex-col rounded-[28px] overflow-hidden bg-[#241f69] border border-[#241f69] shrink-0 w-[80vw] snap-start md:w-auto md:shrink${i > 1 ? " hidden md:flex" : ""}`}>
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

          {/* Mobile arrows */}
          <div className="flex items-center justify-center gap-3 mt-6 md:hidden">
            <button onClick={() => scrollTo(idx - 1)} disabled={idx === 0} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${idx === 0 ? "bg-[#2E2784]/20 text-[#2E2784]/30" : "bg-[#2E2784] text-white hover:bg-black"}`}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[#2E2784]/50 tracking-tight" style={{ fontSize: "0.8rem" }}>{idx + 1} / {entries.length}</span>
            <button onClick={() => scrollTo(idx + 1)} disabled={idx >= entries.length - 1} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${idx >= entries.length - 1 ? "bg-[#2E2784]/20 text-[#2E2784]/30" : "bg-[#2E2784] text-white hover:bg-black"}`}>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 md:mt-12 flex">
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
  const [idx, setIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    const next = Math.max(0, Math.min(posts.length - 1, i));
    setIdx(next);
    const el = scrollRef.current?.children[next] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

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

          <div ref={scrollRef} className="mt-14 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none">
            {posts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className={`group flex flex-col rounded-[28px] overflow-hidden bg-white/10 border border-white/15 shrink-0 w-[80vw] snap-start md:w-auto md:shrink${i > 1 ? " hidden md:flex" : ""}`}>
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

          {/* Mobile arrows */}
          <div className="flex items-center justify-center gap-3 mt-6 md:hidden">
            <button onClick={() => scrollTo(idx - 1)} disabled={idx === 0} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${idx === 0 ? "bg-white/10 text-white/25" : "bg-[#F8AE01] text-black hover:bg-white"}`}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-white/40 tracking-tight" style={{ fontSize: "0.8rem" }}>{idx + 1} / {posts.length}</span>
            <button onClick={() => scrollTo(idx + 1)} disabled={idx >= posts.length - 1} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${idx >= posts.length - 1 ? "bg-white/10 text-white/25" : "bg-[#F8AE01] text-black hover:bg-white"}`}>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 md:mt-12 flex">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white"
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
                <span>Get in Touch</span>
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
      <LoyaltyFramework />
      <OurBrands />
      <TwoSectors />
      <InternationalPresence />
      <ClientLogos />
      <CaseStudies />
      <BlogPreview />
      <ClosingCta />
    </div>
  );
}