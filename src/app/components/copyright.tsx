"use client";
import { Eyebrow, hairline, softShadow } from "./ui-bits";

export function Copyright() {
  return (
    <div className="pt-44 pb-48 max-w-4xl mx-auto px-8">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="text-[#2E2784] tracking-[-0.04em] mt-10" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, fontWeight: 700 }}>
        Copyright &<br /><span className="text-[#F8AE01]">Terms of Use.</span>
      </h1>

      <div className={`mt-16 rounded-[40px] p-10 md:p-14 bg-white ${hairline}`} style={softShadow}>
        <p className="text-black tracking-tight mb-2" style={{ fontSize: "0.8rem", opacity: 0.5 }}>Last updated: January 12, 2023</p>

        <section className="mt-8 space-y-6" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Company Details</h2>
            <p className="text-black tracking-tight">
              <strong>KLR-EVROPA d.o.o.</strong><br />
              Ulica 15. Maja 19, 6000 Koper, Slovenia<br />
              <a href="mailto:info@klr-europe.com" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors">info@klr-europe.com</a><br />
              <a href="https://klr-europe.com" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors">www.klr-europe.com</a>
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
        </section>
      </div>
    </div>
  );
}
