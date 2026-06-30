"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, Heart, Star, Award, Eye, Smile, Trophy, Globe, ShoppingCart, Clock, Users, Flag } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { images, stats as defaultStats, brandPartners as defaultBrands, studies as defaultStudies, fallbackPosts, loyaltyFramework, sectors, retailerLogos } from "@/src/app/data";

const gradients = {
  blue:   "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa:   "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

type HeroData = {
  _visible?: boolean;
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
};

type StatsData = {
  _visible?: boolean;
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  labels?: {
    campaigns?: string;
    countries?: string;
    retailers?: string;
    combinedExperience?: string;
    nationalities?: string;
    people?: string;
  };
};

type SectionData = {
  _visible?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  mapImage?: string;
  image1?: string;
  image2?: string;
};

function Hero({ data = {} }: { data?: HeroData }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const bg       = data.image     || images.petrolCouple;
  const eyebrow  = data.eyebrow   || "Key to Loyalty in Retail";
  const line1    = data.titleLine1 || "We Design";
  const line2    = data.titleLine2 || "Emotional Loyalty.";
  const subtitle = data.subtitle  || "Loyalty campaigns that excite and engage customers of all targets. Deliver real impact to your stores with measurable KPIs. Easy to run for retailers and their marketing teams.";
  const ctaLabel = data.ctaLabel  || "Discover How We Work";
  const ctaHref  = data.ctaHref   || "/work";

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={bg} alt="KLR Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
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
          {eyebrow}
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {line1}
          <br />
          <span className="text-[#F8AE01]">{line2}</span>
        </motion.h1>

        <motion.p
          className="text-white/85 tracking-tight max-w-2xl mt-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
          >
            <span>{ctaLabel}</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

const cardStyles: Record<string, React.CSSProperties> = {
  yellow: { background: "#FFE8B0", borderColor: "transparent" },
  lilac:  { background: "#E8DEFF", borderColor: "transparent" },
};
const numColor: Record<string, string> = {
  yellow: "var(--color-primary, #2E2784)",
  lilac:  "var(--color-primary, #2E2784)",
};
const labelColor: Record<string, string> = {
  yellow: "rgba(46,39,132,0.65)",
  lilac:  "rgba(46,39,132,0.65)",
};

function StatsBar({ stats, data = {} }: { stats: typeof defaultStats; data?: StatsData }) {
  const L = data.labels || {};
  const statCards = [
    { value: stats.campaigns,          label: L.campaigns          || "Campaigns Delivered Up to Now",        Icon: Trophy       },
    { value: stats.countries,          label: L.countries          || "Countries Operating",                  Icon: Globe        },
    { value: stats.retailers,          label: L.retailers          || "Retail Chains as Clients",             Icon: ShoppingCart },
    { value: stats.combinedExperience, label: L.combinedExperience || "Years of Combined Loyalty Experience", Icon: Clock        },
    { value: stats.nationalities,      label: L.nationalities      || "Nationalities In House",               Icon: Flag         },
    { value: stats.people,             label: L.people             || "People In Our Team",                   Icon: Users        },
  ].map((card, i) => ({ ...card, variant: i % 2 === 0 ? "yellow" : "lilac" }));

  const eyebrow  = data.eyebrow  || "KLR In Numbers";
  const title    = data.title    || "When Figures Matter…";
  const ctaLabel = data.ctaLabel || "Discover More About Us";
  const ctaHref  = data.ctaHref  || "/about";

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#C8B8F0]/20 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
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
              href={ctaHref}
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white"
            >
              <span>{ctaLabel}</span>
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

function InternationalPresence({ data = {} }: { data?: SectionData }) {
  const eyebrow  = data.eyebrow  || "Presence";
  const title    = data.title    || "We are truly international";
  const subtitle = data.subtitle || "Based in Italy and Slovenia, we operate in 20+ European countries and keep growing. Our international network of local experts ensures campaigns are culturally relevant and operationally flawless.";
  const mapImage = data.mapImage || "/1-Mappa-KLR.png";

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </h2>

          <p className="text-white/60 tracking-tight mt-6 max-w-2xl" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
            {subtitle}
          </p>

          <div className="mt-10 flex justify-center">
            <img src={mapImage} alt="KLR European presence" className="w-full max-w-3xl h-auto" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

{/* LOYALTY FRAMEWORK: SOLO GIALLO E BLU, NIENTE BIANCO/NERO */}
function LoyaltyFramework({ data = {} }: { data?: SectionData }) {
  const eyebrow  = data.eyebrow  || "The KLR Loyalty Framework";
  const title    = data.title    || "Designing Emotional Loyalty";
  const subtitle = data.subtitle || "Our 3 Pillars of Loyalty:";

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F8AE01]/50 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left Column: Text & Pillars */}
            <div className="lg:w-1/2 w-full">
              <div className="tracking-[0.3em] uppercase text-[#2E2784]/60"  style={{fontSize: "0.65rem", fontWeight: 600, marginBottom: "0.75rem"}}>
                {eyebrow}
              </div>

              <h2 className="text-[#2E2784] tracking-[-0.035em] mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
                {title}
              </h2>

              <p className="text-[#2E2784]/80 tracking-tight mb-8" style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                {subtitle}
              </p>

              <div className="space-y-4">
                {/* 1. Desire — antracite */}
                <div className="rounded-[24px] p-6" style={{ background: "#2C2C34" }}>
                  <Eye className="w-7 h-7 mb-3" style={{ color: "var(--color-accent, #F8AE01)" }} />
                  <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "var(--color-accent, #F8AE01)", color: "#2C2C34" }}>
                    Desire
                  </div>
                  <p className="text-white/80 leading-snug" style={{ fontSize: "0.95rem" }}>
                    "Dream" High-Quality <span className="font-black text-white">Rewards</span> that Money Can't Buy
                  </p>
                </div>

                {/* 2. Experience — lilla */}
                <div className="rounded-[24px] p-6" style={{ background: "#C8B8F0" }}>
                  <Star className="w-7 h-7 mb-3" style={{ color: "var(--color-primary, #2E2784)" }} fill="currentColor" />
                  <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "var(--color-primary, #2E2784)", color: "#C8B8F0" }}>
                    Experience
                  </div>
                  <p className="text-[#2E2784] leading-snug" style={{ fontSize: "0.95rem" }}>
                    High Participation is The Key to <span className="font-black italic">Real Engagement</span>
                  </p>
                </div>

                {/* 3. Satisfaction — blu KLR */}
                <div className="rounded-[24px] p-6" style={{ background: "var(--color-primary, #2E2784)" }}>
                  <Smile className="w-7 h-7 mb-3" style={{ color: "var(--color-accent, #F8AE01)" }} />
                  <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "var(--color-accent, #F8AE01)", color: "#2E2784" }}>
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
                  <Eye className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#2C2C34" }} />
                </div>

                {/* Bottom Left Circle - Experience — lilla */}
                <div className="absolute bottom-4 left-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex items-end justify-start pb-10 pl-10 sm:pb-14 sm:pl-14 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#C8B8F0", background: "rgba(200,184,240,0.18)" }}>
                  <Star className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#9B7FD4" }} fill="currentColor" />
                </div>

                {/* Bottom Right Circle - Satisfaction — blu KLR */}
                <div className="absolute bottom-4 right-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex items-end justify-end pb-10 pr-10 sm:pb-14 sm:pr-14 transition-transform hover:scale-105 duration-500" style={{ borderColor: "var(--color-primary, #2E2784)", background: "rgba(46,39,132,0.10)" }}>
                  <Smile className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "var(--color-primary, #2E2784)" }} />
                </div>

                {/* Center Core - Emotional Loyalty (Heart) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 z-20 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#2E2784] shadow-[0_0_40px_rgba(46,39,132,0.4)] animate-pulse">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#F8AE01] fill-[#F8AE01]" />
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

function TwoSectors({ data = {} }: { data?: SectionData }) {
  const eyebrow    = data.eyebrow || "Expertise";
  const title      = data.title   || "Two Sectors. Deep Expertise.";
  const sectorImgs = [data.image1 || images.family, data.image2 || images.hero];

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
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

function ClientLogos({ data = {} }: { data?: SectionData }) {
  const eyebrow = data.eyebrow || "Our Clients";
  const title   = data.title   || "The Leading Retailers Who Already Trusted Us";

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.rosa }}>
      <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-[#2E2784]/08 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-[#2E2784] tracking-[0.2em] uppercase font-bold border-b border-[#2E2784]/20 pb-3 mb-6" style={{ fontSize: "0.75rem" }}>
                Grocery
              </div>
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-3">
                {retailerLogos.grocery.map((r) => (
                  <div key={r.name} className="flex items-center justify-center h-16 w-full sm:w-28 rounded-xl bg-white/70 p-3" style={{ boxShadow: "0 4px 16px rgba(46,39,132,0.08)" }}>
                    <img src={r.logo} alt={r.name} className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[#2E2784] tracking-[0.2em] uppercase font-bold border-b border-[#2E2784]/20 pb-3 mb-6" style={{ fontSize: "0.75rem" }}>
                Petrol
              </div>
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-3">
                {retailerLogos.petrol.map((r) => (
                  <div key={r.name} className="flex items-center justify-center h-16 w-full sm:w-28 rounded-xl bg-white/70 p-3" style={{ boxShadow: "0 4px 16px rgba(46,39,132,0.08)" }}>
                    <img src={r.logo} alt={r.name} className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function PartnerLogosBand({ brands }: { brands: typeof defaultBrands }) {
  const partnerLogos = brands.filter((b) => b.logo);
  return (
    <section className="relative py-14 overflow-hidden" style={{ background: "#06051C" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(46,39,132,0.25) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto px-8 mb-10 text-center">
        <h2 className="text-[#F8AE01] tracking-[-0.035em]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
          Global Brands That Power Our Campaigns
        </h2>
        <div className="tracking-[0.3em] uppercase text-[#F8AE01]/60 mt-4" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
          Our Brand Partners
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-8 sm:gap-10 md:gap-12 items-center"
          style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
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

      <div className="max-w-6xl mx-auto px-8 mt-12 flex justify-center">
        <Link
          href="/brands#why-partner"
          className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white"
        >
          <span>Become our next Partner</span>
          <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function CaseStudies({ studies, data = {} }: { studies: typeof defaultStudies; data?: SectionData }) {
  const eyebrow  = data.eyebrow  || "Case Studies";
  const title    = data.title    || "Loyalty Campaigns That Drive Results";
  const ctaLabel = data.ctaLabel || "See All Case Studies";
  const ctaHref  = data.ctaHref  || "/work";

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
            {eyebrow}
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
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
              href={ctaHref}
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
            >
              <span>{ctaLabel}</span>
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

function BlogPreview({ data = {} }: { data?: SectionData }) {
  const eyebrow  = data.eyebrow  || "Insights";
  const title    = data.title    || "Latest Insights";
  const ctaLabel = data.ctaLabel || "See All Insights";
  const ctaHref  = data.ctaHref  || "/blog";

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
            {eyebrow}
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
            {title}
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
              href={ctaHref}
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white"
            >
              <span>{ctaLabel}</span>
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

function ClosingCta({ data = {} }: { data?: SectionData }) {
  const title    = data.title    || "Ready to Design Your Next Loyalty Experience?";
  const subtitle = data.subtitle || "Let's talk about how we can help your customers come back more often, spend more, and feel great about it.";
  const ctaLabel = data.ctaLabel || "Let's Talk";
  const ctaHref  = data.ctaHref  || "/contact";

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[#2E2784]" style={{ fontSize: "clamp(1.6rem, 2.8vw, 3rem)", lineHeight: 1.1, fontWeight: 800 }}>
                {title}
              </h2>
              <p className="mt-8 text-black" style={{ fontSize: "clamp(1.08rem, 1.5vw, 1.5rem)", lineHeight: 1.4 }}>
                {subtitle}
              </p>
            </div>
            <div className="md:text-right">
              <Link href={ctaHref} className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black">
                <span>{ctaLabel}</span>
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

// Default render order for Home sections — mirrors the order the page has
// always rendered in. content/pages.json -> home._sectionOrder can override
// it (the admin SectionsEditor writes this array when reordering).
const HOME_SECTION_ORDER = [
  "hero", "stats", "framework", "brandPartners", "sectors",
  "international", "clients", "caseStudies", "blog", "closing",
] as const;

export function HomePage() {
  const [stats, setStats] = useState(defaultStats);
  const [studies, setStudies] = useState(defaultStudies);
  const [pages, setPages] = useState<Record<string, Record<string, unknown>>>({});

  const fetchData = async () => {
    try {
      const [statsRes, studiesRes, pagesRes] = await Promise.all([
        fetch("/api/content?type=stats",   { cache: "no-store" }),
        fetch("/api/content?type=studies", { cache: "no-store" }),
        fetch("/api/content?type=pages",   { cache: "no-store" }),
      ]);

      if (statsRes.ok)   { const d = await statsRes.json();   setStats(d.data || defaultStats); }
      if (studiesRes.ok) { const d = await studiesRes.json(); setStudies(d.data || defaultStudies); }
      if (pagesRes.ok)   { const d = await pagesRes.json();   setPages(d.data || {}); }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchData();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const home = (pages.home as Record<string, unknown>) || {};
  const heroData         = (home.hero          as HeroData)    || {};
  const statsData        = (home.stats         as StatsData)   || {};
  const frameworkData    = (home.framework      as SectionData) || {};
  const sectorsData      = (home.sectors        as SectionData) || {};
  const internationalData= (home.international  as SectionData) || {};
  const clientsData      = (home.clients        as SectionData) || {};
  const brandPartnersData= (home.brandPartners  as SectionData) || {};
  const caseStudiesData  = (home.caseStudies    as SectionData) || {};
  const blogData         = (home.blog           as SectionData) || {};
  const closingData      = (home.closing        as SectionData) || {};

  const sectionElements: Record<string, React.ReactNode> = {
    hero:           heroData._visible          !== false && <Hero data={heroData} />,
    stats:          statsData._visible         !== false && <StatsBar stats={stats} data={statsData} />,
    framework:      frameworkData._visible     !== false && <LoyaltyFramework data={frameworkData} />,
    brandPartners:  brandPartnersData._visible !== false && <PartnerLogosBand brands={defaultBrands} />,
    sectors:        sectorsData._visible       !== false && <TwoSectors data={sectorsData} />,
    international:  internationalData._visible !== false && <InternationalPresence data={internationalData} />,
    clients:        clientsData._visible       !== false && <ClientLogos data={clientsData} />,
    caseStudies:    caseStudiesData._visible   !== false && <CaseStudies studies={studies} data={caseStudiesData} />,
    blog:           blogData._visible          !== false && <BlogPreview data={blogData} />,
    closing:        closingData._visible       !== false && <ClosingCta data={closingData} />,
  };

  const order = Array.isArray(home._sectionOrder) && (home._sectionOrder as string[]).length
    ? (home._sectionOrder as string[])
    : HOME_SECTION_ORDER;

  return (
    <div>
      {order.map(key => <React.Fragment key={key}>{sectionElements[key]}</React.Fragment>)}
    </div>
  );
}