"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { leadership, locations, images, careerValues } from "../data";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "../App";

export function Team({ go }: { go: (r: Route) => void }) {
  return (
    <div className="pt-44 pb-48 max-w-6xl mx-auto px-8">
      {/* HERO */}
      <div className="mb-32">
        <Eyebrow>Team</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          Loyalty starts<br /><span className="text-[#F8AE01]">with us.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.55 }}>
          A 43-person team. 11 nationalities. 10 locations across Europe. One shared passion: designing loyalty experiences that customers feel, trust, and value.
        </p>
      </div>

      {/* GROUP PHOTO */}
      <section className={`relative h-[72vh] min-h-[480px] rounded-[40px] overflow-hidden mb-32 ${hairline}`} style={softShadow}>
        <ImageWithFallback src={images.teamPhoto} alt="KLR team — 10 year anniversary in Franciacorta" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/80 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <div className="text-[#F8AE01] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Driving a 43-person team.
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <div className="mb-40">
        <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
          <Eyebrow>Our Leading People</Eyebrow>
          <div className="text-black tracking-tight" style={{ fontSize: "0.85rem" }}>{leadership.length} leaders</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {leadership.map((p) => (
            <button
              key={p.id}
              onClick={() => go({ page: "team-detail", id: p.id })}
              className={`group rounded-[32px] overflow-hidden bg-white text-left ${hairline}`}
              style={softShadow}
            >
              <div className="aspect-[4/5] overflow-hidden" style={{ background: "#F8AE01" }}>
                <ImageWithFallback src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1500ms]" />
              </div>
              <div className="p-7 flex items-end justify-between gap-4">
                <div>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.65rem" }}>{p.role}</div>
                  <div className="text-[#2E2784] tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2 }}>{p.name}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* INTERNATIONAL PRESENCE */}
      <section className="mb-40">
        <Eyebrow>We Are Truly International</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          10 locations<br /><span className="text-[#F8AE01]">across Europe.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-14">
          {locations.map((l, i) => (
            <div key={l.city} className={`rounded-[24px] p-6 ${hairline}`} style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
              <div className={`tracking-[0.2em] uppercase ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#F8AE01]"}`} style={{ fontSize: "0.65rem" }}>{l.country}</div>
              <div className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-white"} tracking-[-0.02em] mt-3`} style={{ fontSize: "1.1rem", fontWeight: 700 }}>{l.city}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section className="grid md:grid-cols-2 gap-6 md:gap-8 mb-32">
        <div className={`rounded-[32px] overflow-hidden ${hairline} relative aspect-[4/5] md:aspect-auto md:h-[560px] group`} style={softShadow}>
          <ImageWithFallback src={images.teamwork} alt="Teamwork culture" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Teamwork is our natural language.
          </div>
        </div>
        <div className={`rounded-[32px] overflow-hidden ${hairline} relative aspect-[4/5] md:aspect-auto md:h-[560px] group`} style={softShadow}>
          <ImageWithFallback src={images.human} alt="Human centered" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Human-centered, by design.
          </div>
        </div>
      </section>

      {/* CULTURE VALUES */}
      <section className="mb-32">
        <Eyebrow>Our Culture</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          What it's like<br /><span className="text-[#F8AE01]">to work at KLR.</span>
        </h2>
        <p className="text-black tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
          KLR is more than a company — it's a family of open-minded professionals from different cultures and backgrounds. We give people freedom to contribute, support to grow, and recognition for the value they bring.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {careerValues.map((v) => (
            <div key={v.title} className={`rounded-[32px] p-10 bg-white ${hairline}`} style={softShadow}>
              <h3 className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>{v.title}</h3>
              <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.55 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDING PRINCIPLE */}
      <section className="mb-32">
        <div className={`rounded-[40px] p-12 md:p-20 ${hairline}`} style={{ background: "#2E2784", ...softShadow }}>
          <Eyebrow onDark>Guiding Principle</Eyebrow>
          <h2 className="text-[#F8AE01] tracking-[-0.04em] mt-10" style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 800, lineHeight: 0.95 }}>
            People First.<br />Team Second.<br /><span className="text-white">Happy Clients and Customers Always.</span>
          </h2>
          <p className="text-white tracking-tight mt-10 max-w-2xl" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
            Because when people are valued, teams become stronger — and stronger teams create better results.
          </p>
        </div>
      </section>

      {/* JOIN US */}
      <section className="mb-32">
        <Eyebrow>Join Our Team</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          Want to work<br /><span className="text-[#F8AE01]">with us?</span>
        </h2>
        <p className="text-black tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
          We're always interested in meeting talented people who share our passion for loyalty and teamwork.
        </p>

        <form className={`mt-14 rounded-[40px] p-10 md:p-14 ${hairline} grid md:grid-cols-2 gap-x-8 gap-y-6`} style={{ background: "#2E2784", ...softShadow }}>
          {[{ p: "Full name" }, { p: "Email" }, { p: "Role of interest / Open application" }, { p: "CV upload (drag & drop)" }].map((f) => (
            <div key={f.p} className="border-b border-white/20 pb-4">
              <input placeholder={f.p} className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight" style={{ fontSize: "1rem" }} />
            </div>
          ))}
          <div className="border-b border-white/20 pb-4 md:col-span-2">
            <textarea rows={4} placeholder="Short message" className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight resize-none" style={{ fontSize: "1rem" }} />
          </div>
          <div className="md:col-span-2 mt-4">
            <button type="button" className="inline-flex items-center gap-3 rounded-full bg-[#F8AE01] text-black pl-5 pr-2 py-2 hover:bg-white transition-all" style={{ fontSize: "0.9rem" }}>
              <span>Send application</span>
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center"><ArrowUpRight className="w-4 h-4" /></span>
            </button>
          </div>
        </form>
      </section>

      {/* CLOSING CTA */}
      <section className="flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Don't see your role? Get in touch anyway.
        </h3>
        <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
