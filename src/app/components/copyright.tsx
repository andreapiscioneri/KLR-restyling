"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { images } from "../data";

const gradients = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Copyright() {
  return (
    <div className="bg-white">
      {/* 1. HERO — Invariata come richiesto */}
      <PageHero
        eyebrow="Legal"
        title={<>Copyright &<br /><span className="text-[#F8AE01]">Terms of Use.</span></>}
        subtitle="All content, brands, and materials on this site are the exclusive property of KLR-EVROPA d.o.o."
        image={images.teamwork}
      />

      {/* 2. APPLICABILITY (Yellow) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-[1fr_2fr] gap-10">
              <div>
                <h2 className="tracking-[0.14em] uppercase text-[#2E2784]" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}>
                  Copyright and<br />General<br />Conditions
                </h2>
                <p className="mt-6 text-[#2E2784]/60 font-mono text-sm uppercase tracking-widest">
                  Last updated: January 12, 2023
                </p>
              </div>
              <div className="text-[#2E2784]" style={{ fontSize: "clamp(1rem, 1.4vw, 1.35rem)", lineHeight: 1.6 }}>
                <h3 className="tracking-[0.1em] uppercase font-bold mb-4">Applicability</h3>
                <p>
                  These conditions apply to all persons who visit the website of KLR Europe (KLR-EVROPA D.O.O.) and to all information and services that can be consulted on or via this Website.
                </p>
                <p className="mt-6">
                  Please read these conditions carefully. When accessing and using this Website you agree to be bound to these conditions and all applicable laws and regulations. If you do not agree, please do not access or use this site. We may change these conditions at any time with immediate effect.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. INTERPRETATION & DEFINITIONS (Blue) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="tracking-[0.14em] uppercase text-[#F8AE01] mb-12" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)" }}>
              Interpretation<br />and Definitions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 text-white/90">
              <div>
                <h3 className="text-[#F8AE01] uppercase tracking-widest mb-4 font-bold">Interpretation</h3>
                <p>Words with capitalized initial letters have meanings defined under the following conditions. These definitions apply regardless of whether they appear in singular or plural.</p>
              </div>
              <div className="space-y-6">
                <h3 className="text-[#F8AE01] uppercase tracking-widest mb-4 font-bold">Definitions</h3>
                <ul className="space-y-4 text-sm opacity-80">
                  <li><strong>Affiliate:</strong> An entity that controls, is controlled by or is under common control with a party.</li>
                  <li><strong>Company:</strong> KLR Evropa d.o.o., ULICA 15 MAJA 19, 6000 Koper, Slovenia.</li>
                  <li><strong>Device:</strong> Any device that can access the Service (computer, cellphone, tablet).</li>
                  <li><strong>Service / Website:</strong> Refers to the Website accessible from https://klr-europe.com.</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. INTELLECTUAL PROPERTY (Yellow) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h2 className="tracking-[0.14em] uppercase text-[#2E2784] mb-10" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)" }}>
                Intellectual Property
              </h2>
              <div className="space-y-6 text-[#2E2784]" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
                <p>The Service and its original content, features and functionality are and will remain the exclusive property of the Company and its licensors and partners.</p>
                <div className="bg-[#2E2784] text-white p-8 md:p-12 rounded-[40px] shadow-xl">
                  <p className="font-bold mb-4">All text, images, brands, logo's, software or information in any other form are the exclusive property of KLR Europe.</p>
                  <p className="text-sm opacity-80">Without the written permission of KLR Europe, users are not permitted to change, revise, publish, reproduce, duplicate, distribute or create deep links to any part of this Website.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. LINKS, TERMINATION & LIABILITY (Blue) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div>
                  <h2 className="text-[#F8AE01] uppercase tracking-[0.14em] mb-6" style={{ fontSize: "2rem" }}>Links to Other Websites</h2>
                  <p className="text-white/80 leading-relaxed">Our Service may contain links to third-party web sites. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</p>
                </div>
                <div>
                  <h2 className="text-[#F8AE01] uppercase tracking-[0.14em] mb-6" style={{ fontSize: "2rem" }}>Termination</h2>
                  <p className="text-white/80 leading-relaxed">We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-10 rounded-[40px]">
                <h2 className="text-[#F8AE01] uppercase tracking-[0.14em] mb-6" style={{ fontSize: "2rem" }}>Limitation of Liability</h2>
                <p className="text-white/90 text-sm leading-relaxed mb-6">To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages (including loss of profits, data, or business interruption).</p>
                <p className="text-white/60 text-xs italic">Some states do not allow the exclusion of implied warranties, which means some of the above limitations may not apply.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. DISCLAIMER & GOVERNING LAW (Yellow) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
              <div className="bg-[#2E2784] text-white p-10 rounded-[40px]">
                <h2 className="text-[#F8AE01] uppercase tracking-widest mb-4 font-bold text-sm">Disclaimer</h2>
                <p className="text-2xl font-bold italic mb-4">"AS IS" and "AS AVAILABLE"</p>
                <p className="text-xs opacity-70 leading-relaxed">The Service is provided to You with all faults and defects without warranty of any kind. The Company disclaims all warranties, whether express, implied, or statutory, including all implied warranties of merchantability and fitness for a particular purpose.</p>
              </div>
              <div className="text-[#2E2784] space-y-8">
                <div>
                  <h2 className="uppercase tracking-[0.14em] font-bold text-2xl mb-4">Governing Law</h2>
                  <p>The laws of Slovenia, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold uppercase mb-2">Disputes Resolution</h4>
                    <p>If You have any concern, You agree to first try to resolve the dispute informally by contacting the Company.</p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase mb-2">EU/US Compliance</h4>
                    <p>EU users benefit from mandatory local provisions. US users represent they are not in embargoed or prohibited countries.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 7. FINAL PROVISIONS & CONTACT (white) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16 pb-16 border-b border-[#2E2784]/10">
              <div className="space-y-8 text-[#2E2784]/80">
                <div>
                  <h3 className="text-[#F8AE01] font-bold uppercase tracking-widest text-sm mb-2">Severability and Waiver</h3>
                  <p className="text-xs leading-relaxed">If any provision is held unenforceable, the remaining provisions continue in full force. Failure to exercise a right does not affect the ability to exercise it thereafter.</p>
                </div>
                <div>
                  <h3 className="text-[#F8AE01] font-bold uppercase tracking-widest text-sm mb-2">Changes to These Terms</h3>
                  <p className="text-xs leading-relaxed">We reserve the right to modify these Terms at any time. For material changes, we will provide at least 30 days' notice.</p>
                </div>
              </div>
              
              <div className="bg-[#F8AE01] text-[#2E2784] p-10 rounded-[40px]">
                <h2 className="uppercase tracking-[0.14em] font-bold text-3xl mb-6">Contact Us</h2>
                <p className="mb-8 font-medium">If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-[0.7rem] uppercase tracking-widest opacity-70 font-bold">By email:</span>
                    <a href="mailto:info@klr-europe.com" className="text-xl font-bold hover:underline">info@klr-europe.com</a>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-[0.7rem] uppercase tracking-widest opacity-70 font-bold">By visiting our website:</span>
                    <Link href="/contacts" className="text-xl font-bold hover:underline flex items-center gap-2">
                      klr-europe.com/contacts <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-[#F8AE01] tracking-[0.4em] uppercase font-bold text-[0.7rem]">
                Copyright © 2026 KLR-EVROPA d.o.o. • All rights reserved
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}