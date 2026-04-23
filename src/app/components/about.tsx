"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { images, whatWeDeliver, aboutImpact, moreThanLoyalty, journey } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const klrWayValues = [
  {
    title: "Smart Thinkers, Fast Movers",
    desc: "We think strategically but act quickly. Ideas are important, but turning them into reality is what truly creates value for our clients.",
  },
  {
    title: "International Mindset, Local Heart",
    desc: "Our experience and partnerships are international, but our approach remains personal and close to the markets we serve. We understand global trends while staying deeply connected to local customers.",
  },
  {
    title: "People at the Core",
    desc: "People are at the center of our business. We care about our colleagues and our clients the way a family member would. Loyalty cannot be imposed — it must be built around real needs and genuine value.",
  },
  {
    title: "Learning by Doing",
    desc: "Experience is our greatest teacher. We believe the best solutions emerge from experimentation, curiosity, and constant improvement. We learn, adapt, and evolve with every campaign we deliver.",
  },
  {
    title: "Loyalty Service at Its Best",
    desc: "Our reputation is built on reliability, organisation, and dedication. Clients trust us because we keep our word, respect our commitments, and always go the extra mile.",
  },
  {
    title: "Partnership Over Transactions",
    desc: "We work with our clients, not just for them. Our goal is not simply to deliver a campaign but to build lasting partnerships that create value for both sides.",
  },
];

const brandArchetype = [
  { label: "Magician", desc: "We transform everyday transactions into engaging loyalty experiences." },
  { label: "Creator", desc: "We design unique campaigns and outstanding reward collections that inspire customers." },
  { label: "Caregiver", desc: "We support our clients with dependable service and operational excellence." },
];

