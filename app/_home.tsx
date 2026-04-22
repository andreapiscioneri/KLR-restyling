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
    <section ref={ref} className="relative min-h-screen pt-40 pb-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={images.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2E2784]/70" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-6xl mx-auto px-8 flex flex-col justify-end min-h-[calc(100vh-10rem)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Eyebrow onDark>Key to Loyalty in Retail</Eyebrow>
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We are Key to<br />
          <span className="text-[#F8AE01]">Loyalty in Retail.</span>
        </motion.h1>

        <motion.p
          className="text-white tracking-tight max-w-2xl mt-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Built on trust and teamwork. Grounded in experience. Engaged in our clients' success
          and the happiness of their customers.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <CTA label="Get in Touch" variant="yellow" href="/contact" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── HUMAN CENTERED ─── */
function HumanCentered() {
  return (
    <section className="max-w-6xl mx-auto px-8 pt-32 mb-0">
      <AnimatedSection>
        <div className={`rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src={images.human} alt="Human Centered Loyalty" className="w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center gap-6 bg-white">
              <Eyebrow>Human Centered Loyalty Marketing</Eyebrow>
              <h2
                className="text-[#2E2784] tracking-[-0.035em]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}
              >
                Loyalty beyond<br /><span className="text-[#F8AE01]">rewards.</span>
              </h2>
              <p className="text-black tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                We believe loyalty is about understanding your audience's needs and delivering meaningful relationships — not just points and prizes. Our human-centred approach puts real people at the heart of every campaign.
              </p>
              <CTA label="Discover Our Services" variant="yellow" href="/services" />
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
    <section className="max-w-6xl mx-auto px-8 mt-16 mb-32">
      <AnimatedSection>
        <div className={`rounded-[40px] bg-white ${hairline} p-10 md:p-14`} style={softShadow}>
          <Eyebrow>360° Loyalty International Experience</Eyebrow>
          <h2
            className="text-[#2E2784] tracking-[-0.035em] mt-8 max-w-2xl"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}
          >
            KLR in numbers.
          </h2>
          <StaggeredList className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {numbers.map((s) => (
              <StaggeredItem key={s.v}>
                <div
                  className={`rounded-[32px] p-8 flex flex-col justify-between min-h-[180px] ${hairline}`}
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
                <div className={`rounded-[32px] p-8 bg-white ${hairline}`}>
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

/* ─── MAP ─── */
function MapSection() {
  return (
    <section className="max-w-6xl mx-auto px-8 mb-40">
      <AnimatedSection>
        <Eyebrow>International Presence</Eyebrow>
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
    <section className="max-w-6xl mx-auto px-8 mb-40">
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
      <StaggeredList className="grid md:grid-cols-3 gap-6 mt-14">
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

/* ─── SECTORS ─── */
function Sectors() {
  return (
    <section className="max-w-6xl mx-auto px-8 mb-40">
      <AnimatedSection>
        <Eyebrow>Two Sectors. Deep Expertise.</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Born for Grocery & Petrol.<br /><span className="text-[#F8AE01]">Ready for more.</span>
        </h2>
      </AnimatedSection>
      <StaggeredList className="grid md:grid-cols-2 gap-6 mt-14">
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
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>
                  {i === 0 ? "01 Grocery" : "02 Petrol"}
                </div>
                <h3
                  className="text-white tracking-[-0.03em] mt-4"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.05 }}
                >
                  {s.title}
                </h3>
                <p className="text-white tracking-tight mt-5 max-w-md" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </StaggeredItem>
        ))}
      </StaggeredList>
    </section>
  );
}

/* ─── RETAILERS ─── */
function Retailers() {
  return (
    <section className="max-w-6xl mx-auto px-8 mb-40">
      <AnimatedSection>
        <Eyebrow>The Leading Retailers Who Already Trusted Us</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Trusted across<br /><span className="text-[#F8AE01]">Europe.</span>
        </h2>
      </AnimatedSection>
      <AnimatedSection delay={0.1} className="mt-16">
        <div className="tracking-[0.25em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Grocery</div>
        <div className="flex flex-wrap gap-3">
          {retailers.grocery.map((r) => (
            <span key={r} className={`rounded-full px-5 py-2.5 bg-white text-black tracking-tight ${hairline}`} style={{ fontSize: "0.85rem" }}>
              {r}
            </span>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection delay={0.15} className="mt-12">
        <div className="tracking-[0.25em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Petrol</div>
        <div className="flex flex-wrap gap-3">
          {retailers.petrol.map((r) => (
            <span key={r} className="rounded-full px-5 py-2.5 text-white tracking-tight" style={{ fontSize: "0.85rem", background: "#2E2784" }}>
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
    <section className="max-w-6xl mx-auto px-8 mb-40">
      <AnimatedSection>
        <Eyebrow>Our Brands</Eyebrow>
        <h2
          className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}
        >
          Global brands that<br /><span className="text-[#F8AE01]">power our campaigns.</span>
        </h2>
      </AnimatedSection>
      <StaggeredList className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-3">
        {brandPartners.map((b) => (
          <StaggeredItem key={b}>
            <div className={`rounded-[20px] p-6 bg-white ${hairline} flex items-center justify-center text-center min-h-[100px]`}>
              <span className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{b}</span>
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
    <section className="max-w-6xl mx-auto px-8 mb-40">
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
            <div className="p-10 md:p-14 flex flex-col justify-between gap-8">
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
    <section className="max-w-6xl mx-auto px-8 mb-40">
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
            <div className="p-10 md:p-14 flex flex-col justify-between gap-8 order-2 md:order-1">
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
    <section className="max-w-5xl mx-auto px-8 pb-32">
      <AnimatedSection>
        <div
          className={`rounded-[40px] p-10 md:p-16 ${hairline}`}
          style={{ ...softShadow, background: "#2E2784" }}
        >
          <Eyebrow onDark>Ready to start?</Eyebrow>
          <h2
            className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-3xl"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05 }}
          >
            Ready to design your next<br /><span className="text-white">loyalty experience?</span>
          </h2>
          <p className="text-white tracking-tight mt-8 max-w-2xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Let's talk about how we can help your customers come back more often, spend more, and feel great about it.
          </p>
          <div className="mt-12">
            <CTA label="Keep in Touch!" variant="yellow" href="/contact" />
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
      <HumanCentered />
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
