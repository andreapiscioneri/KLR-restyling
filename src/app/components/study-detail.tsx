"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { studies, brands } from "../data";
import { PageHero } from "./page-hero";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import type { Route } from "../App";

export function StudyDetail({ id, go }: { id: string; go: (r: Route) => void }) {
  const s = studies.find((x) => x.id === id) || studies[0];
  const brand = brands.find((b) => b.name === s.brand);
  const related = studies.filter((x) => x.id !== s.id && x.cat === s.cat).slice(0, 2);

  return (
    <div className="pb-48">
      <PageHero
        eyebrow={s.cat === "petrol" ? "Fuel · Case Study" : "Grocery · Case Study"}
        title={<>{s.title}</>}
        subtitle={`${s.client} · ${s.location} · ${s.year}`}
        image={s.img}
        cta={{ label: "All Case Studies", href: "/work" }}
      />

      <div className="max-w-6xl mx-auto px-8">
        {/* SUMMARY */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-24">
          <div className="md:col-span-7">
            <Eyebrow>The challenge</Eyebrow>
            <p className="text-black tracking-[-0.02em] mt-8" style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", lineHeight: 1.35, fontWeight: 500 }}>
              {s.summary}
            </p>
            <p className="text-black tracking-tight mt-8" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
              KLR partnered with {s.client} from the first workshop to the final redemption — crafting a
              program that aligned with brand values, logistical reality and shopper expectation. The result
              was a campaign that did not just move product but cemented the relationship with customers.
            </p>
          </div>
          <div className="md:col-span-5 space-y-4">
            {s.results.map((r) => (
              <div key={r.v} className={`rounded-[28px] p-7 ${hairline} bg-white flex items-center justify-between`} style={softShadow}>
                <div className="tracking-[0.2em] uppercase text-black" style={{ fontSize: "0.7rem" }}>{r.v}</div>
                <div className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "2rem", fontWeight: 700 }}>{r.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BRAND FEATURED */}
        {brand && (
          <div className={`rounded-[40px] p-10 md:p-14 mb-24 ${hairline} grid md:grid-cols-12 gap-10 items-center`} style={{ ...softShadow, background: "#2E2784" }}>
            <div className="md:col-span-5 rounded-[28px] overflow-hidden aspect-square">
              <ImageWithFallback src={brand.img} alt={brand.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-7 text-white">
              <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>Featured brand</div>
              <h3 className="tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>{brand.name}</h3>
              <p className="text-white tracking-tight mt-6 max-w-md" style={{ fontSize: "1rem", lineHeight: 1.55 }}>{brand.desc}</p>
              <div className="mt-8">
                <CTA label="Explore brand" variant="yellow" onClick={() => go({ page: "brand-detail", id: brand.id })} />
              </div>
            </div>
          </div>
        )}

        {/* RELATED */}
        <div>
          <Eyebrow>More in {s.cat}</Eyebrow>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {related.map((r) => (
              <button
                key={r.id}
                onClick={() => go({ page: "study-detail", id: r.id })}
                className={`group rounded-[32px] overflow-hidden bg-white ${hairline} text-left`}
                style={softShadow}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                </div>
                <div className="p-7">
                  <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>{r.client}</div>
                  <div className="text-black tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{r.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
