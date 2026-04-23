"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { pillars, loyaltyFramework, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const challengePoints = [
  "Step out of everyday price competition",
  "Build stronger long-term customer loyalty",
];

const opportunityPoints = [
  "Increase Store Visits",
  "Grow Average Ticket",
  "Turn Occasional Shoppers into Loyal Customers",
  "Build Emotional Brand Connection",
  "Make Your Banner Stand Out",
];

const sectorsList = [
  { title: "Grocery Retail", desc: "Collectible campaigns, seasonal mechanics, cross-category engagement", primary: true },
  { title: "Fuel Retail", desc: "Repeat visit programs, service area engagement, international rollouts", primary: true },
  { title: "Drugstores", desc: "Health and beauty retail", primary: false },
  { title: "Pet Stores", desc: "Specialty pet retail", primary: false },
  { title: "Convenience & On-the-Go", desc: "Quick-service and convenience retail", primary: false },
  { title: "All-in-Stores (Bazaars)", desc: "Multi-category discount retail", primary: false },
];

const engagementFormula = [
  {
    n: "01",
    title: "Emotional Design",
    desc: "Strong visual storytelling, compelling reward imagery, and smart mechanics build desire before a customer earns a single point. Anticipation is a loyalty tool — we use it deliberately.",
  },
  {
    n: "02",
    title: "Exceptional Rewards",
    desc: "Rewards are symbols of achievement. Our global partner network ensures every reward is exclusive, desirable, top-quality, and relevant — because a cheap reward undermines everything the program was built to create.",
  },
  {
    n: "03",
    title: "Memorable Moments",
    desc: "The most powerful moment is when a customer receives their reward. That moment must deliver satisfaction and strengthen the emotional bond between customer and brand.",
  },
];

