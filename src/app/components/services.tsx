"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const processSteps = [
  "Understanding Business Goals of our Client",
  "Understanding Client's Customers Needs",
  "Loyalty Campaign Strategy Development",
  "Loyalty Campaign Development",
  "360° Communication Design Development And Delivery",
  "Loyalty Campaign Management & Logistics",
  "Loyalty Campaign Monitoring",
  "Loyalty Campaign Analytics",
];

const campaignManagementItems = [
  "Campaign marketing",
  "Strategy & development",
  "Logistics & stock management",
  "Posm design and delivery",
  "Campaign running support",
  "Staff training and motivation",
  "Campaign analytics and reports",
  "Events and advertising management",
];

export function Services({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Our<br /><span className="text-[#F8AE01]">Services.</span></>}
        subtitle="We have a full range of services that allow us to deliver concrete results to our clients. Happy rewarded loyal customers mean more visits in-store, stable or increased turnover and a better reputation."
        image={images.services}
        cta={{ label: "See Our Work", href: "/work" }}
      />

      {/* 360° TAILOR MADE SERVICE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  360° Loyalty Marketing<br />Tailor Made Service
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  We've been working in international markets for years and we know what it takes to win. We work with you to create solutions to deliver sales, growth and brand recognition.
                </p>
              </div>
              <div className="relative flex justify-center md:justify-end">
                <div className="absolute -bottom-10 -left-6 w-[200px] h-[200px] rounded-full bg-[#2E2784]/20" />
                <div className="w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-white/40" style={softShadow}>
                  <ImageWithFallback src={images.aboutTonda} alt="360° Loyalty Marketing" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative flex justify-center md:justify-start order-2 md:order-1">
                <div className="absolute -bottom-10 -right-6 w-[200px] h-[200px] rounded-full bg-[#F8AE01]/30" />
                <div className="w-[330px] h-[330px] md:w-[420px] md:h-[420px] rounded-[40px] overflow-hidden border border-black/5" style={softShadow}>
                  <ImageWithFallback src={images.human} alt="Our Tailor-made Solutions" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Eyebrow>Our Approach</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Our <em className="not-italic text-black">Tailor-made</em> Solutions
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  We're flexible, quick, and smart enough to deliver all the services tailored specifically to each client's needs. Our international presence with a strong network of partners all around Europe allows us to offer the best prices and logistics efficiency.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  Whether you are looking for a dedicated partner or just want advice on the best route from A to B, KLR team is here for you.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FULL CYCLE OF SERVICES — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="text-white tracking-[-0.04em] max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.95, fontWeight: 800 }}>
              Full Cycle of our <span className="text-[#F8AE01]">Services</span>
            </h2>
            <p className="text-white/80 tracking-tight max-w-2xl mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
              We cover all the stages, from understanding our clients' goals to loyalty campaign execution. Campaign analytics allow us to deliver even better results each time in long-term partnerships with our clients and their customers.
            </p>
            <div className="mt-14 grid md:grid-cols-3 gap-5 pt-10 border-t border-white/15">
              {[
                { label: "Marketing Strategic Development", n: "01" },
                { label: "Full Campaign Management", n: "02" },
                { label: "Measurement and Analytics", n: "03" },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => {}}
                  className="group rounded-[28px] p-8 text-left border border-white/10 transition-all hover:border-[#F8AE01]/40"
                  style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}
                >
                  <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{s.n}</div>
                  <div className="text-white tracking-[-0.02em] mt-4 group-hover:text-[#F8AE01] transition-colors" style={{ fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.3 }}>{s.label}</div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* HUMAN CENTERED APPROACH + THE PROCESS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
              <div>
                <Eyebrow>Our Methodology</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Human Centered<br />Approach
                </h2>
              </div>
              <div className="md:pt-16">
                <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  At the heart of every campaign is a deep understanding of your customers. We combine qualitative and quantitative methods to deliver solutions that truly connect.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[40px] p-10 md:p-14 border border-black/5" style={{ background: "#2E2784", ...softShadow }}>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Loyalty Marketing Strategic Development", icon: "⚙" },
                  { title: "Loyalty Campaign Management", icon: "👥" },
                  { title: "Loyalty Measurement and Analytics", icon: "📊" },
                ].map((item) => (
                  <div key={item.title} className="rounded-[28px] p-8 text-center border border-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <div className="text-[#F8AE01] tracking-[-0.01em]" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.3 }}>{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-[#2E2784] tracking-[-0.04em] mt-20" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1, fontWeight: 800 }}>
              The Process
            </h3>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <div
                  key={step}
                  className="rounded-[24px] p-6 border border-black/5"
                  style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}
                >
                  <div className={`tracking-[0.25em] uppercase ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#F8AE01]"}`} style={{ fontSize: "0.65rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-white"} tracking-[-0.01em] mt-4`} style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.35 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* LOYALTY MARKETING STRATEGIC DEVELOPMENT — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <h2 className="text-white tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Loyalty Marketing<br /><span className="text-[#F8AE01]">Strategic Development</span>
                </h2>
                <p className="text-white/80 tracking-tight mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  In today's competitive market, it takes more than a great product to stand out. At KLR, we help clients to tell their stories and captivate audiences using integrated marketing communications that are brand-centric and highly measurable.
                </p>
                <div className="mt-10 relative w-full rounded-[32px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <ImageWithFallback src={images.aboutTonda} alt="Loyalty Marketing Strategic Development" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#2E2784]/30" />
                </div>
              </div>
              <div className="space-y-8 md:pt-4">
                {[
                  {
                    title: "Loyalty Marketing Strategic Development",
                    body: "A business that respects its local roots has a particular identity that can become part of its marketing strength. Even companies that market further afield can look back to their place of origin and use it to help their positioning. The “local touch” can be a unique take on what the business offers. Far more consumers identify with businesses that are (or seem) local than those that are generic in their branding.",
                  },
                  {
                    title: "Tailored Marketing Mechanics",
                    body: "Tailored marketing dives into your brand's target audience. One of the goals of tailored marketing is to make sure your communication reaches the people you're supposed to be reaching and the campaign mechanics is a right driver to achieve your goals.",
                  },
                  {
                    title: "Tailor-made program concept development",
                    body: "We deliver tailor-made loyalty program concepts that your customers will love. We do this by analyzing market trends and analytics gathering insights into what excites, motivates and inspires your customers to develop the best solutions for each market.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[28px] p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                    <h3 className="text-[#F8AE01] tracking-[-0.02em]" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.3, fontStyle: "italic" }}>{item.title}</h3>
                    <p className="text-white/80 tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FULL LOYALTY CAMPAIGN MANAGEMENT — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <Eyebrow>Service 02</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Full Loyalty<br />Campaign Management
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  As a company, KLR offers 360-degree marketing campaign management, from development to delivery. As a result, with us, our clients have complete control during all the stages.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  From strategic planning to daily operations, from logistics and stock management to staff training and motivation — you're in charge of your campaign. Let us help you achieve your business goals!
                </p>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  {campaignManagementItems.map((item) => (
                    <div key={item} className="rounded-2xl px-5 py-3.5 border border-black/5 flex items-center gap-3" style={{ background: "#2E2784" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F8AE01] shrink-0" />
                      <span className="text-white tracking-tight" style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex justify-center md:justify-end">
                <div className="absolute -bottom-10 -right-6 w-[200px] h-[200px] rounded-full bg-[#2E2784]/20" />
                <div className="w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-white/40" style={softShadow}>
                  <ImageWithFallback src={images.human} alt="Full Loyalty Campaign Management" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* LOYALTY MEASUREMENT AND ANALYTICS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <Eyebrow onDark>Service 03</Eyebrow>
                <h2 className="text-white tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  Loyalty Measurement<br /><span className="text-[#F8AE01]">and Analytics</span>
                </h2>
              </div>
              <div className="md:pt-20">
                <p className="text-white/80 tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}>
                  Long-term satisfied consumers are the result of a positive experience. Offering such an experience requires a thorough knowledge of your clients. Customer loyalty analytics uses sales and client data to find actionable insights into user behavior to see how loyal your consumers are to your business and what can drive them to increase purchases, visits and communication.
                </p>
                <p className="text-white/80 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}>
                  Customer Retention Rate (CRR), Repeat Purchase Rate (RPR), Social Media Audits, Discovery Workshops and other custom metrics help us together with the client to find the best way to deliver a winning loyalty campaign.
                </p>
              </div>
            </div>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 pt-10 border-t border-white/15">
              {["CRR", "RPR", "Social Media Audits", "Discovery Workshops"].map((metric) => (
                <div key={metric} className="rounded-[28px] p-7 border border-white/10 text-center" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                  <div className="text-[#F8AE01] tracking-[-0.02em]" style={{ fontSize: "1rem", fontWeight: 700 }}>{metric}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="text-[#2E2784] tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                Get in Touch with us and we'll find the right solution for you
              </h3>
              <CTA label="Get in Touch" variant="dark" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