export function About({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="About KLR"
        title={<>Being Central to<br /><span className="text-[#F8AE01]">Loyalty.</span></>}
        subtitle="We make loyalty campaigns work beautifully and reliably: 10+ years, 340+ campaigns, 150+ retail clients, and activations across 20+ European markets."
        image={images.teamPhoto}
        cta={{ label: "Meet the Team", href: "/team" }}
      />

      {/* BRAND PROMISE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] overflow-hidden relative" style={{ background: "#2E2784", ...softShadow }}>
              <div className="absolute -top-20 -right-20 rounded-full opacity-10" style={{ width: 350, height: 350, background: "#F8AE01" }} />
              <div className="grid md:grid-cols-2">
                <div className="p-7 md:p-16 flex flex-col justify-center gap-8">
                  <Eyebrow onDark>Brand Promise</Eyebrow>
                  <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.1, fontStyle: "italic" }}>
                    "We design loyalty experiences that customers feel emotionally, trust consistently, and value deeply."
                  </h2>
                  <p className="text-white/70 tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                    Helping retail chains turn transactions into business growth through a loyal customer base.
                    Where others operate loyalty programs, <strong className="text-[#F8AE01]">KLR designs emotional loyalty experiences.</strong>
                  </p>
                </div>
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <ImageWithFallback src={images.teamPhoto} alt="KLR Team" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MISSION / VISION — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Direction</Eyebrow>
            <div className="grid md:grid-cols-2 gap-6 mt-8 md:mt-14">
              <div className="rounded-[40px] p-6 md:p-14 border border-white/10" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>Brand Mission</div>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  Designing Emotional Loyalty
                </h3>
                <p className="text-white/80 tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                  To design and execute loyalty experiences that create emotional engagement and lasting customer relationships
                  with measurable retail results — while making campaign management <strong>simple and reliable</strong> for our clients.
                </p>
              </div>
              <div className="rounded-[40px] p-6 md:p-14" style={{ background: "#F8AE01", ...softShadow }}>
                <div className="tracking-[0.25em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>Brand Vision</div>
                <h3 className="text-[#2E2784] tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  Europe's Most Trusted Loyalty Partner
                </h3>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                  We envision a future where loyalty campaigns are powerful experiences that customers look forward to.
                  KLR aims to be a trusted loyalty partner for retail and fuel chains across Europe —
                  known for <strong>creativity, reliability, and exceptional campaign execution.</strong>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HOW WE BRING LOYALTY TO LIFE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] overflow-hidden border border-black/5 relative" style={softShadow}>
              <div className="aspect-[16/9] overflow-hidden">
                <ImageWithFallback src={images.teamPhoto} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/80 via-[#2E2784]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-14">
                <Eyebrow onDark>How We Bring Loyalty to Life</Eyebrow>
                <h2 className="text-white tracking-[-0.035em] mt-8 max-w-3xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.05 }}>
                  The culture of loyalty<br /><span className="text-[#F8AE01]">starts within our team.</span>
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                KLR is a 43-person international team with 11 nationalities. We combine strategic thinking and operational discipline to deliver services tailored to each client's goals.
              </p>
              <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                Our approach combines behavioural insight with creative design, powerful omnichannel communication, and exceptional reward collections. We help brands turn transactions into lasting relationships.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* OUR ANSWER — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Answer</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Loyalty Campaigns <span className="text-[#F8AE01]">That…</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {whatWeDeliver.map((v, i) => (
                <div key={v.title} className="rounded-[32px] p-6 md:p-10 border border-white/10" style={i === 1 ? { background: "#F8AE01", ...softShadow } : { background: "rgba(255,255,255,0.07)", ...softShadow }}>
                  <h3 className={`${i === 1 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.03em]`} style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                    {v.title}
                  </h3>
                  <p className={`${i === 1 ? "text-[#2E2784]" : "text-white/80"} tracking-tight mt-6`} style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* THE IMPACT — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>The Impact</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              What This Delivers<br /><span className="text-black">To You.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {aboutImpact.map((v) => (
                <div key={v.title} className="rounded-[32px] p-6 md:p-10 border border-black/5" style={{ background: "#2E2784", ...softShadow }}>
                  <h3 className="text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700, lineHeight: 1.15 }}>
                    {v.title}
                  </h3>
                  <p className="text-white/75 tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.55 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BIG STATEMENT — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] p-7 md:p-20 border border-white/10 relative overflow-hidden" style={{ background: "#F8AE01", ...softShadow }}>
              <div className="absolute -bottom-20 -right-20 rounded-full opacity-20" style={{ width: 360, height: 360, background: "#2E2784" }} />
              <h2 className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 0.95 }}>
                This isn't just Loyalty…<br />
                <span style={{ color: "#3D0088" }}>this is Marketing!</span>
              </h2>
              <p className="text-[#2E2784] tracking-tight mt-8 max-w-xl font-semibold" style={{ fontSize: "1.125rem", lineHeight: 1.55 }}>
                And we make the process MORE than simple.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MORE THAN A LOYALTY COMPANY — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>More than a loyalty company</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              We Are<br /><span className="text-black">More Than a Loyalty Company.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {moreThanLoyalty.map((v, i) => (
                <div key={v.title} className="rounded-[32px] p-6 md:p-10 border border-black/5" style={i === 0 ? { background: "#2E2784", ...softShadow } : { background: "#fff", ...softShadow }}>
                  <h3 className={`${i === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em]`} style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>{v.title}</h3>
                  <p className={`${i === 0 ? "text-white" : "text-black"} tracking-tight mt-6`} style={{ fontSize: "1rem", lineHeight: 1.55 }}>{v.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <CTA label="Discover Our Team" variant="dark" onClick={() => go({ page: "team" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* THE KLR WAY — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>The KLR Way</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Being Central<br /><span className="text-[#F8AE01]">to Loyalty.</span>
            </h2>
            <p className="text-white/80 tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}>
              It is the way we think, the way we work, and the way we build relationships with both colleagues and clients.
              KLR is built on people, trust, hands-on experience and shared responsibility.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {klrWayValues.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-[32px] p-6 md:p-10 border border-white/10"
                  style={i % 3 === 1 ? { background: "#F8AE01", ...softShadow } : { background: "rgba(255,255,255,0.07)", ...softShadow }}
                >
                  <h3
                    className={`${i % 3 === 1 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.02em]`}
                    style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {v.title}
                  </h3>
                  <p className={`${i % 3 === 1 ? "text-[#2E2784]" : "text-white/80"} tracking-tight mt-5`} style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND ARCHETYPE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Brand Archetype</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Magician + Creator<br /><span className="text-black">+ Caregiver.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {brandArchetype.map((a, i) => (
                <div
                  key={a.label}
                  className="rounded-[32px] p-6 md:p-10 border border-black/5"
                  style={i === 0 ? { background: "#2E2784", ...softShadow } : { background: "#fff", ...softShadow }}
                >
                  <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>
                    {i === 0 ? "Primary" : i === 1 ? "Secondary" : "Cultural"}
                  </div>
                  <h3
                    className={`${i === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em] mt-6`}
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}
                  >
                    {a.label}
                  </h3>
                  <p
                    className={`${i === 0 ? "text-white" : "text-black"} tracking-tight mt-6`}
                    style={{ fontSize: "1rem", lineHeight: 1.55 }}
                  >
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[#2E2784] tracking-tight max-w-2xl mt-10" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
              This balance allows us to create loyalty campaigns that are both{" "}
              <strong>inspiring for customers</strong> and{" "}
              <strong>effortless for clients to manage</strong>.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* TIMELINE — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Journey</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              The Power of Our Experience<br /><span className="text-[#F8AE01]">is Rooted in Our History.</span>
            </h2>
            <div className="mt-14 flex flex-col md:flex-row md:overflow-x-auto md:snap-x gap-6 pb-4">
              {journey.map((j, i) => (
                <div key={i} className="md:snap-start shrink-0 md:w-72 rounded-[28px] p-8 border border-white/10" style={i % 2 === 0 ? { background: "rgba(255,255,255,0.07)", ...softShadow } : { background: "#F8AE01", ...softShadow }}>
                  <div className={`tracking-[0.25em] uppercase ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"}`} style={{ fontSize: "0.7rem" }}>{j.year}</div>
                  <div className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-[-0.02em] mt-6`} style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.25 }}>{j.title}</div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <CTA label="Explore Our Full 10-Year Journey" variant="yellow" onClick={() => go({ page: "klr10" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
                Join our team and let's shape together the world of loyalty.
              </h3>
              <CTA label="Keep in Touch!" variant="dark" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
