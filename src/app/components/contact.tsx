"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { offices, images } from "../data";

const gradients = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen pt-40 pb-24 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={images.contacts} alt="KLR Contacts" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2E2784]/65" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-6xl mx-auto px-8 flex flex-col justify-end min-h-[calc(100vh-10rem)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="tracking-[0.3em] uppercase text-[#F8AE01]"
          style={{ fontSize: "0.65rem", fontWeight: 600 }}
        >
          Our Global Network
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          20 Countries
          <br />
          <span className="text-[#F8AE01]">And Growing</span>
        </motion.h1>

        <motion.p
          className="text-white tracking-tight max-w-2xl mt-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          With offices in Slovenia and Italy, we operate across the entire European continent to bring loyalty marketing solutions to our partners.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a
            href="#contact-section"
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
          >
            <span>Get in Touch</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function OurContacts() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <h2 className="text-[#2E2784] tracking-[-0.04em] max-w-4xl" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.95, fontWeight: 800 }}>
            Our Contacts<br />
            <span className="text-black">Headquarters & Offices</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {offices.map((office) => (
              <div key={office.city} className="rounded-[32px] bg-white/90 backdrop-blur-sm border border-white/60 p-10">
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  {office.region}
                </div>
                <h3 className="text-[#2E2784] tracking-[-0.02em] mt-4" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)", fontWeight: 700, lineHeight: 1.2 }}>
                  {office.city}
                </h3>
                <div className="text-black/70 tracking-tight mt-6 whitespace-pre-line" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {office.addr}
                </div>
                <div className="text-black tracking-tight mt-4 font-medium" style={{ fontSize: "0.95rem" }}>
                  {office.phone}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternationalReach() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-white tracking-[0.14em] uppercase" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}>
                10 Years
                <br />
                of International
                <br />
                <span className="text-[#F8AE01]">Experience</span>
              </h2>
              <p className="mt-10 text-white" style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.55rem)", lineHeight: 1.4 }}>
                Since 2015, we've been building trust across European markets. From our Slovenian headquarters in Koper to our Italian sales office in Rovato, we've developed strong partnerships with over 100+ retail clients across 20 countries.
              </p>
              <p className="mt-6 text-white/80" style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.55rem)", lineHeight: 1.4 }}>
                Our international team brings deep local market knowledge combined with a unified vision for loyalty marketing excellence.
              </p>
            </div>
            <div className="rounded-[32px] overflow-hidden border border-white/10">
              <img src={images.map} alt="KLR European presence" className="w-full h-auto" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section id="contact-section" className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <h2 className="text-[#2E2784] tracking-[-0.04em] max-w-4xl" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.95, fontWeight: 800 }}>
            Let's Get Started
            <br />
            <span className="text-black">Something New Together</span>
          </h2>

          <p className="text-black/70 mt-8 max-w-2xl" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
            Fill out the form below and we'll get back to you within one business day. Let's discuss how KLR can support your loyalty marketing goals.
          </p>

          <form className="mt-16 max-w-3xl rounded-[32px] bg-white/95 backdrop-blur-sm border border-white/60 p-10 md:p-16 space-y-8">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="border-b-2 border-[#F8AE01]/20 pb-3">
                <label className="tracking-[0.2em] uppercase text-[#2E2784] block mb-3" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  Full Name *
                </label>
                <input
                  placeholder="Your name"
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-black/30 tracking-tight font-medium"
                  style={{ fontSize: "1rem" }}
                  required
                />
              </div>
              <div className="border-b-2 border-[#F8AE01]/20 pb-3">
                <label className="tracking-[0.2em] uppercase text-[#2E2784] block mb-3" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="your@company.com"
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-black/30 tracking-tight font-medium"
                  style={{ fontSize: "1rem" }}
                  required
                />
              </div>
              <div className="border-b-2 border-[#F8AE01]/20 pb-3">
                <label className="tracking-[0.2em] uppercase text-[#2E2784] block mb-3" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  Company
                </label>
                <input
                  placeholder="Your company"
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-black/30 tracking-tight font-medium"
                  style={{ fontSize: "1rem" }}
                />
              </div>
              <div className="border-b-2 border-[#F8AE01]/20 pb-3">
                <label className="tracking-[0.2em] uppercase text-[#2E2784] block mb-3" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  Job Title
                </label>
                <input
                  placeholder="Your role"
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-black/30 tracking-tight font-medium"
                  style={{ fontSize: "1rem" }}
                />
              </div>
            </div>

            <div className="border-b-2 border-[#F8AE01]/20 pb-3">
              <label className="tracking-[0.2em] uppercase text-[#2E2784] block mb-3" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                Message *
              </label>
              <textarea
                rows={6}
                placeholder="Tell us about your loyalty marketing goals…"
                className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-black/30 tracking-tight resize-none font-medium"
                style={{ fontSize: "1rem" }}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
              >
                <span>Send Message</span>
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

function ClosingCta() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-24 right-20 w-[380px] h-[380px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
                Ready to
                <br />
                discuss your
                <br />
                <span className="text-[#F8AE01]">loyalty strategy?</span>
              </h2>
              <p className="mt-8 text-white/90" style={{ fontSize: "clamp(1.08rem, 1.5vw, 1.7rem)", lineHeight: 1.35 }}>
                Reach out directly and let's explore how we can help you build stronger customer loyalty.
              </p>
            </div>
            <div className="md:text-right">
              <div className="inline-block rounded-[28px] bg-white/90 backdrop-blur-sm border border-white/60 p-10">
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Email us
                </div>
                <a
                  href="mailto:info@klr-europe.com"
                  className="text-[#2E2784] tracking-[-0.02em] mt-4 block hover:text-[#F8AE01] transition-colors font-medium"
                  style={{ fontSize: "1.3rem" }}
                >
                  info@klr-europe.com
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <>
      <ContactHero />
      <OurContacts />
      <InternationalReach />
      <ContactForm />
      <ClosingCta />
    </>
  );
}
