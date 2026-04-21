import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { images, journey, stats, fallbackPosts } from "../data";
import type { Route } from "../App";

export function Klr10({ go }: { go: (r: Route) => void }) {
  const anniversary = fallbackPosts.find((p) => p.slug.includes("10-anniversary")) || fallbackPosts[4];

  return (
    <div className="pt-44 pb-48">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 mb-24">
        <Eyebrow>KLR 10 Years</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 700 }}>
          A decade<br /><span className="text-[#F8AE01]">built together.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          From three founders in Koper to a 43-person international team delivering loyalty campaigns across 20+ European markets. This is our story.
        </p>
      </section>

      {/* ANNIVERSARIO HERO IMAGE */}
      <section className={`relative h-[80vh] min-h-[520px] mx-4 md:mx-8 rounded-[40px] overflow-hidden mb-32 ${hairline}`} style={softShadow}>
        <ImageWithFallback src={images.anniversario} alt="KLR 10 Years" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 via-[#2E2784]/10 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between flex-wrap gap-8">
          <div className="text-[#F8AE01] tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 0.95 }}>
            10 Years of Loyalty.<br /><span className="text-white">10 Years of Teamwork.</span>
          </div>
          <div className="flex gap-8 text-white">
            {[{ k: stats.years, v: "Years" }, { k: stats.countries, v: "Countries" }, { k: stats.campaigns, v: "Campaigns" }, { k: stats.people, v: "People" }].map((s) => (
              <div key={s.v}>
                <div className="text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)", fontWeight: 800 }}>{s.k}</div>
                <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.8rem" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Our Journey</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Milestone by<br /><span className="text-[#F8AE01]">milestone.</span>
        </h2>
        <div className="mt-14 relative">
          <div className="absolute left-[1.15rem] top-0 bottom-0 w-px bg-[#F8AE01]/40 hidden md:block" />
          <div className="space-y-6">
            {journey.map((j, i) => (
              <div key={i} className="md:pl-14 relative">
                <div className="absolute left-0 top-4 w-10 h-10 rounded-full bg-[#F8AE01] text-black flex items-center justify-center hidden md:flex" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
                  {i + 1}
                </div>
                <div className={`rounded-[28px] p-8 ${hairline} flex flex-wrap items-baseline gap-6 md:gap-10`} style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
                  <div className={`tracking-[-0.03em] ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#F8AE01]"}`} style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800 }}>{j.year}</div>
                  <div className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-white"} tracking-[-0.02em] flex-1 min-w-[200px]`} style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", fontWeight: 600 }}>{j.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNIVERSARY RECAP */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <button onClick={() => go({ page: "blog-detail", slug: anniversary.slug })} className={`w-full rounded-[40px] overflow-hidden bg-white ${hairline} text-left group`} style={softShadow}>
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <ImageWithFallback src={anniversary.img} alt={anniversary.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-between gap-8">
              <div>
                <Eyebrow>Franciacorta · 2025</Eyebrow>
                <h3 className="text-[#2E2784] tracking-[-0.03em] mt-8" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>{anniversary.title}</h3>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{anniversary.excerpt}</p>
              </div>
              <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5 self-start" style={{ fontSize: "0.9rem" }}>Read the anniversary story →</span>
            </div>
          </div>
        </button>
      </section>

      {/* CLOSING */}
      <section className="max-w-5xl mx-auto px-8">
        <div className={`rounded-[40px] p-10 md:p-16 ${hairline}`} style={{ background: "#2E2784", ...softShadow }}>
          <h2 className="text-[#F8AE01] tracking-[-0.035em] max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
            The next ten years<br /><span className="text-white">start now.</span>
          </h2>
          <p className="text-white tracking-tight mt-8 max-w-2xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Join us as we continue to design emotional loyalty for retailers, brands and shoppers across Europe.
          </p>
          <div className="mt-12">
            <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
          </div>
        </div>
      </section>
    </div>
  );
}
