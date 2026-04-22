"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  images, stats, loyaltyFramework, sectors, retailers,
  brandPartners, studies, fallbackPosts, locations,
} from "@/src/app/data";
import { AnimatedSection, StaggeredList, StaggeredItem } from "@/components/ui/AnimatedSection";

const hairline = "border border-black/[0.08]";
const softShadow = { boxShadow: "0 8px 40px -12px rgba(46,39,132,0.12)" };

function Eyebrow({ children, onDark }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div
      className={`tracking-[0.3em] uppercase ${onDark ? "text-[#F8AE01]" : "text-[#2E2784]"}`}
      style={{ fontSize: "0.65rem", fontWeight: 600 }}
    >
      {children}
    </div>
  );
}

function CTA({ label, variant, href }: { label: string; variant: "yellow" | "dark"; href: string }) {
  const base = "inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2";
  const styles =
    variant === "yellow"
      ? "bg-[#F8AE01] text-black hover:bg-[#2E2784] hover:text-white"
      : "bg-[#2E2784] text-white hover:bg-[#F8AE01] hover:text-black";
  return (
    <Link href={href} data-cursor="cta" className={`${base} ${styles}`}>
      <span>{label}</span>
      <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

/* ─── HERO ─── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={images.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2E2784]/72" />
        {/* Decorative circle — brandbook visual element */}
        <div
          className="absolute -right-40 top-1/4 rounded-full opacity-20"
          style={{ width: 600, height: 600, background: "radial-gradient(circle, #F8AE01 0%, transparent 70%)" }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative px-8 md:px-12 flex flex-col justify-end min-h-[calc(100vh-10rem)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Eyebrow onDark>human centred loyalty marketing</Eyebrow>
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We Design<br />
          <span className="text-[#F8AE01]">Emotional Loyalty.</span>
        </motion.h1>

        <motion.p
          className="text-white/80 tracking-tight max-w-2xl mt-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We transform customer engagement in grocery and petrol retail into lasting loyalty —
          combining behavioural insight, emotional reward design, and measurable commercial outcomes.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <CTA label="Get in Touch" variant="yellow" href="/contact" />
          <CTA label="Discover How We Work" variant="dark" href="/services" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── BRAND ESSENCE ─── */
function BrandEssence() {
  return (
    <section className="max-w-6xl mx-auto px-8 pt-32 mb-0">
      <AnimatedSection>
        <div
          className="rounded-[40px] overflow-hidden"
          style={{ background: "#2E2784", ...softShadow }}
        >
          <div className="grid md:grid-cols-2 min-h-[420px]">
            {/* Text side */}
            <div className="p-7 md:p-16 flex flex-col justify-center gap-8 relative overflow-hidden">
              {/* decorative circle */}
              <div
                className="absolute -bottom-20 -left-20 rounded-full opacity-10"
                style={{ width: 300, height: 300, background: "#F8AE01" }}
              />
              <Eyebrow onDark>Brand Essence</Eyebrow>
              <h2
                className="text-white tracking-[-0.035em]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}
              >
                human centred<br />
                <span className="text-[#F8AE01]">loyalty marketing.</span>
              </h2>
              <p className="text-white/75 tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                KLR transforms everyday shopping into engaging loyalty experiences —
                combining <strong className="text-white">behavioural insight</strong>,{" "}
                <strong className="text-white">emotional reward design</strong>, and{" "}
                <strong className="text-white">measurable commercial outcomes</strong>.
                Where others operate loyalty programs, KLR designs emotional loyalty experiences.
              </p>
              <CTA label="Discover Our Approach" variant="yellow" href="/about" />
            </div>
            {/* Image side */}
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src={images.human} alt="Human Centered Loyalty" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ─── STATS ─── */
function Stats() {
  const numbers = [
    { k: stats.years, v: "Years of Loyalty Activity", dark: true },
    { k: stats.campaigns, v: "Campaigns Delivered" },
    { k: stats.retailers, v: "Retail Chains as Clients" },
    { k: stats.countries, v: "Countries Operating" },
  ];
  const extra = [
    { k: stats.combinedExperience, v: "Years of Combined Loyalty Experience" },
    { k: stats.people, v: "People in Our Team" },
    { k: stats.nationalities, v: "Nationalities in House" },
  ];

  return (
    <section className="px-8 md:px-12 mt-10 md:mt-16 mb-12 md:mb-32">
      <AnimatedSection>
        <div className={`rounded-[40px] bg-white ${hairline} p-6 md:p-14`} style={softShadow}>
          <Eyebrow>KLR in Numbers</Eyebrow>
          <h2
            className="text-[#2E2784] tracking-[-0.035em] mt-8 max-w-2xl"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}
          >
            When Figures Matter…
          </h2>
          <StaggeredList className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {numbers.map((s) => (
              <StaggeredItem key={s.v}>
                <div
                  className={`rounded-[32px] p-5 md:p-8 flex flex-col justify-between min-h-[130px] md:min-h-[180px] ${hairline}`}
                  style={s.dark ? { background: "#2E2784" } : { background: "#fff" }}
                >
                  <div
                    className={s.dark ? "text-[#F8AE01]" : "text-[#2E2784]"}
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em" }}
                  >
                    {s.k}
                  </div>
                  <div className={s.dark ? "text-white" : "text-black"} style={{ fontSize: "0.85rem" }}>
                    {s.v}
                  </div>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredList>

          <StaggeredList className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {extra.map((s) => (
              <StaggeredItem key={s.v}>
                <div className={`rounded-[32px] p-5 md:p-8 bg-white ${hairline}`}>
                  <div
                    className="text-[#2E2784]"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em" }}
                  >
                    {s.k}
                  </div>
                  <div className="text-black mt-3" style={{ fontSize: "0.85rem" }}>{s.v}</div>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredList>

          <div className="mt-12">
            <CTA label="Discover More About Us" variant="dark" href="/about" />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ─── THE CHALLENGE ─── */
function TheChallenge() {
  const opportunities = [
    "Increase Store Visits",
    "Grow Average Ticket",
    "Turn Occasional Shoppers into Loyal Customers",
    "Build Emotional Brand Connection",
    "Make Your Banner Stand Out — Buzz, Reputation, Virality, Market Share",
  ];

  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Challenge card */}
          <div
            className="rounded-[40px] p-6 md:p-14 flex flex-col gap-8 relative overflow-hidden"
            style={{ background: "#2E2784", ...softShadow }}
          >
            <div
              className="absolute -top-16 -right-16 rounded-full opacity-10"
              style={{ width: 280, height: 280, background: "#F8AE01" }}
            />
            <Eyebrow onDark>The Challenge</Eyebrow>
            <h2
              className="text-white tracking-[-0.035em]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              Retail Loyalty Is <span className="text-[#F8AE01]">Harder</span> than Ever
            </h2>
            <div className="space-y-4">
              {["Step out from the everyday's price battle", "Build a new, stronger brand's loyalty"].map((t) => (
                <div key={t} className={`rounded-2xl px-6 py-4 ${hairline} border-white/10`} style={{ background: "rgba(255,255,255,0.07)" }}>
                  <p className="text-white tracking-tight" style={{ fontSize: "0.9rem", fontWeight: 500 }}>{t}</p>
                </div>
              ))}
            </div>
            <p className="text-white/60 tracking-tight" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              Running an impactful loyalty program is <em className="text-[#F8AE01] not-italic font-semibold">extremely challenging</em> nowadays…
            </p>
          </div>

          {/* Opportunity card */}
          <div
            className="rounded-[40px] p-6 md:p-14 flex flex-col gap-8 relative overflow-hidden"
            style={{ background: "#F8AE01", ...softShadow }}
          >
            <div
              className="absolute -bottom-16 -left-16 rounded-full opacity-15"
              style={{ width: 280, height: 280, background: "#2E2784" }}
            />
            <div className="tracking-[0.3em] uppercase text-[#2E2784]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              The Opportunity
            </div>
            <h2
              className="text-[#2E2784] tracking-[-0.035em]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1 }}
            >
              When Loyalty Works,<br /><span style={{ fontStyle: "italic" }}>Retailers Win</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {opportunities.map((o) => (
                <span key={o} className="rounded-2xl px-4 py-2.5 bg-white/60 text-[#2E2784] tracking-tight" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  {o}
                </span>
              ))}
            </div>
            <p className="text-[#2E2784] tracking-tight font-semibold" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
              So, it must be <em className="not-italic font-bold">emotionally engaging</em> for customers
              and <em className="not-italic font-bold">simple to run</em> for retailers.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ─── MAP ─── */
function MapSection() {
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>KLR Presence</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          We Are Truly<br /><span className="text-[#F8AE01]">International.</span>
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <div className={`mt-14 relative rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
          <img src={images.map} alt="KLR European map" className="w-full h-auto" />
        </div>
      </AnimatedSection>
      <StaggeredList className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
        {locations.map((l) => (
          <StaggeredItem key={l.city}>
            <div className={`rounded-[24px] p-6 bg-white ${hairline}`}>
              <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{l.country}</div>
              <div className="text-[#2E2784] tracking-[-0.02em] mt-3" style={{ fontSize: "1.1rem", fontWeight: 600 }}>{l.city}</div>
            </div>
          </StaggeredItem>
        ))}
      </StaggeredList>
    </section>
  );
}

/* ─── LOYALTY FRAMEWORK ─── */
function LoyaltyFramework() {
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>The KLR Loyalty Framework</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Designing<br /><span className="text-[#F8AE01]">Emotional Loyalty.</span>
        </h2>
        <p className="text-black tracking-tight max-w-xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
          Our 3 Pillars of Loyalty — the framework we apply to every campaign.
        </p>
      </AnimatedSection>
      <StaggeredList className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
        {loyaltyFramework.map((p, i) => (
          <StaggeredItem key={p.title}>
            <div
              data-cursor="explore"
              className={`rounded-[32px] p-10 ${hairline} h-full`}
              style={i === 1 ? { background: "#2E2784", ...softShadow } : { ...softShadow, background: "#fff" }}
            >
              <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>
                {p.n} — {p.title}
              </div>
              <h3
                className={`${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em] mt-6`}
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.05 }}
              >
                {p.title}.
              </h3>
              <p
                className={`${i === 1 ? "text-white" : "text-black"} tracking-tight mt-6`}
                style={{ fontSize: "1rem", lineHeight: 1.55 }}
              >
                {p.desc}
              </p>
            </div>
          </StaggeredItem>
        ))}
      </StaggeredList>
      <AnimatedSection className="mt-12">
        <CTA label="Explore Our Services" variant="yellow" href="/services" />
      </AnimatedSection>
    </section>
  );
}

/* ─── KLR WAY ─── */
function KLRWay() {
  const values = [
    {
      title: "Smart Thinkers, Fast Movers",
      desc: "We think strategically but act quickly. Ideas are important, but turning them into reality is what truly creates value for our clients.",
      accent: false,
    },
    {
      title: "International Mindset, Local Heart",
      desc: "Our experience and partnerships are international, but our approach remains personal and close to the markets we serve.",
      accent: true,
    },
    {
      title: "People at the Core, Service at its Best",
      desc: "People are at the center of our business. Loyalty cannot be imposed — it must be built around real needs and genuine value.",
      accent: false,
    },
  ];

  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>The KLR Way</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          We are Central<br /><span className="text-[#F8AE01]">to Loyalty.</span>
        </h2>
      </AnimatedSection>
      <StaggeredList className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
        {values.map((v) => (
          <StaggeredItem key={v.title}>
            <div
              className={`rounded-[32px] p-10 h-full ${hairline}`}
              style={v.accent ? { background: "#F8AE01", ...softShadow } : { background: "#fff", ...softShadow }}
            >
              <h3
                className={`tracking-[-0.03em] ${v.accent ? "text-[#2E2784]" : "text-[#2E2784]"}`}
                style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)", fontWeight: 700, lineHeight: 1.15 }}
              >
                {v.title}
              </h3>
              <p
                className={`tracking-tight mt-6 ${v.accent ? "text-[#2E2784]" : "text-black"}`}
                style={{ fontSize: "1rem", lineHeight: 1.55 }}
              >
                {v.desc}
              </p>
            </div>
          </StaggeredItem>
        ))}
      </StaggeredList>
    </section>
  );
}

/* ─── SECTORS ─── */
function Sectors() {
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>Our Loyalty Ecosystem</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Born for Grocery & Petrol.<br /><span className="text-[#F8AE01]">Ready for more.</span>
        </h2>
        <p className="text-black tracking-tight max-w-xl mt-8" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
          We were born for Grocery &amp; Petrol — and we are ready to take on the next challenge.
        </p>
      </AnimatedSection>
      <StaggeredList className="grid md:grid-cols-2 gap-6 mt-8 md:mt-14">
        {sectors.map((s, i) => (
          <StaggeredItem key={s.title}>
            <div
              data-cursor="explore"
              className={`rounded-[32px] overflow-hidden relative ${hairline}`}
              style={softShadow}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={i === 0 ? images.family : images.petrolCouple}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] hover:scale-[1.04]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/85 via-[#2E2784]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>
                  {i === 0 ? "01 Grocery" : "02 Petrol"}
                </div>
                <h3
                  className="text-white tracking-[-0.03em] mt-4"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.05 }}
                >
                  {s.title}
                </h3>
                <p className="text-white/80 tracking-tight mt-5 max-w-md" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </StaggeredItem>
        ))}
      </StaggeredList>

      {/* Expanding sectors */}
      <AnimatedSection delay={0.1} className="mt-8">
        <div className={`rounded-[32px] p-8 md:p-10 bg-white ${hairline}`} style={softShadow}>
          <p className="text-[#2E2784] tracking-tight mb-6" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
            But we are ready to take on the next challenge:
          </p>
          <div className="flex flex-wrap gap-3">
            {["Drugstores", "Pet Stores", "Convenience Stores & On-the-Go", "All-in-Stores (Bazaars)"].map((s) => (
              <span key={s} className="rounded-2xl px-5 py-2.5 text-[#2E2784] tracking-tight" style={{ fontSize: "0.85rem", fontWeight: 500, background: "#F8AE01" }}>
                {s}
              </span>
            ))}
          </div>
          <p className="text-black mt-6 tracking-tight" style={{ fontSize: "0.95rem" }}>
            Overall, we are <strong className="text-[#2E2784]">loyalty makers</strong> for any retailer.
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ─── RETAILERS ─── */
function Retailers() {
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>Our Clients</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          The Leading Retailers<br /><span className="text-[#F8AE01]">Who Already Trusted Us.</span>
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mt-16">
        <div className="tracking-[0.25em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Grocery</div>
        <div className="flex flex-wrap gap-3">
          {retailers.grocery.map((r) => (
            <span key={r} className={`rounded-full px-5 py-2.5 bg-[#F8AE01] text-black tracking-tight`} style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              {r}
            </span>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.15} className="mt-12">
        <div className="tracking-[0.25em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Petrol</div>
        <div className="flex flex-wrap gap-3">
          {retailers.petrol.map((r) => (
            <span key={r} className="rounded-full px-5 py-2.5 text-white tracking-tight" style={{ fontSize: "0.85rem", fontWeight: 500, background: "#2E2784" }}>
              {r}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

/* ─── BRAND PARTNERS ─── */
function BrandPartners() {
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>Our Portfolio</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Global Brands that<br /><span className="text-[#F8AE01]">Power Our Campaigns.</span>
        </h2>
        <p className="text-black tracking-tight max-w-xl mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
          We partner up with leading global brands to create loyalty programs able to drive high participation.
        </p>
      </AnimatedSection>
      <StaggeredList className="mt-14 grid grid-cols-3 md:grid-cols-6 gap-3">
        {brandPartners.map((b) => (
          <StaggeredItem key={b.name}>
            <div className={`rounded-[20px] bg-white ${hairline} flex items-center justify-center text-center min-h-[90px] overflow-hidden p-4`}>
              {b.logo ? (
                <img
                  src={b.logo}
                  alt={b.name}
                  className="max-h-12 max-w-full w-auto object-contain"
                />
              ) : (
                <span className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{b.name}</span>
              )}
            </div>
          </StaggeredItem>
        ))}
      </StaggeredList>
      <AnimatedSection className="mt-12">
        <CTA label="Discover Our Brand Portfolio" variant="dark" href="/brands" />
      </AnimatedSection>
    </section>
  );
}

/* ─── FEATURED STUDY ─── */
function FeaturedStudy() {
  const s = studies[0];
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>Featured Case Study</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Loyalty campaigns that<br /><span className="text-[#F8AE01]">drive results.</span>
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Link
          href={`/work/${s.id}`}
          data-cursor="explore"
          className={`mt-14 block w-full rounded-[40px] overflow-hidden bg-white ${hairline} group`}
          style={softShadow}
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]"
              />
            </div>
            <div className="p-6 md:p-14 flex flex-col justify-between gap-8">
              <div>
                <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>
                  {s.client} · {s.location}
                </div>
                <h3
                  className="text-[#2E2784] tracking-[-0.03em] mt-5"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}
                >
                  {s.title}
                </h3>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                  {s.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {s.results.map((r) => (
                  <div key={r.k} className={`rounded-2xl p-5 ${hairline}`}>
                    <div className="text-[#2E2784]" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}>{r.k}</div>
                    <div className="text-black mt-1" style={{ fontSize: "0.8rem" }}>{r.v}</div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5" style={{ fontSize: "0.9rem" }}>
                  Read the full story
                </span>
                <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.05} className="mt-10">
        <CTA label="See All Case Studies" variant="dark" href="/work" />
      </AnimatedSection>
    </section>
  );
}

/* ─── FEATURED POST ─── */
function FeaturedPost() {
  const p = fallbackPosts[0];
  return (
    <section className="px-8 md:px-12 mb-16 md:mb-40">
      <AnimatedSection>
        <Eyebrow>Latest Insights</Eyebrow>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Link
          href={`/blog/${p.slug}`}
          data-cursor="explore"
          className={`mt-10 block w-full rounded-[40px] overflow-hidden bg-white ${hairline} group`}
          style={softShadow}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-14 flex flex-col justify-between gap-8 order-2 md:order-1">
              <div>
                <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>
                  {p.category} · {p.date}
                </div>
                <h3
                  className="text-[#2E2784] tracking-[-0.03em] mt-5"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}
                >
                  {p.title}
                </h3>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                  {p.excerpt}
                </p>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5" style={{ fontSize: "0.9rem" }}>
                  Read the full story
                </span>
                <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden order-1 md:order-2">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]"
              />
            </div>
          </div>
        </Link>
      </AnimatedSection>
      <AnimatedSection delay={0.05} className="mt-10">
        <CTA label="See All Insights" variant="dark" href="/blog" />
      </AnimatedSection>
    </section>
  );
}

/* ─── CLOSING CTA ─── */
function ClosingCTA() {
  return (
    <section className="px-8 md:px-12 pb-32">
      <AnimatedSection>
        <div
          className={`rounded-[40px] p-7 md:p-16 relative overflow-hidden ${hairline}`}
          style={{ ...softShadow, background: "#2E2784" }}
        >
          <div
            className="absolute -top-24 -right-24 rounded-full opacity-15"
            style={{ width: 400, height: 400, background: "#F8AE01" }}
          />
          <Eyebrow onDark>Keep in Touch!</Eyebrow>
          <h2
            className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-3xl"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05 }}
          >
            Ready to design your next<br /><span className="text-white">loyalty experience?</span>
          </h2>
          <p className="text-white/75 tracking-tight mt-8 max-w-2xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Let's talk about how we can help your customers come back more often, spend more, and feel great about it.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <CTA label="Get in Touch" variant="yellow" href="/contact" />
          </div>
          <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-2 text-white/50 tracking-tight" style={{ fontSize: "0.85rem" }}>
            <span>info@klr-europe.com</span>
            <span>+386 5 902 87 58</span>
            <span>Koper, Slovenia · Rovato, Italy</span>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

export function HomePage() {
  return (
    <div>
      <Hero />
      <Stats />
      <MapSection />
      <LoyaltyFramework />
      <Sectors />
      <Retailers />
      <BrandPartners />
      <FeaturedStudy />
      <FeaturedPost />
      <ClosingCTA />
    </div>
  );
}