export function Services({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>360° Loyalty Campaign<br /><span className="text-[#F8AE01]">Design & Execution.</span></>}
        subtitle="From strategy to delivery, we handle every stage of your loyalty campaign. Proven through 340+ campaigns across 20+ European countries."
        image={images.services}
        cta={{ label: "See Our Work", href: "/work" }}
      />

      {/* CHALLENGE / OPPORTUNITY — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Challenge */}
              <div className="rounded-[40px] p-6 md:p-14 flex flex-col gap-8 relative overflow-hidden" style={{ background: "#2E2784", ...softShadow }}>
                <div className="absolute -top-16 -right-16 rounded-full opacity-10" style={{ width: 280, height: 280, background: "#F8AE01" }} />
                <Eyebrow onDark>The Challenge</Eyebrow>
                <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  Retail Loyalty Is <span className="text-[#F8AE01]">Harder</span> than Ever
                </h2>
                <p className="text-white/70 tracking-tight" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>Retailers today must:</p>
                <div className="space-y-4">
                  {challengePoints.map((p) => (
                    <div key={p} className="rounded-2xl px-6 py-4 border border-white/10" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <p className="text-white tracking-tight font-medium" style={{ fontSize: "0.9rem" }}>{p}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 tracking-tight italic" style={{ fontSize: "0.9rem" }}>
                  Running an impactful loyalty program is{" "}
                  <span className="text-[#F8AE01] not-italic font-semibold">extremely challenging</span> nowadays…
                </p>
              </div>

              {/* Opportunity */}
              <div className="rounded-[40px] p-6 md:p-14 flex flex-col gap-8 relative overflow-hidden border border-black/5" style={{ background: "#fff", ...softShadow }}>
                <div className="absolute -bottom-16 -left-16 rounded-full opacity-15" style={{ width: 280, height: 280, background: "#2E2784" }} />
                <div className="tracking-[0.3em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem", fontWeight: 600 }}>The Opportunity</div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  When Loyalty Works,<br /><em>Retailers Win</em>
                </h2>
                <div className="flex flex-wrap gap-3">
                  {opportunityPoints.map((o) => (
                    <span key={o} className="rounded-2xl px-4 py-2.5 bg-[#F8AE01]/20 text-[#2E2784] tracking-tight font-medium" style={{ fontSize: "0.8rem" }}>
                      {o}
                    </span>
                  ))}
                </div>
                <p className="text-[#2E2784] font-bold tracking-tight" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
                  So, it must be <em className="not-italic">emotionally engaging</em> for customers and <em className="not-italic">simple to run</em> for retailers.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ENGAGEMENT FORMULA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Answer</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              The KLR<br /><span className="text-[#F8AE01]">Engagement Formula.</span>
            </h2>
            <p className="text-white/80 tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              How we attract, engage and make customers loyal.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {engagementFormula.map((f, i) => (
                <div key={f.title} className="rounded-[32px] p-6 md:p-10 border border-white/10" style={i === 1 ? { background: "#F8AE01", ...softShadow } : { background: "rgba(255,255,255,0.07)", ...softShadow }}>
                  <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem", color: i === 1 ? "#2E2784" : undefined }}>{f.n}</div>
                  <h3 className={`${i === 1 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.03em] mt-6`} style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                    {f.title}
                  </h3>
                  <p className={`${i === 1 ? "text-[#2E2784]" : "text-white/80"} tracking-tight mt-6`} style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* INFOGRAPHIC — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Our Tailor-made Solutions</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Full Cycle of<br /><span className="text-black">Our Services.</span>
            </h2>
            <p className="text-[#2E2784] tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              10+ years of experience and 340+ campaigns delivered across 20+ countries.
            </p>
            <div className="mt-14 rounded-[40px] overflow-hidden border border-black/5" style={softShadow}>
              <ImageWithFallback src={images.servicesInfographic} alt="KLR Full Cycle of Services" className="w-full h-auto" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTORS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>We Are Loyalty Makers for Any Retailer</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Born for Grocery & Petrol.<br /><span className="text-[#F8AE01]">Ready to Scale Across Retail.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {sectorsList.map((s) => (
                <div key={s.title} className="rounded-[28px] p-8 border border-white/10" style={s.primary ? { background: "#F8AE01", ...softShadow } : { background: "rgba(255,255,255,0.07)", ...softShadow }}>
                  <h3 className={`${s.primary ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.02em]`} style={{ fontSize: "1.25rem", fontWeight: 700 }}>{s.title}</h3>
                  <p className={`${s.primary ? "text-[#2E2784]" : "text-white/75"} tracking-tight mt-4`} style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3 PILLARS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Service Overview</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Three Pillars.<br /><span className="text-black">One Seamless Experience.</span>
            </h2>
            <p className="text-[#2E2784] tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              We cover the full cycle: understanding your goals, designing the right campaign, executing flawlessly, and measuring what matters.
            </p>

            <div className="space-y-8 mt-10 md:mt-16">
              {pillars.map((p, i) => (
                <div key={p.n} className="rounded-[40px] p-6 md:p-14 border border-black/5" style={i === 1 ? { background: "#2E2784", ...softShadow } : i === 2 ? { background: "#fff", ...softShadow } : { background: "#fff", ...softShadow }}>
                  <div className="grid md:grid-cols-12 gap-10">
                    <div className="md:col-span-4">
                      <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>Pillar {p.n}</div>
                      <h3
                        className={`${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em] mt-6`}
                        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.05 }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <div className="md:col-span-8 space-y-6">
                      <div>
                        <div className={`tracking-[0.2em] uppercase ${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} mb-2`} style={{ fontSize: "0.65rem" }}>What it is</div>
                        <p className={`${i === 1 ? "text-white" : "text-black"} tracking-tight`} style={{ fontSize: "1rem", lineHeight: 1.6 }}>{p.what}</p>
                      </div>
                      <div>
                        <div className={`tracking-[0.2em] uppercase ${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} mb-2`} style={{ fontSize: "0.65rem" }}>How it works</div>
                        <p className={`${i === 1 ? "text-white" : "text-black"} tracking-tight`} style={{ fontSize: "1rem", lineHeight: 1.6 }}>{p.how}</p>
                      </div>
                      <div>
                        <div className={`tracking-[0.2em] uppercase ${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} mb-2`} style={{ fontSize: "0.65rem" }}>What you get</div>
                        <p className={`${i === 1 ? "text-white" : "text-black"} tracking-tight`} style={{ fontSize: "1rem", lineHeight: 1.6 }}>{p.out}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <CTA label="See How We Execute" variant="dark" onClick={() => go({ page: "studies" })} />
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
              <h3 className="text-white tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
                Every campaign is different. Let's find the right approach for yours.
              </h3>
              <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
