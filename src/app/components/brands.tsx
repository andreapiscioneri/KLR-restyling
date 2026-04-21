import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { brands, brandPartners, productCategories, whyBrandsPartner, brandPartnershipProcess, images } from "../data";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "../App";

export function Brands({ go }: { go: (r: Route) => void }) {
  return (
    <div className="pt-44 pb-48">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 mb-24">
        <Eyebrow>Brands</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          Exceptional Brands.<br /><span className="text-[#F8AE01]">Unforgettable Rewards.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          We partner with world-class brands to create exclusive reward collections that inspire desire, deliver satisfaction, and elevate retail loyalty campaigns across Europe.
        </p>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>The Full Scope of Loyalty</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Product categories<br /><span className="text-[#F8AE01]">we curate.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-14">
          {productCategories.map((c, i) => (
            <div key={c.title} className={`rounded-[28px] p-8 ${hairline}`} style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
              <h3 className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.02em]`} style={{ fontSize: "1.25rem", fontWeight: 700 }}>{c.title}</h3>
              <p className={`${i % 2 === 0 ? "text-black" : "text-white"} tracking-tight mt-4`} style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND SHOWCASES — per-brand stats */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Our Brand Partners</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Every collection<br /><span className="text-[#F8AE01]">has a story.</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => go({ page: "brand-detail", id: b.id })}
              className={`group relative rounded-[32px] overflow-hidden text-left bg-white ${hairline}`}
              style={softShadow}
            >
              <div className="aspect-[5/4] overflow-hidden">
                <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1500ms]" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{b.tag}</div>
                    <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.375rem", fontWeight: 700 }}>{b.name}</div>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-black/5">
                  <div>
                    <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.campaigns}</div>
                    <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.7rem" }}>campaigns</div>
                  </div>
                  <div>
                    <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.countries}</div>
                    <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.7rem" }}>countries</div>
                  </div>
                  <div>
                    <div className="text-[#2E2784] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{b.since}</div>
                    <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.7rem" }}>since</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BRAND PARTNER LOGO GRID */}
      <section className="max-w-6xl mx-auto px-8 mb-40">
        <Eyebrow>Global Brands</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          A growing portfolio<br /><span className="text-[#F8AE01]">of trusted brands.</span>
        </h2>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-3">
          {brandPartners.map((b) => (
            <div key={b} className={`rounded-[20px] p-6 bg-white ${hairline} flex items-center justify-center text-center min-h-[100px]`}>
              <span className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BRANDS PARTNER WITH US */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Why Brands Partner with KLR</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Unlock the power of loyalty<br /><span className="text-[#F8AE01]">for your brand.</span>
        </h2>
        <p className="text-black tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.65 }}>
          For global and premium brands, retail loyalty campaigns represent one of the most effective ways to reach millions of consumers in a trusted, high-frequency shopping environment.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {whyBrandsPartner.map((v, i) => (
            <div key={v.title} className={`rounded-[32px] p-10 ${hairline}`} style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
              <h3 className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.02em]`} style={{ fontSize: "1.375rem", fontWeight: 700, lineHeight: 1.15 }}>{v.title}</h3>
              <p className={`${i % 2 === 0 ? "text-black" : "text-white"} tracking-tight mt-6`} style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW BRAND PARTNERSHIPS WORK */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>How Brand Partnerships Work</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          From licensing to in-store:<br /><span className="text-[#F8AE01]">a seamless process.</span>
        </h2>
        <div className={`mt-14 rounded-[40px] p-10 md:p-14 ${hairline}`} style={{ background: "#2E2784", ...softShadow }}>
          <div className="divide-y divide-white/15">
            {brandPartnershipProcess.map((p) => (
              <div key={p.n} className="py-8 grid md:grid-cols-12 gap-6 first:pt-0 last:pb-0">
                <div className="md:col-span-2 text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "2rem", fontWeight: 800 }}>{p.n}</div>
                <div className="md:col-span-4 text-[#F8AE01] tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{p.title}</div>
                <div className="md:col-span-6 text-white tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND CTA */}
      <section className="max-w-6xl mx-auto px-8 mb-20">
        <div className={`rounded-[40px] overflow-hidden ${hairline} relative`} style={softShadow}>
          <ImageWithFallback src={images.human} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#2E2784]/80" />
          <div className="relative p-10 md:p-16">
            <Eyebrow onDark>For Brand Partners</Eyebrow>
            <h2 className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-3xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.05 }}>
              Interested in reaching millions of<br /><span className="text-white">European consumers through loyalty?</span>
            </h2>
            <p className="text-white tracking-tight mt-8 max-w-xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              We're always looking for exciting brands to bring into our loyalty ecosystem.
            </p>
            <div className="mt-10">
              <CTA label="Become a Brand Partner" variant="yellow" onClick={() => go({ page: "contact" })} />
            </div>
          </div>
        </div>
      </section>

      {/* RETAILER CTA */}
      <section className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Looking for the perfect collection for your campaign?
        </h3>
        <CTA label="Keep in Touch!" variant="dark" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
