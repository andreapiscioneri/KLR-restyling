"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const hairline = "border border-black/5";
const softShadow = { boxShadow: "0 40px 100px -40px rgba(17,17,17,0.12)" };

const collections = [
  { title: "LUMEN", tag: "Canopy", img: "https://images.unsplash.com/photo-1759547232102-aadfb03d3b3d?w=1600" },
  { title: "AXIS", tag: "Totem", img: "https://images.unsplash.com/photo-1761513599048-c36e24e6e393?w=1600" },
  { title: "FACIA", tag: "Storefront", img: "https://images.unsplash.com/photo-1758670496782-cb11b7b56675?w=1600" },
  { title: "PULSE", tag: "Interior", img: "https://images.unsplash.com/photo-1771033834141-023d630b3965?w=1600" },
];

export function Brand() {
  return (
    <div className="pt-48 pb-64">
      <div className="max-w-6xl mx-auto px-8 mb-40">
        <div className="tracking-[0.2em] uppercase text-black mb-10" style={{ fontSize: "0.7rem" }}>
          <span className="inline-block w-6 h-px bg-black/40 mr-3 align-middle" /> Brand
        </div>
        <h1 className="text-[#111] tracking-[-0.04em] max-w-5xl" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          Vedo<span className="text-[#F8AE01]">.</span><br />
          <span className="text-black">Non vedo.</span>
        </h1>
      </div>

      {/* FULL BLEED HERO */}
      <section className="relative h-[95vh] min-h-[640px] w-full overflow-hidden mb-40">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1768128834301-7811be9d3a1f?w=2000"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div
            className="rounded-[40px] px-10 md:px-16 py-14 md:py-20 max-w-3xl text-center border border-white/20"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(60px) saturate(180%)",
              WebkitBackdropFilter: "blur(60px) saturate(180%)",
            }}
          >
            <div className="tracking-[0.25em] uppercase text-white mb-8" style={{ fontSize: "0.7rem" }}>A study in transparency</div>
            <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)", lineHeight: 1.05, fontWeight: 600 }}>
              Light that disappears<br />until it shouldn't.
            </h2>
          </div>
        </div>
      </section>

      {/* COLLECTIONS — alternating full width */}
      <section className="max-w-6xl mx-auto px-8 mb-48">
        <div className="flex items-baseline justify-between mb-16">
          <div className="tracking-[0.2em] uppercase text-black" style={{ fontSize: "0.7rem" }}>Collections</div>
          <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>04 series</div>
        </div>

        <div className="space-y-16 md:space-y-24">
          {collections.map((c, i) => (
            <div
              key={c.title}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className={`md:col-span-7 rounded-[40px] overflow-hidden relative group ${hairline}`} style={softShadow}>
                <div className="aspect-[16/11] overflow-hidden">
                  <ImageWithFallback src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1500ms]" />
                </div>
                <div
                  className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-[240px] rounded-2xl px-5 py-3 border border-white/20"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                  }}
                >
                  <div className="tracking-[0.2em] uppercase text-white" style={{ fontSize: "0.65rem" }}>{c.tag}</div>
                  <div className="text-white tracking-[-0.02em] mt-0.5" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{c.title}</div>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>0{i + 1} — {c.tag}</div>
                <h3 className="text-[#111] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1 }}>
                  {c.title}
                </h3>
                <p className="text-black tracking-tight mt-6 max-w-sm" style={{ fontSize: "1rem", lineHeight: 1.5 }}>
                  A precise study in form and illumination — engineered to hold its silence until darkness arrives.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-[#111] border-b border-[#111]/20 pb-0.5 hover:border-[#F8AE01] transition-colors cursor-pointer" style={{ fontSize: "0.9rem" }}>
                  Explore collection
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUIET STATS */}
      <section className="max-w-5xl mx-auto px-8">
        <div className={`rounded-[40px] bg-[#111] p-12 md:p-20 ${hairline}`} style={softShadow}>
          <div className="tracking-[0.2em] uppercase text-white mb-12" style={{ fontSize: "0.7rem" }}>Quality</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { k: "IP65", v: "Weatherproof" },
              { k: "-40%", v: "Energy use" },
              { k: "ISO", v: "9001 · 14001" },
              { k: "100%", v: "Recyclable" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-white tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1 }}>{s.k}</div>
                <div className="text-white tracking-tight mt-3" style={{ fontSize: "0.85rem" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
