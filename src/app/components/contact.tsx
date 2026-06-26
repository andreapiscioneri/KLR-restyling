"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { softShadow, openMailtoDraft } from "./ui-bits";
import { PageHero } from "./page-hero";
import { offices, images } from "../data";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa: "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

const officeLabels: Record<number, { label: string; city: string; country: string }> = {
  0: { label: "Headquarter", city: "Koper", country: "Slovenia" },
  1: { label: "Sales Office", city: "Rovato", country: "Italy" },
};

type ContactCmsData = {
  hero?: { eyebrow?: string; title?: string; subtitle?: string; image?: string };
  form?: { eyebrow?: string; title?: string };
  nextSteps?: { eyebrow?: string; title?: string; step1Title?: string; step1Desc?: string; step2Title?: string; step2Desc?: string; step3Title?: string; step3Desc?: string };
  offices?: { eyebrow?: string; title?: string; emailNote?: string };
};

function ContactFormSection({ cms }: { cms: ContactCmsData }) {
  const eyebrow = cms.form?.eyebrow || "Contact Form";
  const title = cms.form?.title || "Let's Start Something New Together";
  return (
    <section id="contact-form" className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4 max-w-3xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
            {title.includes("New Together") ? (
              <>{title.replace("New Together", "").trim()}<br /><span style={{ fontStyle: "italic" }}>New Together</span></>
            ) : title}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              openMailtoDraft(e.currentTarget, "info@klr-europe.com", "KLR Contact Form");
            }}
            className="mt-14 rounded-[40px] p-6 md:p-14 border border-[#2E2784]/10 grid md:grid-cols-2 gap-x-8 gap-y-8"
            style={{ background: "rgba(255,255,255,0.3)", ...softShadow }}
          >

            {/* Full Name */}
            <div className="border-b border-[#2E2784]/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#2E2784]/60 block mb-2" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Full Name *
              </label>
              <input
                name="name"
                placeholder="Your full name"
                required
                className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/40 tracking-tight font-medium"
                style={{ fontSize: "1rem" }}
              />
            </div>

            {/* Email */}
            <div className="border-b border-[#2E2784]/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#2E2784]/60 block mb-2" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@company.com"
                required
                className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/40 tracking-tight font-medium"
                style={{ fontSize: "1rem" }}
              />
            </div>

            {/* Company */}
            <div className="border-b border-[#2E2784]/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#2E2784]/60 block mb-2" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Company Name
              </label>
              <input
                name="company"
                placeholder="Your company"
                className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/40 tracking-tight font-medium"
                style={{ fontSize: "1rem" }}
              />
            </div>

            {/* Job Title */}
            <div className="border-b border-[#2E2784]/20 pb-4">
              <label className="tracking-[0.2em] uppercase text-[#2E2784]/60 block mb-2" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Job Title
              </label>
              <input
                name="job_title"
                placeholder="Your role"
                className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/40 tracking-tight font-medium"
                style={{ fontSize: "1rem" }}
              />
            </div>

            {/* Message */}
            <div className="border-b border-[#2E2784]/20 pb-4 md:col-span-2">
              <label className="tracking-[0.2em] uppercase text-[#2E2784]/60 block mb-2" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Your Message *
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your campaign, idea, or question…"
                required
                className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/40 tracking-tight font-medium resize-none"
                style={{ fontSize: "1rem" }}
              />
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
              >
                <span style={{ fontWeight: 700 }}>Send Message</span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}

