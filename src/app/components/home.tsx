import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { images, stats, loyaltyFramework, sectors, retailers, brandPartners, studies, fallbackPosts, locations } from "../data";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "../App";

export function Home({ go }: { go: (r: Route) => void }) {
  const featuredStudy = studies[0];
  const featuredPost = fallbackPosts[0];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen pt-40 pb-24 overflow-hidden">
        <ImageWithFallback src={images.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2E2784]/70" />
        <div className="relative px-8 md:px-12 flex flex-col justify-end min-h-[calc(100vh-10rem)]">
          <Eyebrow onDark>Key to Loyalty in Retail</Eyebrow>
          <h1 className="text-white tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 700 }}>
            We are Key to<br />
            <span className="text-[#F8AE01]">Loyalty in Retail.</span>
          </h1>
          <p className="text-white tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.55 }}>
            Built on trust and teamwork. 10+ years, 340+ campaigns, 150+ retail clients, and activations across 20+ European countries.
          </p>
          <div className="mt-12">
            <CTA label="Get in Touch" variant="yellow" onClick={() => go({ page: "contact" })} />
          </div>
        </div>
      </section>

      {/* HUMAN CENTERED */}
      <section className="px-8 md:px-12 pt-32 pb-0 mb-0">
        <div className={`rounded-[40px] overflow-hidden relative ${hairline}`} style={softShadow}>
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <ImageWithFallback src={images.human} alt="Human Centered Loyalty" className="w-full h-full object-cover" />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center gap-6 bg-white">
              <Eyebrow>Human Centered Loyalty Marketing</Eyebrow>
              <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>
                Loyalty beyond<br /><span className="text-[#F8AE01]">rewards.</span>
              </h2>
              <p className="text-black tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                We believe loyalty is about understanding your audience's needs and delivering meaningful relationships — not just points and prizes. Our human-centred approach puts real people at the heart of every campaign.
              </p>
              <div>
                <CTA label="Discover Our Services" variant="yellow" onClick={() => go({ page: "services" })} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="px-8 md:px-12 mt-16 relative z-10 mb-32">
        <div className={`rounded-[40px] bg-white ${hairline} p-10 md:p-14`} style={softShadow}>
          <Eyebrow>360° Loyalty International Experience</Eyebrow>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-8 max-w-2xl" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>
            KLR in numbers.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="md:col-span-1 rounded-[32px] p-8 flex flex-col justify-between min-h-[180px]" style={{ background: "#2E2784" }}>
              <div className="text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 0.95 }}>{stats.years}</div>
              <div className="text-white tracking-tight mt-4" style={{ fontSize: "0.85rem" }}>Years of Loyalty Activity</div>
            </div>
            {[{ k: stats.campaigns, v: "Campaigns Delivered" }, { k: stats.retailers, v: "Retail Chains as Clients" }, { k: stats.countries, v: "Countries Operating" }].map((s) => (
              <div key={s.v} className={`rounded-[32px] p-8 flex flex-col justify-between min-h-[180px] bg-white ${hairline}`}>
                <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 800, lineHeight: 0.95 }}>{s.k}</div>
                <div className="text-black tracking-tight mt-4" style={{ fontSize: "0.85rem" }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { k: stats.combinedExperience, v: "Years of Combined Loyalty Experience" },
              { k: stats.people, v: "People in Our Team" },
              { k: stats.nationalities, v: "Nationalities in House" },
            ].map((s) => (
              <div key={s.v} className={`rounded-[32px] p-8 bg-white ${hairline}`}>
                <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 800, lineHeight: 0.95 }}>{s.k}</div>
                <div className="text-black tracking-tight mt-3" style={{ fontSize: "0.85rem" }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <CTA label="Discover More About Us" variant="dark" onClick={() => go({ page: "about" })} />
          </div>
        </div>
      </section>

      {/* INTERNATIONAL PRESENCE */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>International Presence</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          We Are Truly<br /><span className="text-[#F8AE01]">International.</span>
        </h2>
        <div className={`mt-14 relative rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
          <ImageWithFallback src={images.map} alt="KLR European map" className="w-full h-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {locations.map((l) => (
            <div key={l.city} className={`rounded-[24px] p-6 bg-white ${hairline}`}>
              <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{l.country}</div>
              <div className="text-[#2E2784] tracking-[-0.02em] mt-3" style={{ fontSize: "1.1rem", fontWeight: 600 }}>{l.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LOYALTY FRAMEWORK */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>The KLR Loyalty Framework</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Designing<br /><span className="text-[#F8AE01]">Emotional Loyalty.</span>
        </h2>
        <p className="text-black tracking-tight max-w-xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
          Our 3 Pillars of Loyalty — the framework we apply to every campaign.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {loyaltyFramework.map((p, i) => (
            <div key={p.title} className={`rounded-[32px] p-10 ${hairline}`} style={i === 1 ? { background: "#2E2784", ...softShadow } : { ...softShadow, background: "#fff" }}>
              <div className="tracking-[0.25em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{p.n} — {p.title}</div>
              <h3 className={`${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em] mt-6`} style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.05 }}>
                {p.title}.
              </h3>
              <p className={`${i === 1 ? "text-white" : "text-black"} tracking-tight mt-6`} style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CTA label="Explore Our Services" variant="yellow" onClick={() => go({ page: "services" })} />
        </div>
      </section>

      {/* TWO SECTORS */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>Two Sectors. Deep Expertise.</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Born for Grocery & Petrol.<br /><span className="text-[#F8AE01]">Ready for more.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {sectors.map((s, i) => (
            <div key={s.title} className={`rounded-[32px] overflow-hidden relative ${hairline}`} style={softShadow}>
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback src={i === 0 ? images.family : images.petrolCouple} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/85 via-[#2E2784]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{i === 0 ? "01 Grocery" : "02 Petrol"}</div>
                <h3 className="text-white tracking-[-0.03em] mt-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, lineHeight: 1.05 }}>{s.title}</h3>
                <p className="text-white tracking-tight mt-5 max-w-md" style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RETAILER LOGOS */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>The Leading Retailers Who Trust Us</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Trusted across<br /><span className="text-[#F8AE01]">Europe.</span>
        </h2>
        <div className="mt-16">
          <div className="tracking-[0.25em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Grocery</div>
          <div className="flex flex-wrap gap-3">
            {retailers.grocery.map((r) => (
              <span key={r} className={`rounded-full px-5 py-2.5 bg-white text-black tracking-tight ${hairline}`} style={{ fontSize: "0.85rem" }}>{r}</span>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <div className="tracking-[0.25em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Petrol</div>
          <div className="flex flex-wrap gap-3">
            {retailers.petrol.map((r) => (
              <span key={r} className="rounded-full px-5 py-2.5 text-white tracking-tight" style={{ fontSize: "0.85rem", background: "#2E2784" }}>{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* OUR BRANDS */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>Our Brands</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Global brands that<br /><span className="text-[#F8AE01]">power our campaigns.</span>
        </h2>
        <div className="mt-14 grid grid-cols-3 md:grid-cols-6 gap-3">
          {brandPartners.map((b) => (
            <div key={b.name} className={`rounded-[20px] bg-white ${hairline} flex items-center justify-center text-center min-h-[90px] overflow-hidden p-4`}>
              {b.logo ? (
                <img src={b.logo} alt={b.name} className="max-h-12 max-w-full w-auto object-contain" />
              ) : (
                <span className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{b.name}</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CTA label="Discover Our Brand Portfolio" variant="dark" onClick={() => go({ page: "brand" })} />
        </div>
      </section>

      {/* FEATURED CASE STUDY */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>Featured Case Study</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Loyalty campaigns that<br /><span className="text-[#F8AE01]">drive results.</span>
        </h2>
        <button onClick={() => go({ page: "study-detail", id: featuredStudy.id })} className={`mt-14 w-full rounded-[40px] overflow-hidden bg-white ${hairline} text-left group`} style={softShadow}>
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <ImageWithFallback src={featuredStudy.img} alt={featuredStudy.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-between gap-8">
              <div>
                <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>{featuredStudy.client} · {featuredStudy.location}</div>
                <h3 className="text-[#2E2784] tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>{featuredStudy.title}</h3>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{featuredStudy.summary}</p>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5" style={{ fontSize: "0.9rem" }}>Read the full story</span>
                <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all"><ArrowUpRight className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        </button>
        <div className="mt-10">
          <CTA label="See All Case Studies" variant="dark" onClick={() => go({ page: "studies" })} />
        </div>
      </section>

      {/* FEATURED INSIGHT */}
      <section className="px-8 md:px-12 mb-40">
        <Eyebrow>Latest Insights</Eyebrow>
        <button onClick={() => go({ page: "blog-detail", slug: featuredPost.slug })} className={`mt-10 w-full rounded-[40px] overflow-hidden bg-white ${hairline} text-left group`} style={softShadow}>
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-between gap-8 order-2 md:order-1">
              <div>
                <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>{featuredPost.category} · {featuredPost.date}</div>
                <h3 className="text-[#2E2784] tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.05 }}>{featuredPost.title}</h3>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{featuredPost.excerpt}</p>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5" style={{ fontSize: "0.9rem" }}>Read the full story</span>
                <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all"><ArrowUpRight className="w-4 h-4" /></span>
              </div>
            </div>
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden order-1 md:order-2">
              <ImageWithFallback src={featuredPost.img} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
            </div>
          </div>
        </button>
        <div className="mt-10">
          <CTA label="See All Insights" variant="dark" onClick={() => go({ page: "blog" })} />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="px-8 md:px-12 pb-32">
        <div className={`rounded-[40px] p-10 md:p-16 ${hairline}`} style={{ ...softShadow, background: "#2E2784" }}>
          <Eyebrow onDark>Ready to start?</Eyebrow>
          <h2 className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05 }}>
            Ready to design your next<br /><span className="text-white">loyalty experience?</span>
          </h2>
          <p className="text-white tracking-tight mt-8 max-w-2xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
            Let's talk about how we can help your customers come back more often, spend more, and feel great about it.
          </p>
          <div className="mt-12">
            <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
          </div>
        </div>
      </section>
    </div>
  );
}
