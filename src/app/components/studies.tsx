import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { studies } from "../data";
import type { Route } from "../App";

type Sector = "all" | "petrol" | "retail";

export function Studies({ go }: { go: (r: Route) => void }) {
  const [sector, setSector] = useState<Sector>("all");
  const [brand, setBrand] = useState<string>("all");

  const allBrands = Array.from(new Set(studies.map((s) => s.brand)));
  const filtered = studies.filter((s) => (sector === "all" || s.cat === sector) && (brand === "all" || s.brand === brand));

  const sectorChips: { id: Sector; label: string }[] = [
    { id: "all", label: "All" },
    { id: "retail", label: "Grocery" },
    { id: "petrol", label: "Fuel" },
  ];

  return (
    <div className="pt-44 pb-48 max-w-6xl mx-auto px-8">
      <div className="mb-20">
        <Eyebrow>Case Studies</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          Loyalty Campaigns<br /><span className="text-[#F8AE01]">that drive success.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          340+ campaigns across 20+ countries. Explore how we've helped grocery and fuel retail chains achieve their goals through loyalty programs with measurable results.
        </p>
      </div>

      {/* FILTER CHIPS */}
      <div className="sticky top-28 z-30 mb-20 flex flex-wrap justify-center gap-3">
        <div
          className="rounded-full p-1.5 inline-flex gap-1 border border-white/20"
          style={{
            background: "rgba(46,39,132,0.92)",
            backdropFilter: "blur(60px) saturate(180%)",
            WebkitBackdropFilter: "blur(60px) saturate(180%)",
            boxShadow: "0 30px 80px -20px rgba(46,39,132,0.4)",
          }}
        >
          {sectorChips.map((c) => (
            <button
              key={c.id}
              onClick={() => setSector(c.id)}
              className={`px-6 py-2 rounded-full tracking-tight transition-all duration-500 ${
                sector === c.id ? "bg-[#F8AE01] text-black" : "text-white"
              }`}
              style={{ fontSize: "0.85rem" }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className={`rounded-full p-1.5 inline-flex gap-1 bg-white ${hairline}`}>
          {["all", ...allBrands].map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`px-5 py-2 rounded-full tracking-tight transition-all duration-500 ${
                brand === b ? "bg-[#2E2784] text-white" : "text-black hover:text-[#2E2784]"
              }`}
              style={{ fontSize: "0.8rem" }}
            >
              {b === "all" ? "All brands" : b}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-24 md:space-y-32">
        {filtered.map((s, i) => (
          <article
            key={s.id}
            className={`group cursor-pointer ${i % 3 === 0 ? "md:mr-16" : i % 3 === 1 ? "md:ml-16" : ""}`}
            onClick={() => go({ page: "study-detail", id: s.id })}
          >
            <div className={`relative rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
              <div className="aspect-[16/9] overflow-hidden">
                <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
              </div>
              <div
                className="absolute top-6 left-6 rounded-full px-4 py-1.5 border border-white/25 text-white tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(46,39,132,0.5)",
                  backdropFilter: "blur(40px)",
                  WebkitBackdropFilter: "blur(40px)",
                  fontSize: "0.65rem",
                }}
              >
                {s.cat === "petrol" ? "Fuel" : "Grocery"} · {s.brand}
              </div>
            </div>
            <div className="mt-8 flex items-end justify-between gap-8 flex-wrap">
              <div>
                <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>
                  {s.client} — {s.location} — {s.year}
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mt-3" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05, fontWeight: 700 }}>
                  {s.title}
                </h2>
              </div>
              <div className="inline-flex items-center gap-3 text-black">
                <span className="border-b border-[#2E2784] group-hover:border-[#F8AE01] pb-0.5 transition-colors" style={{ fontSize: "0.9rem" }}>Read study</span>
                <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CLOSING CTA */}
      <section className="mt-32 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Are you ready to start something new together?
        </h3>
        <CTA label="Get in Touch" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
