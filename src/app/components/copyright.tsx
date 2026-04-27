"use client";

import { ArrowUpRight, Mail, ExternalLink } from "lucide-react";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { softShadow } from "./ui-bits";
import { images } from "../data";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const definitions = [
  { term: "Affiliate", def: "An entity that controls, is controlled by or is under common control with a party, where \"control\" means ownership of 50% or more of the shares, equity interest or other securities." },
  { term: "Country", def: "Refers to: Slovenia." },
  { term: "Company", def: "KLR Evropa d.o.o., ULICA 15 MAJA 19, 6000 Koper, Slovenia. Referred to as \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement." },
  { term: "Device", def: "Any device that can access the Service such as a computer, a cellphone or a digital tablet." },
  { term: "Service", def: "Refers to the Website." },
  { term: "Terms and Conditions", def: "These Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service." },
  { term: "Third-party Social Media Service", def: "Any services or content provided by a third-party that may be displayed, included or made available by the Service." },
  { term: "Website", def: "KLR Europe, accessible from https://klr-europe.com." },
  { term: "You", def: "The individual accessing or using the Service, or the company on behalf of which such individual is accessing or using the Service." },
];

export function Copyright({ go }: { go?: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Copyright &amp;<br /><span className="text-[#F8AE01]">Terms of Use.</span></>}
        subtitle="All content, brands, and materials on this site are the exclusive property of KLR-EVROPA d.o.o. Please read these terms carefully before using our service."
        image={images.teamwork}
      />

      {/* APPLICABILITY — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="inline-flex items-center gap-3 mb-10 px-4 py-2 rounded-full border border-[#2E2784]/20" style={{ background: "rgba(255,255,255,0.35)" }}>
              <span className="tracking-[0.25em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Last updated</span>
              <span className="text-[#2E2784]" style={{ fontSize: "0.85rem", fontWeight: 700 }}>January 12, 2023</span>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  Copyright &amp;<br />General<br />Conditions
                </h2>
              </div>
              <div className="space-y-6 text-[#2E2784]" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", lineHeight: 1.7 }}>
                <h3 className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-2" style={{ fontSize: "0.65rem", fontWeight: 700 }}>Applicability</h3>
                <p>These conditions apply to all persons who visit the website of KLR Europe (KLR-EVROPA D.O.O.) and to all information and services that can be consulted on or via this Website.</p>
                <p>Please read these conditions carefully. When accessing and using this Website you agree to be bound to these conditions and all applicable laws and regulations within the jurisdiction from which you are accessing this Website. Please do not access or use this site if you do not agree to these conditions. We may change these conditions at any time. This will take immediate effect.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DEFINITIONS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Interpretation and Definitions
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4 max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
              Key terms,<br /><span className="text-[#F8AE01]">clearly defined.</span>
            </h2>
            <p className="text-white/70 tracking-tight mt-6 max-w-2xl" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
              Words with capitalized initial letters have meanings defined under the following conditions. These definitions apply regardless of whether they appear in singular or in plural.
            </p>

            <div className="mt-14 grid md:grid-cols-2 gap-4">
              {definitions.map((d) => (
                <div
                  key={d.term}
                  className="rounded-[20px] p-6 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}
                >
                  <div className="text-[#F8AE01] tracking-[0.2em] uppercase mb-2" style={{ fontSize: "0.62rem", fontWeight: 800 }}>
                    {d.term}
                  </div>
                  <p className="text-white/80 tracking-tight" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {d.def}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ACKNOWLEDGMENT + INTELLECTUAL PROPERTY — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Acknowledgment */}
              <div>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Acknowledgment</div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  Your agreement<br />to these terms.
                </h2>
                <div className="mt-8 space-y-5 text-[#2E2784]" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  <p>These Terms and Conditions govern the use of this Service and the agreement that operates between You and the Company. They set out the rights and obligations of all users regarding the use of the Service.</p>
                  <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part, You may not access the Service.</p>
                  <p>Your access is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company, which describes Our policies on the collection, use and disclosure of Your personal information.</p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Intellectual Property</div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  Protected by<br />law.
                </h2>
                <div
                  className="mt-8 rounded-[28px] p-8 border border-[#2E2784]/15"
                  style={{ background: "#2E2784", ...softShadow }}
                >
                  <p className="text-white" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                    All text, images, brands, logos, software or information in any other form are the <strong className="text-[#F8AE01]">exclusive property of KLR Europe</strong>.
                  </p>
                  <p className="text-white/70 mt-4" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                    Without the written permission of KLR Europe, users are not permitted to change, revise, publish, reproduce, duplicate, distribute or make available to third parties all or part of this Website, or to create a link, hypertext link or deep link between this Website and another site.
                  </p>
                  <p className="text-white/70 mt-4" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                    Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* LINKS + TERMINATION + LIABILITY — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/10 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Links */}
              <div className="rounded-[28px] p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Links to Other Websites</div>
                <h3 className="text-white tracking-[-0.02em] mt-4" style={{ fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.2 }}>Third-party links</h3>
                <p className="text-white/70 mt-4" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                  Our Service may contain links to third-party web sites. KLR Europe is not responsible or liable for the content and operation of these websites. The Company has no control over and assumes no responsibility for their content, privacy policies, or practices.
                </p>
                <p className="text-white/50 mt-4" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
                  We strongly advise You to read the terms and privacy policies of any third-party web sites that You visit.
                </p>
              </div>

              {/* Termination */}
              <div className="rounded-[28px] p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Termination</div>
                <h3 className="text-white tracking-[-0.02em] mt-4" style={{ fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.2 }}>Access suspension</h3>
                <p className="text-white/70 mt-4" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                  We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>
                <p className="text-white/70 mt-4" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                  Upon termination, Your right to use the Service will cease immediately.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="rounded-[28px] p-8 border border-[#F8AE01]/30" style={{ background: "rgba(248,174,1,0.08)", ...softShadow }}>
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Limitation of Liability</div>
                <h3 className="text-white tracking-[-0.02em] mt-4" style={{ fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.2 }}>Maximum extent permitted</h3>
                <p className="text-white/70 mt-4" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                  In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever — including loss of profits, loss of data or business interruption.
                </p>
                <p className="text-white/50 mt-4" style={{ fontSize: "0.82rem", lineHeight: 1.6, fontStyle: "italic" }}>
                  Some states do not allow these exclusions, which means some limitations may not apply.
                </p>
              </div>
            </div>

            {/* AS IS Disclaimer */}
            <div className="mt-6 rounded-[28px] p-8 md:p-10 border border-white/10" style={{ background: "rgba(255,255,255,0.05)", ...softShadow }}>
              <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Disclaimer</div>
              <h3 className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                "AS IS" and "AS AVAILABLE"
              </h3>
              <div className="mt-5 grid md:grid-cols-2 gap-6 text-white/70" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. The Company expressly disclaims all warranties, whether express, implied, statutory or otherwise, including all implied warranties of merchantability and fitness for a particular purpose.</p>
                <p>Neither the Company nor any provider makes any representation or warranty: (i) as to the operation or availability of the Service; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy or reliability of any information provided; or (iv) that the Service is free of viruses or other harmful components.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GOVERNING LAW + MISCELLANEOUS — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -right-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Governing Law &amp; Miscellaneous
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
              Your rights,<br /><span className="text-[#2E2784]">our responsibilities.</span>
            </h2>

            <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Governing Law",
                  body: "The laws of Slovenia, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use may also be subject to other local, state, national, or international laws.",
                },
                {
                  title: "Disputes Resolution",
                  body: "If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.",
                },
                {
                  title: "For EU Users",
                  body: "If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.",
                },
                {
                  title: "United States Legal Compliance",
                  body: "You represent and warrant that You are not located in a country subject to the United States government embargo, and that You are not listed on any US government list of prohibited or restricted parties.",
                },
                {
                  title: "Severability & Waiver",
                  body: "If any provision of these Terms is held unenforceable, the remaining provisions continue in full force. Failure to exercise a right does not affect the ability to exercise it thereafter.",
                },
                {
                  title: "Changes to Terms",
                  body: "We reserve the right to modify these Terms at any time. For material changes, we will make reasonable efforts to provide at least 30 days' notice. Continued use constitutes acceptance.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[20px] p-7 border border-[#2E2784]/15"
                  style={{ background: "rgba(255,255,255,0.35)", ...softShadow }}
                >
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-3" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                    {item.title}
                  </div>
                  <p className="text-[#2E2784]" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[20px] p-7 border border-[#2E2784]/15" style={{ background: "rgba(255,255,255,0.35)", ...softShadow }}>
              <div className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-3" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Translation Interpretation
              </div>
              <p className="text-[#2E2784]" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Contact Us</div>
                <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  Have a question<br />about these terms?
                </h2>
                <p className="text-white/70 tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                  If you have any questions about these Terms and Conditions, we're happy to help. Reach out to us directly and we'll respond within one business day.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:info@klr-europe.com"
                  className="flex items-center gap-4 rounded-[20px] p-7 border border-white/10 group transition-all hover:border-[#F8AE01]/40"
                  style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#2E2784]" />
                  </div>
                  <div>
                    <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.6rem", fontWeight: 700 }}>By email</div>
                    <div className="text-white group-hover:text-[#F8AE01] transition-colors" style={{ fontSize: "1rem", fontWeight: 700 }}>info@klr-europe.com</div>
                  </div>
                </a>

                <button
                  onClick={() => go?.({ page: "contact" })}
                  className="w-full flex items-center gap-4 rounded-[20px] p-7 border border-white/10 group transition-all hover:border-[#F8AE01]/40 text-left"
                  style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-4 h-4 text-[#2E2784]" />
                  </div>
                  <div className="flex-1">
                    <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.6rem", fontWeight: 700 }}>By visiting our website</div>
                    <div className="text-white group-hover:text-[#F8AE01] transition-colors" style={{ fontSize: "1rem", fontWeight: 700 }}>klr-europe.com/contacts</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#F8AE01] transition-colors" />
                </button>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <p className="text-white/40 tracking-[0.3em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                Copyright © 2026 KLR-EVROPA d.o.o. · All rights reserved
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
