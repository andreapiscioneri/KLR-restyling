"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { images, careerValues, offices } from "../data";
import { PageHero } from "./page-hero";
import type { Route } from "../App";

export function Career({ go }: { go: (r: Route) => void }) {
  return (
    <div className="pb-48">
      <PageHero
        eyebrow="Career"
        title={<>A Loyal Team<br /><span className="text-[#F8AE01]">of Professionals.</span></>}
        subtitle="Loyalty starts within our team. We are open-minded professionals of different nationalities, united by trust, mutual respect, and a passion for loyalty marketing."
        image={images.recruiting}
        cta={{ label: "See Open Positions", href: "#positions" }}
      />

      <div className="pt-2">
      <section className={`relative h-[75vh] min-h-[480px] mx-4 md:mx-8 mb-32 rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
        <ImageWithFallback src={images.teamPhoto} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 via-[#2E2784]/10 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between gap-6 flex-wrap">
          <h2 className="text-[#F8AE01] tracking-[-0.035em] max-w-2xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05, fontWeight: 600 }}>
            Be part of our<br />International Team.
          </h2>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>How we work</Eyebrow>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {careerValues.map((v) => (
            <div key={v.title} className={`rounded-[32px] p-10 bg-white ${hairline}`} style={softShadow}>
              <h3 className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                {v.title}
              </h3>
              <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POSITIONS */}
      <section className="max-w-5xl mx-auto px-8 mb-32">
        <div className={`rounded-[40px] p-10 md:p-14 ${hairline}`} style={{ ...softShadow, background: "#2E2784" }}>
          <Eyebrow onDark>Open positions</Eyebrow>
          <h2 className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.05 }}>
            Let's get started something new together.
          </h2>
          <div className="mt-12 divide-y divide-white/10">
            {[
              { role: "Loyalty Program Manager", loc: "Milan · IT" },
              { role: "Account Executive — Petrol", loc: "Ljubljana · SI" },
              { role: "Creative Copywriter", loc: "Remote · EU" },
              { role: "Supply Chain Coordinator", loc: "Milan · IT" },
            ].map((p) => (
              <div key={p.role} className="py-6 flex items-center justify-between gap-4 group cursor-pointer">
                <div>
                  <div className="text-white tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{p.role}</div>
                  <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.85rem", opacity: 0.6 }}>{p.loc}</div>
                </div>
                <span className="text-[#F8AE01] tracking-tight group-hover:translate-x-2 transition-transform duration-500" style={{ fontSize: "0.9rem" }}>
                  Apply →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="max-w-6xl mx-auto px-8 mb-24">
        <Eyebrow>Our offices</Eyebrow>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {offices.map((o) => (
            <div key={o.city} className={`rounded-[28px] p-8 bg-white ${hairline}`} style={softShadow}>
              <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{o.region}</div>
              <div className="text-[#2E2784] tracking-[-0.02em] mt-4" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{o.city}</div>
              <div className="text-black tracking-tight mt-3" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{o.addr}</div>
              <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.9rem" }}>{o.phone}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Let's get started something new together.
        </h3>
        <CTA label="Get in Touch" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
      </div>
    </div>
  );
}
