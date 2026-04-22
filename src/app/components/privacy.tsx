"use client";
import { Eyebrow, hairline, softShadow } from "./ui-bits";
import { PageHero } from "./page-hero";
import { images } from "../data";

export function Privacy() {
  return (
    <div className="pb-48">
      <PageHero
        eyebrow="Legal"
        title={<>Privacy<br /><span className="text-[#F8AE01]">Policy.</span></>}
        subtitle="We believe privacy is important. Learn how we collect, use, and protect your data."
        image={images.contacts}
      />
      <div className="max-w-4xl mx-auto px-8">
      <div className={`mt-16 rounded-[40px] p-10 md:p-14 bg-white ${hairline}`} style={softShadow}>
        <p className="text-black tracking-tight mb-2" style={{ fontSize: "0.8rem", opacity: 0.5 }}>Last updated: 11/01/2023</p>

        <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
          We believe privacy is important. We want you to be aware of the data we track and collect, how we use these data, and with whom we share them.
        </p>

        <section className="mt-10 space-y-8" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Company Details</h2>
            <p className="text-black tracking-tight">
              <strong>KLR-EVROPA D.O.O.</strong><br />
              Ulica 15. Maja 19, 6000 Koper, Slovenia<br />
              Tax/VAT No: SI 80583857<br />
              <a href="mailto:info@klr-europe.com" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors">info@klr-europe.com</a><br />
              <a href="https://www.klr-europe.com" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors">www.klr-europe.com</a>
            </p>
          </div>

          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Data We Collect</h2>
            <p className="text-black tracking-tight mb-3"><strong>Voluntarily provided by you:</strong></p>
            <ul className="text-black tracking-tight space-y-1 list-disc pl-6">
              <li>Contact information (name, address, email, phone)</li>
              <li>Employment-related data from CVs</li>
              <li>Family information</li>
            </ul>
            <p className="text-black tracking-tight mt-4 mb-3"><strong>Automatically collected:</strong></p>
            <ul className="text-black tracking-tight space-y-1 list-disc pl-6">
              <li>Technical data (IP addresses, browser type, device information)</li>
              <li>Usage data (pages visited, session duration, clicks)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Cookies & Technologies</h2>
            <p className="text-black tracking-tight">
              The site uses cookies, web beacons, unique identifiers and other similar technologies to collect personal data. Users can delete, manage, or block cookies through browser settings. Visitors who choose to reject or block all cookies may have difficulty navigating and using the website.
            </p>
          </div>

          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Legal Basis for Processing</h2>
            <p className="text-black tracking-tight">
              Processing occurs for contract performance, legal compliance, legitimate business interests, and user consent — including marketing email communications and behavioral profiling.
            </p>
          </div>

          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Your Rights</h2>
            <p className="text-black tracking-tight">
              You may request access, rectification, erasure, or transfer of your data. Send requests to{" "}
              <a href="mailto:info@klr-europe.com" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors">info@klr-europe.com</a>. We respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-[#2E2784] tracking-[-0.02em] mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>Data Retention</h2>
            <p className="text-black tracking-tight">
              Data is stored per contractual duration plus a 10-year prescription period. Consent-based data is retained until revocation.
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
    </div>
  );
}
