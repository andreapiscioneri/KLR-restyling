import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { images, partners, studies, brands } from "../data";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Route } from "../App";

export function Petrol({ go }: { go: (r: Route) => void }) {
  const petrolStudies = studies.filter((s) => s.cat === "petrol");
  const petrolBrands = brands.filter((b) => ["bugatti", "pintinox", "nasa", "red-bull"].includes(b.id));

  return (
    <div className="pt-44 pb-48">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 mb-24">
        <Eyebrow>Petrol</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          Loyalty solutions<br />
          <span className="text-[#F8AE01]">for petrol stations.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          Drive customer loyalty and boost sales with KLR tailored promotions — from ready-to-launch
          programs to fully bespoke campaigns.
        </p>
      </section>

      {/* HERO IMAGE */}
      <section className={`relative h-[70vh] min-h-[460px] mx-4 md:mx-8 mb-32 rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
        <ImageWithFallback src={images.petrolCouple} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E2784]/70 via-[#2E2784]/20 to-transparent" />
        <div className="absolute inset-0 p-10 md:p-16 flex items-center">
          <div
            className="rounded-[32px] p-10 md:p-12 max-w-xl border border-white/20"
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(60px) saturate(180%)",
              WebkitBackdropFilter: "blur(60px) saturate(180%)",
            }}
          >
            <Eyebrow onDark>Why KLR</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-6" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15, fontWeight: 600 }}>
              Turn every fuel stop into a reason to come back.
            </h2>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="max-w-5xl mx-auto px-8 mb-32">
        <Eyebrow>What's inside</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-8 max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, lineHeight: 1.05 }}>
          A comprehensive overview of our loyalty programs, success stories and how we can help grow your business.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {[
            "Insights into loyalty trends in the petrol station market",
            "Case studies and key campaign results",
            "Overview of our ready-to-launch programs",
            "Information about KLR's expertise and service",
          ].map((t) => (
            <div key={t} className={`rounded-[24px] p-6 bg-white ${hairline} flex items-start gap-4`} style={softShadow}>
              <CheckCircle2 className="w-6 h-6 text-[#F8AE01] shrink-0 mt-0.5" />
              <div className="text-black tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.5 }}>{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PETROL BRANDS */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Ready-to-launch brands</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-6 mb-14 max-w-xl" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>
          Proven collections for the forecourt.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {petrolBrands.map((b) => (
            <button
              key={b.id}
              onClick={() => go({ page: "brand-detail", id: b.id })}
              className={`group rounded-[32px] overflow-hidden bg-white ${hairline} text-left`}
              style={softShadow}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.65rem" }}>{b.tag}</div>
                  <div className="text-black tracking-[-0.02em] mt-1" style={{ fontSize: "1rem", fontWeight: 600 }}>{b.name}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#2E2784] group-hover:rotate-45 group-hover:text-[#F8AE01] transition-all" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PETROL STUDIES */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <Eyebrow>Success stories</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-6 max-w-xl" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>
              Campaigns that fuel loyalty.
            </h2>
          </div>
          <CTA label="All K-Studies" onClick={() => go({ page: "studies" })} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {petrolStudies.slice(0, 4).map((s) => (
            <button
              key={s.id}
              onClick={() => go({ page: "study-detail", id: s.id })}
              className={`group rounded-[32px] overflow-hidden bg-white ${hairline} text-left`}
              style={softShadow}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
              </div>
              <div className="p-7">
                <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>{s.client} · {s.location}</div>
                <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{s.title}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PETROL PARTNERS */}
      <section className="max-w-6xl mx-auto px-8 mb-24">
        <Eyebrow>Trusted by</Eyebrow>
        <div className={`mt-10 rounded-[40px] p-10 md:p-14 ${hairline} grid grid-cols-3 md:grid-cols-6 gap-4`} style={{ ...softShadow, background: "#2E2784" }}>
          {partners.petrol.map((p) => (
            <div key={p} className="rounded-2xl py-5 text-center text-white border border-white/10 hover:bg-[#F8AE01] hover:text-black hover:border-[#F8AE01] transition-all duration-500 tracking-tight" style={{ fontSize: "0.8rem" }}>
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Ready to power your forecourt loyalty?
        </h3>
        <CTA label="Download profile" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
