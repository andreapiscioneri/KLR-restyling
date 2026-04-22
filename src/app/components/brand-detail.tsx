"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { brands, studies } from "../data";
import { PageHero } from "./page-hero";
import { ArrowLeft } from "lucide-react";
import type { Route } from "../App";

export function BrandDetail({ id, go }: { id: string; go: (r: Route) => void }) {
  const brand = brands.find((b) => b.id === id) || brands[0];
  const related = studies.filter((s) => s.brand === brand.name).slice(0, 3);
  const more = brands.filter((b) => b.id !== brand.id).slice(0, 3);

  return (
    <div className="pb-48">
      <PageHero
        eyebrow={brand.tag}
        title={<>{brand.name}<span className="text-[#F8AE01]">.</span></>}
        subtitle={brand.desc}
        image={brand.img}
        cta={{ label: "All Brands", href: "/brands" }}
      />
      <div className="max-w-6xl mx-auto px-8">

      {/* FACTS BAR */}
      <div className={`rounded-[40px] p-10 md:p-14 mb-24 ${hairline}`} style={{ ...softShadow, background: "#2E2784" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-white">
          {[
            { k: "EU-wide", v: "Distribution" },
            { k: "100%", v: "Licensed" },
            { k: "Turnkey", v: "Logistics" },
            { k: "Made-to-fit", v: "Campaigns" },
          ].map((f) => (
            <div key={f.v}>
              <div className="tracking-[-0.03em] text-[#F8AE01]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}>{f.k}</div>
              <div className="text-white tracking-tight mt-2" style={{ fontSize: "0.85rem" }}>{f.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED STUDIES */}
      {related.length > 0 && (
        <div className="mb-24">
          <Eyebrow>Featured in</Eyebrow>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {related.map((s) => (
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
                  <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>{s.client}</div>
                  <div className="text-black tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{s.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MORE BRANDS */}
      <div>
        <Eyebrow>More brands</Eyebrow>
        <div className="grid grid-cols-3 gap-5 mt-10">
          {more.map((b) => (
            <button
              key={b.id}
              onClick={() => go({ page: "brand-detail", id: b.id })}
              className={`group rounded-[28px] overflow-hidden bg-white ${hairline} text-left`}
              style={softShadow}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
              </div>
              <div className="p-5">
                <div className="text-black tracking-[-0.02em]" style={{ fontWeight: 600 }}>{b.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
