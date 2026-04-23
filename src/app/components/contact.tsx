"use client";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { offices, images } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contacts"
        title={<>We operate in almost<br /><span className="text-[#F8AE01]">20 Countries.</span></>}
        subtitle="We design and deliver marketing campaigns with positive results for retail businesses. 10 years of experience and more than 300 campaigns completed."
        image={images.contacts}
      />

      {/* MAP — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Our European Presence</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Where we work<br /><span className="text-black">across the continent.</span>
            </h2>
            <div className="mt-14 rounded-[40px] overflow-hidden border border-black/5" style={softShadow}>
              <ImageWithFallback src={images.map} alt="KLR European presence map" className="w-full h-auto" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FORM + SIDEBAR — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>Get in Touch</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-10 max-w-3xl mb-14" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Let's start<br /><span className="text-[#F8AE01]">something together.</span>
            </h2>
            <div className="grid md:grid-cols-12 gap-10">
              {/* FORM */}
              <form className="md:col-span-7 rounded-[40px] p-6 md:p-14 space-y-6 border border-white/10" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                  <div className="border-b border-white/20 pb-4">
                    <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Full Name *</label>
                    <input placeholder="Your full name" className="w-full bg-transparent outline-none text-white placeholder:text-white/40 tracking-tight" style={{ fontSize: "1rem" }} required />
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Email *</label>
                    <input type="email" placeholder="you@company.com" className="w-full bg-transparent outline-none text-white placeholder:text-white/40 tracking-tight" style={{ fontSize: "1rem" }} required />
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Company</label>
                    <input placeholder="Company name" className="w-full bg-transparent outline-none text-white placeholder:text-white/40 tracking-tight" style={{ fontSize: "1rem" }} />
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Job Title</label>
                    <input placeholder="Your role" className="w-full bg-transparent outline-none text-white placeholder:text-white/40 tracking-tight" style={{ fontSize: "1rem" }} />
                  </div>
                </div>
                <div className="border-b border-white/20 pb-4">
                  <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Your Message *</label>
                  <textarea rows={5} placeholder="Tell us what you're working on…" className="w-full bg-transparent outline-none text-white placeholder:text-white/40 tracking-tight resize-none" style={{ fontSize: "1rem" }} required />
                </div>
                <div className="pt-4">
                  <CTA label="Send message" variant="yellow" />
                </div>
              </form>

              {/* SIDEBAR */}
              <div className="md:col-span-5 space-y-6">
                <div className="rounded-[28px] bg-white border border-white/10 p-8" style={softShadow}>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>What Happens Next</div>
                  <p className="text-black tracking-tight mt-5" style={{ fontSize: "0.95rem", lineHeight: 1.65 }}>
                    We'll review your message and respond within one business day. If there's a fit, we schedule a discovery call. From there, we propose a tailored approach.
                  </p>
                </div>
                {offices.map((o) => (
                  <div key={o.city} className="rounded-[28px] bg-white border border-white/10 p-8" style={softShadow}>
                    <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{o.region}</div>
                    <div className="text-[#2E2784] tracking-[-0.02em] mt-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{o.city}</div>
                    <div className="text-black tracking-tight mt-3 whitespace-pre-line" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{o.addr}</div>
                    <div className="text-black tracking-tight mt-3" style={{ fontSize: "0.9rem" }}>{o.phone}</div>
                  </div>
                ))}
                <div className="rounded-[28px] bg-white border border-white/10 p-8" style={softShadow}>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>Email</div>
                  <a href="mailto:info@klr-europe.com" className="text-[#2E2784] tracking-[-0.02em] mt-4 block hover:text-[#F8AE01] transition-colors" style={{ fontSize: "1.125rem", fontWeight: 600 }}>info@klr-europe.com</a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
