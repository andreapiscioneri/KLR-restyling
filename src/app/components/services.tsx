"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { pillars, images } from "../data";
import { PageHero } from "./page-hero";
import type { Route } from "../App";

const sectorsList = [
  { title: "Grocery Retail", desc: "Supermarkets, hypermarkets, food retail chains" },
  { title: "Fuel Retail", desc: "Petrol station networks, service area engagement" },
  { title: "Drugstores", desc: "Health and beauty retail" },
  { title: "Pet Stores", desc: "Specialty pet retail" },
  { title: "Convenience & On-the-Go", desc: "Quick-service and convenience retail" },
  { title: "All-in-Stores (Bazaars)", desc: "Multi-category discount retail" },
];

export function Services({ go }: { go: (r: Route) => void }) {
  return (
    <div className="pb-48">
      <PageHero
        eyebrow="Services"
        title={<>360° Loyalty Campaign<br /><span className="text-[#F8AE01]">Design & Execution.</span></>}
        subtitle="From strategy to delivery, we handle every stage of your loyalty campaign — so you can focus on your business while we make your customers come back."
        image={images.services}
        cta={{ label: "See Our Work", href: "/work" }}
      />

      {/* HERO IMAGE */}
      <section className={`relative h-[70vh] min-h-[480px] mx-4 md:mx-8 rounded-[40px] overflow-hidden mb-16 ${hairline}`} style={softShadow}>
        <ImageWithFallback src={images.services} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2E2784]/60" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-3xl text-center">
            <h2 className="text-[#F8AE01] tracking-[-0.035em]" style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
              360° Loyalty Marketing<br /><span className="text-white">Tailor Made Service.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* INFOGRAPHIC */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Our Tailor-made Solutions</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Full Cycle of<br /><span className="text-[#F8AE01]">Our Services.</span>
        </h2>
        <p className="text-black tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
          10 years of experience and more than 300 campaigns completed are a guarantee that you can trust us.
        </p>
        <div className={`mt-14 rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
          <ImageWithFallback src={images.servicesInfographic} alt="KLR Full Cycle of Services" className="w-full h-auto" />
        </div>
      </section>

      {/* SECTORS LIST */}
      <section className="max-w-6xl mx-auto px-8 mb-40">
        <Eyebrow>We Are Loyalty Makers for Any Retailer</Eyebrow>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {sectorsList.map((s) => (
            <div key={s.title} className={`rounded-[28px] p-8 bg-white ${hairline}`} style={softShadow}>
              <h3 className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{s.title}</h3>
              <p className="text-black tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Service Overview</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Three Pillars.<br /><span className="text-[#F8AE01]">One seamless experience.</span>
        </h2>
        <p className="text-black tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
          We cover the full cycle: understanding your goals, designing the right campaign, executing flawlessly, and measuring what matters.
        </p>

        <div className="space-y-8 mt-16">
          {pillars.map((p, i) => (
            <div key={p.n} className={`rounded-[40px] p-10 md:p-14 ${hairline}`} style={i === 1 ? { background: "#2E2784", ...softShadow } : { background: "#fff", ...softShadow }}>
              <div className="grid md:grid-cols-12 gap-10">
                <div className="md:col-span-4">
                  <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>Pillar {p.n}</div>
                  <h3 className={`${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em] mt-6`} style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
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
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Every campaign is different. Let's find the right approach for yours.
        </h3>
        <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
