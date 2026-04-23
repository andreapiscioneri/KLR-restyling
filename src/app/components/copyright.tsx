"use client";
import { Eyebrow, softShadow } from "./ui-bits";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { images } from "../data";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

export function Copyright() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Copyright &<br /><span className="text-[#F8AE01]">Terms of Use.</span></>}
        subtitle="All content, brands, and materials on this site are the exclusive property of KLR-EVROPA d.o.o."
        image={images.teamwork}
      />

      {/* CONTENT — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-4xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Terms of Use</Eyebrow>
            <div className="mt-14 rounded-[40px] p-10 md:p-14 bg-white border border-black/5" style={softShadow}>
              <p className="text-black tracking-tight mb-2" style={{ fontSize: "0.8rem", opacity: 0.5 }}>Last updated: January 12, 2023</p>

              <div className="mt-8 space-y-6" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
                <div>
                  <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Company Details</h2>
                  <p className="text-black tracking-tight">
                    <strong>KLR-EVROPA d.o.o.</strong><br />
                    Ulica 15. Maja 19, 6000 Koper, Slovenia<br />
                    <a href="mailto:info@klr-europe.com" className="text-[#2E2784] hover:text-[#2E2784]/70 transition-colors">info@klr-europe.com</a><br />
                    <a href="https://klr-europe.com" className="text-[#2E2784] hover:text-[#2E2784]/70 transition-colors">www.klr-europe.com</a>
                  </p>
                </div>

                <div>
                  <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Intellectual Property</h2>
                  <p className="text-black tracking-tight">
                    All text, images, brands, logos, software or information in any other form are the exclusive property of KLR Europe. Any reproduction, distribution, or use of these materials without explicit written permission is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Disclaimer</h2>
                  <p className="text-black tracking-tight">
                    The service is offered "AS IS" and "AS AVAILABLE" with limited warranties regarding functionality, reliability, or error-free operation. KLR Europe disclaims responsibility for damages from website use, including inaccurate information, outdated content, or technical malfunctions.
                  </p>
                </div>

                <div>
                  <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Third-Party Links</h2>
                  <p className="text-black tracking-tight">
                    KLR Europe is not responsible or liable for the content and operation of websites that are linked but not controlled by the company.
                  </p>
                </div>

                <div>
                  <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Governing Law</h2>
                  <p className="text-black tracking-tight">
                    Slovenian law applies to these terms and website usage. The company reserves the right to suspend access immediately for any breach without advance notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Changes to Terms</h2>
                  <p className="text-black tracking-tight">
                    Material modifications to terms will receive 30 days' notice when possible, though revisions take effect upon posting.
                  </p>
                </div>

                <div className="pt-6 border-t border-black/10">
                  <p className="text-black tracking-tight" style={{ fontSize: "0.9rem" }}>
                    Copyright © 2026 KLR-EVROPA d.o.o. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