function WhatHappensNext({ cms }: { cms: ContactCmsData }) {
  const ns = cms.nextSteps;
  const eyebrow = ns?.eyebrow || "What Happens Next";
  const title = ns?.title || "Simple steps, real results";
  const nextSteps = [
    { n: "01", title: ns?.step1Title || "We review your message", desc: ns?.step1Desc || "Our team reads every inquiry carefully and responds within one business day." },
    { n: "02", title: ns?.step2Title || "Discovery call", desc: ns?.step2Desc || "If there's a fit, we schedule a short call to understand your goals and context." },
    { n: "03", title: ns?.step3Title || "Tailored proposal", desc: ns?.step3Desc || "From there, we propose an approach designed specifically for your campaign and market." },
  ];
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
      <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-white tracking-[-0.035em] mt-4 max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
            {title.includes(",") ? (
              <>{title.split(",")[0]},<br /><span className="text-[#F8AE01]">{title.split(",").slice(1).join(",").trim()}</span></>
            ) : title}
          </h2>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {nextSteps.map((step) => (
              <div
                key={step.n}
                className="rounded-[28px] p-7 border border-white/12"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)", ...softShadow }}
              >
                <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center mb-5">
                  <span className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.7rem", fontWeight: 800 }}>{step.n}</span>
                </div>
                <h3 className="text-white tracking-[-0.02em]" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="text-white/70 tracking-tight mt-3" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Offices({ cms }: { cms: ContactCmsData }) {
  const off = cms.offices;
  const eyebrow = off?.eyebrow || "Offices";
  const title = off?.title || "Find Us";
  const emailNote = off?.emailNote || "— for any inquiry, from anywhere in Europe";
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
      <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
            {eyebrow}
          </div>
          <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
            {title}
          </h2>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {offices.map((office, i) => {
              const meta = officeLabels[i];
              return (
                <div
                  key={office.city}
                  className="rounded-[28px] p-7 md:p-10 border border-[#2E2784]/15"
                  style={{ background: "#2E2784", ...softShadow }}
                >
                  <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                    {meta.label}
                  </div>
                  <h3 className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                    {meta.city}
                    <span className="text-white/50 ml-2" style={{ fontSize: "1rem", fontWeight: 500 }}>{meta.country}</span>
                  </h3>

                  <div className="mt-7 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#F8AE01] flex-shrink-0 mt-0.5" />
                      <p className="text-white/80 tracking-tight whitespace-pre-line" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                        {office.addr}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#F8AE01] flex-shrink-0" />
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="text-white/80 hover:text-white transition-colors tracking-tight"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Global email */}
          <div className="mt-8 rounded-[28px] p-7 border border-[#2E2784]/15 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: "rgba(255,255,255,0.3)", ...softShadow }}>
            <Mail className="w-5 h-5 text-[#2E2784] flex-shrink-0" />
            <a
              href="mailto:info@klr-europe.com"
              className="text-[#2E2784] hover:text-black transition-colors tracking-tight"
              style={{ fontSize: "1.1rem", fontWeight: 700 }}
            >
              info@klr-europe.com
            </a>
            <span className="text-[#2E2784]/50 tracking-tight sm:ml-2" style={{ fontSize: "0.85rem" }}>
              {emailNote}
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function Contact() {
  const [cms, setCms] = useState<ContactCmsData>({});

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(j => { if (j.data?.contact) setCms(j.data.contact); })
      .catch(() => {});
  }, []);

  const heroEyebrow = cms.hero?.eyebrow || "Contact";
  const heroTitle = cms.hero?.title || "Keep in Touch!";
  const heroSubtitle = cms.hero?.subtitle || "Whether you're ready to launch a campaign, exploring ideas, looking for a brand partnership, or simply curious — we'd love to hear from you.";
  const heroImage = cms.hero?.image || images.contacts;
  const visible = (section?: Record<string, string>) => (section as Record<string, unknown> | undefined)?._visible !== false;

  return (
    <>
      {visible(cms.hero) && <PageHero
        eyebrow={heroEyebrow}
        title={heroTitle.endsWith("!") ? <>{heroTitle.slice(0, -1)}<span className="text-[#F8AE01]">!</span></> : <>{heroTitle}</>}
        subtitle={heroSubtitle}
        image={heroImage}
        cta={{ label: "Get in Touch", href: "#contact-form" }}
      />}
      {visible(cms.form) && <ContactFormSection cms={cms} />}
      {visible(cms.nextSteps) && <WhatHappensNext cms={cms} />}
      {visible(cms.offices) && <Offices cms={cms} />}
    </>
  );
}
