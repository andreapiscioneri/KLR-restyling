"use client";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, hairline, softShadow } from "./ui-bits";
import { offices, images } from "../data";

export function Contact() {
  return (
    <div className="pt-44 pb-48 max-w-6xl mx-auto px-8">
      {/* HERO */}
      <div className="mb-16">
        <Eyebrow>Contacts</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-4xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          We operate in almost<br /><span className="text-[#F8AE01]">20 Countries.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          We design and deliver marketing campaigns with positive results for retail businesses. 10 years of experience and more than 300 campaigns completed are a guarantee that you can trust us.
        </p>
      </div>

      {/* MAP */}
      <div className={`mb-20 rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
        <ImageWithFallback src={images.map} alt="KLR European presence map" className="w-full h-auto" />
      </div>

      <div className="grid md:grid-cols-12 gap-10">
        {/* FORM */}
        <form className={`md:col-span-7 rounded-[40px] p-10 md:p-14 space-y-6 ${hairline}`} style={{ ...softShadow, background: "#2E2784" }}>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="border-b border-white/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Full Name *</label>
              <input placeholder="Your full name" className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight" style={{ fontSize: "1rem" }} required />
            </div>
            <div className="border-b border-white/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Email *</label>
              <input type="email" placeholder="you@company.com" className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight" style={{ fontSize: "1rem" }} required />
            </div>
            <div className="border-b border-white/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Company</label>
              <input placeholder="Company name" className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight" style={{ fontSize: "1rem" }} />
            </div>
            <div className="border-b border-white/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Job Title</label>
              <input placeholder="Your role" className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight" style={{ fontSize: "1rem" }} />
            </div>
          </div>
          <div className="border-b border-white/20 pb-4">
            <label className="tracking-[0.2em] uppercase text-[#F8AE01] block mb-2" style={{ fontSize: "0.65rem" }}>Your Message *</label>
            <textarea rows={5} placeholder="Tell us what you're working on…" className="w-full bg-transparent outline-none text-white placeholder:text-white tracking-tight resize-none" style={{ fontSize: "1rem" }} required />
          </div>
          <div className="pt-4">
            <button type="button" className="group inline-flex items-center gap-3 rounded-full bg-[#F8AE01] text-black pl-5 pr-2 py-2 hover:bg-white transition-all" style={{ fontSize: "0.95rem" }}>
              <span>Send message</span>
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center"><ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" /></span>
            </button>
          </div>
        </form>

        {/* SIDEBAR */}
        <div className="md:col-span-5 space-y-6">
          <div className={`rounded-[28px] bg-white ${hairline} p-8`} style={softShadow}>
            <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>What Happens Next</div>
            <p className="text-black tracking-tight mt-5" style={{ fontSize: "0.95rem", lineHeight: 1.65 }}>
              We'll review your message and respond within one business day. If there's a fit, we schedule a discovery call. From there, we propose a tailored approach.
            </p>
          </div>
          {offices.map((o) => (
            <div key={o.city} className={`rounded-[28px] bg-white ${hairline} p-8`} style={softShadow}>
              <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{o.region}</div>
              <div className="text-[#2E2784] tracking-[-0.02em] mt-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{o.city}</div>
              <div className="text-black tracking-tight mt-3 whitespace-pre-line" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{o.addr}</div>
              <div className="text-black tracking-tight mt-3" style={{ fontSize: "0.9rem" }}>{o.phone}</div>
            </div>
          ))}
          <div className={`rounded-[28px] bg-white ${hairline} p-8`} style={softShadow}>
            <div className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.7rem" }}>Email</div>
            <a href="mailto:info@klr-europe.com" className="text-[#2E2784] tracking-[-0.02em] mt-4 block hover:text-[#F8AE01] transition-colors" style={{ fontSize: "1.125rem", fontWeight: 600 }}>info@klr-europe.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
