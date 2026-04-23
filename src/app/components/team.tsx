"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { leadership, locations, images, careerValues } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Team({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title={<>Loyalty starts<br /><span className="text-[#F8AE01]">with us.</span></>}
        subtitle="A 43-person team. 11 nationalities. 10 locations across Europe. One shared passion: designing loyalty experiences that customers feel, trust, and value."
        image={images.teamPhoto}
        cta={{ label: "Join the Team", href: "/career" }}
      />

      {/* LEADERSHIP — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
              <Eyebrow>Our Leading People</Eyebrow>
              <div className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.85rem" }}>{leadership.length} leaders</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {leadership.map((p) => (
                <button
                  key={p.id}
                  onClick={() => go({ page: "team-detail", id: p.id })}
                  className="group rounded-[32px] overflow-hidden bg-white text-left border border-black/5"
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
          </AnimatedSection>
        </div>
      </section>

      {/* INTERNATIONAL PRESENCE — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>We Are Truly International</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              10 locations<br /><span className="text-[#F8AE01]">across Europe.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 md:mt-14">
              {locations.map((l, i) => (
                <div key={l.city} className="rounded-[24px] p-4 md:p-6 border border-white/10" style={i % 2 === 0 ? { background: "rgba(255,255,255,0.07)", ...softShadow } : { background: "#F8AE01", ...softShadow }}>
                  <div className={`tracking-[0.2em] uppercase ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"}`} style={{ fontSize: "0.65rem" }}>{l.country}</div>
                  <div className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-[-0.02em] mt-3`} style={{ fontSize: "1.1rem", fontWeight: 700 }}>{l.city}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CULTURE PHOTOS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="rounded-[32px] overflow-hidden border border-black/5 relative aspect-[4/5] md:aspect-auto md:h-[420px] lg:h-[560px] group" style={softShadow}>
                <ImageWithFallback src={images.teamwork} alt="Teamwork culture" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  Teamwork is our natural language.
                </div>
              </div>
              <div className="rounded-[32px] overflow-hidden border border-black/5 relative aspect-[4/5] md:aspect-auto md:h-[420px] lg:h-[560px] group" style={softShadow}>
                <ImageWithFallback src={images.human} alt="Human centered" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  Human-centered, by design.
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CULTURE VALUES — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Our Culture</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              What it's like<br /><span className="text-[#F8AE01]">to work at KLR.</span>
            </h2>
            <p className="text-white/80 tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              KLR is more than a company — it's a family of open-minded professionals from different cultures and backgrounds. We give people freedom to contribute, support to grow, and recognition for the value they bring.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8 md:mt-14">
              {careerValues.map((v, i) => (
                <div key={v.title} className="rounded-[32px] p-6 md:p-10 border border-white/10" style={i === 1 ? { background: "#F8AE01", ...softShadow } : { background: "rgba(255,255,255,0.07)", ...softShadow }}>
                  <h3 className={`${i === 1 ? "text-[#2E2784]" : "text-[#F8AE01]"} tracking-[-0.03em]`} style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>{v.title}</h3>
                  <p className={`${i === 1 ? "text-[#2E2784]" : "text-white/80"} tracking-tight mt-6`} style={{ fontSize: "1rem", lineHeight: 1.55 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GUIDING PRINCIPLE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] p-7 md:p-20 border border-black/5" style={{ background: "#2E2784", ...softShadow }}>
              <Eyebrow onDark>Guiding Principle</Eyebrow>
              <h2 className="text-[#F8AE01] tracking-[-0.04em] mt-10" style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 800, lineHeight: 0.95 }}>
                People First.<br />Team Second.<br /><span className="text-white">Happy Clients and Customers Always.</span>
              </h2>
              <p className="text-white tracking-tight mt-10 max-w-2xl" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
                Because when people are valued, teams become stronger — and stronger teams create better results.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* JOIN US — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Join Our Team</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Want to work<br /><span className="text-[#F8AE01]">with us?</span>
            </h2>
            <p className="text-white/80 tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              We're always interested in meeting talented people who share our passion for loyalty and teamwork.
            </p>

            <form className="mt-14 rounded-[40px] p-6 md:p-14 border border-white/10 grid md:grid-cols-2 gap-x-8 gap-y-6" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
              {[{ p: "Full name" }, { p: "Email" }, { p: "Role of interest / Open application" }, { p: "CV upload (drag & drop)" }].map((f) => (
                <div key={f.p} className="border-b border-white/20 pb-4">
                  <input placeholder={f.p} className="w-full bg-transparent outline-none text-white placeholder:text-white/50 tracking-tight" style={{ fontSize: "1rem" }} />
                </div>
              ))}
              <div className="border-b border-white/20 pb-4 md:col-span-2">
                <textarea rows={4} placeholder="Short message" className="w-full bg-transparent outline-none text-white placeholder:text-white/50 tracking-tight resize-none" style={{ fontSize: "1rem" }} />
              </div>
              <div className="md:col-span-2 mt-4">
                <CTA label="Send application" variant="yellow" />
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
                Don't see your role? Get in touch anyway.
              </h3>
              <CTA label="Keep in Touch!" variant="dark" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
