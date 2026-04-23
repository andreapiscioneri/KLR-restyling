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

export function Privacy() {
  return (
    <div className="bg-white">
      {/* 1. HERO */}
      <PageHero
        eyebrow="Legal"
        title={<>Privacy<br /><span className="text-[#F8AE01]">Policy.</span></>}
        subtitle="At KLR Europe, we believe privacy is important. Learn how we track, collect, and protect your personal data."
        image={images.contacts}
      />

      {/* 2. INTRO & COMPANY DETAILS (Yellow) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-[1fr_2fr] gap-10">
              <div>
                <h2 className="tracking-[0.14em] uppercase text-[#2E2784]" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}>
                  Privacy Policy<br />of KLR Europe
                </h2>
                <div className="mt-8 space-y-2 text-[#2E2784] font-medium" style={{ fontSize: "0.9rem" }}>
                  <p><strong>KLR-EVROPA D.O.O.</strong></p>
                  <p>ULICA 15 MAJA 19</p>
                  <p>6000 - KOPER, SLOVENIA</p>
                  <p>Tax Code/VAT No. SI 80583857</p>
                  <p className="pt-4">Contact email: <a href="mailto:info@klr-europe.com" className="underline">info@klr-europe.com</a></p>
                </div>
              </div>
              <div className="text-[#2E2784]" style={{ fontSize: "clamp(1rem, 1.4vw, 1.35rem)", lineHeight: 1.6 }}>
                <p>
                  At KLR-EVROPA D.O.O. (“KLR Europe”), we believe privacy is important. We want you to be aware about the data that we track and collect, how we use these data and with whom we share them. This privacy policy applies to all personal data we collect in connection with our corporate website, www.klr-europe.com.
                </p>
                <p className="mt-6 italic text-sm">
                  The purpose of this page is to inform the natural person (hereinafter “Data Subject”) about the processing of his/her personal data (hereinafter “Personal Data”) collected by the data controller, KLR-EVROPA D.O.O. (hereinafter “Data Controller”), via the website https://klr-europe.com/ (hereinafter “Application”).
                </p>
                <div className="mt-10 p-6 bg-white/30 rounded-2xl border border-[#2E2784]/10">
                  <h4 className="font-bold uppercase text-xs mb-2">Changes and updates</h4>
                  <p className="text-sm">Changes and updates will be effective as soon as they are published on the Application. In case of non-acceptance of the changes, the Data Subject shall stop using this Application and may ask the Data Controller to delete his/her Personal Data.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. APPLICABILITY & CATEGORIES (Blue) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="tracking-[0.14em] uppercase text-[#F8AE01] mb-12" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)" }}>
              Applicability<br />and Scope
            </h2>
            <p className="text-white/90 mb-16 max-w-3xl" style={{ fontSize: "1.2rem" }}>
              The Privacy Statement is applicable to all consumers, clients, suppliers, visitors, contractors and other business relations of KLR Europe.
            </p>
            
            <h3 className="text-[#F8AE01] tracking-[0.14em] uppercase mb-8" style={{ fontSize: "1.5rem" }}>Categories of Personal Data processed</h3>
            <div className="grid md:grid-cols-2 gap-16 text-white/90">
              <div className="space-y-6">
                <h4 className="text-[#F8AE01] uppercase tracking-widest font-bold text-sm">1. Voluntarily Provided</h4>
                <ul className="space-y-4 text-sm opacity-80 border-l border-white/20 pl-6">
                  <li><strong>Contact Data:</strong> first name, last name, address, e-mail address, phone number, pictures, authentication credentials, etc.</li>
                  <li><strong>Employment relationship:</strong> data entered in the curriculum vitae, data on spouse or children, social security data, etc.</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[#F8AE01] uppercase tracking-widest font-bold text-sm">2. Collected Automatically</h4>
                <ul className="space-y-4 text-sm opacity-80 border-l border-white/20 pl-6">
                  <li><strong>Technical Data:</strong> Personal Data produced by devices, applications, tools and protocols such as IP addresses, browser type, ISP. Such data may leave traces which can be used to create profiles.</li>
                  <li><strong>Usage Data:</strong> pages visited, number of clicks, actions taken, duration of sessions, etc.</li>
                </ul>
              </div>
            </div>
            <p className="mt-12 text-xs text-white/50 italic max-w-4xl">
              If the Data Subject decides not to provide Personal Data for which there is a legal or contractual obligation, it will be impossible for the Data Controller to establish or continue any relationship.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. COOKIES (Yellow) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="tracking-[0.14em] uppercase text-[#2E2784] mb-10" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)" }}>
              Cookies and similar<br />technologies
            </h2>
            <div className="space-y-6 text-[#2E2784]" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
              <p>The Application uses cookies, web beacons, univocal identifiers and other similar technologies to collect the Data Subject's Personal Data on visited pages and links. This data is stored and then used the next time the interested party browses the Application.</p>
              
              {/* Snippet modificato */}
<div className="grid sm:grid-cols-2 gap-8 mt-12">
  <div className="p-8 bg-[#2E2784] text-white rounded-[40px] shadow-xl border border-white/10">
    <h4 className="text-[#F8AE01] font-bold uppercase text-xs tracking-widest mb-4">What are cookies?</h4>
    <p className="text-sm opacity-80 leading-relaxed">
      Cookies are small text files stored on a user's computer. They are designed to hold a modest amount of data specific to a particular user and website, allowing the server to deliver a tailored experience.
    </p>
  </div>
  <div className="p-8 bg-[#2E2784] text-white rounded-[40px] shadow-xl border border-white/10">
    <h4 className="text-[#F8AE01] font-bold uppercase text-xs tracking-widest mb-4">How to manage cookies?</h4>
    <p className="text-sm opacity-80 leading-relaxed">
      You can regulate the processing of functional, analytical, performance and marketing cookies yourself. You have the option to refuse or accept cookies through our banner or browser settings.
    </p>
  </div>
</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                <div className="text-center p-4">
                  <span className="block font-bold text-[#2E2784]">First Party</span>
                  <span className="text-xs opacity-60">Set by us</span>
                </div>
                <div className="text-center p-4">
                  <span className="block font-bold text-[#2E2784]">Third Party</span>
                  <span className="text-xs opacity-60">Set by others</span>
                </div>
                <div className="text-center p-4">
                  <span className="block font-bold text-[#2E2784]">Persistent</span>
                  <span className="text-xs opacity-60">Remain stored</span>
                </div>
                <div className="text-center p-4">
                  <span className="block font-bold text-[#2E2784]">Session</span>
                  <span className="text-xs opacity-60">Temporary</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. LEGAL BASIS & PURPOSE (Blue) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="tracking-[0.14em] uppercase text-[#F8AE01] mb-12" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)" }}>
              Legal basis and purpose<br />of data processing
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-white/90">
              <div className="space-y-8">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-[#F8AE01] font-bold uppercase text-xs mb-4 tracking-widest">a. Contract Performance</h4>
                  <ul className="text-sm space-y-3 opacity-80">
                    <li>• Fulfillment of pre-contractual or contractual relationship.</li>
                    <li>• Registration and authentication of the Data Subject.</li>
                    <li>• Support and contact to answer requests.</li>
                  </ul>
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-[#F8AE01] font-bold uppercase text-xs mb-4 tracking-widest">b. Legal Obligations</h4>
                  <p className="text-sm opacity-80">Fulfillment of any obligation provided for by the applicable norms, laws and regulations, in particular on tax and fiscal matters.</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-[#F8AE01] font-bold uppercase text-xs mb-4 tracking-widest">c. Legitimate Interest</h4>
                  <ul className="text-sm space-y-3 opacity-80">
                    <li>• Marketing purposes for products/services similar to those sold.</li>
                    <li>• Anonymous data based statistics for behaviors analysis.</li>
                    <li>• Interaction with external web platforms or social networks.</li>
                  </ul>
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <h4 className="text-[#F8AE01] font-bold uppercase text-xs mb-4 tracking-widest">d. Consent based</h4>
                  <ul className="text-sm space-y-3 opacity-80">
                    <li>• Profiling for marketing: automated processing to predict preferences.</li>
                    <li>• Retargeting and remarketing via Network Advertising Initiative.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-white/60 text-xs italic">
                Personal Data may also be used by the Data Controller to protect itself in judicial proceedings before the competent courts.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. METHODS, RECEIVERS & STORAGE (Yellow) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="tracking-[0.14em] uppercase text-[#2E2784] mb-8" style={{ fontSize: "2rem" }}>
                  Data processing methods<br />and receivers
                </h2>
                <div className="space-y-6 text-[#2E2784] text-sm leading-relaxed">
                  <p>Processing is performed via paper-based and computer tools with logics strictly related to specified purposes and through adoption of appropriate security measures.</p>
                  <p><strong>Personal Data are processed exclusively by:</strong></p>
                  <ul className="space-y-3 pl-4 border-l border-[#2E2784]/20">
                    <li>• Persons authorized by the Data Controller committed to confidentiality.</li>
                    <li>• Separate data controllers or processors (business partners, consultants, IT companies, hosting providers).</li>
                    <li>• Bodies to whom it is mandatory to communicate data by law or order of authorities.</li>
                  </ul>
                  <p className="font-bold italic mt-4">Personal Data will not be indiscriminately shared in any way.</p>
                </div>
              </div>
              
              <div className="bg-[#2E2784] text-white p-10 rounded-[40px] shadow-xl">
                <h2 className="tracking-[0.14em] uppercase text-[#F8AE01] mb-6" style={{ fontSize: "1.8rem" }}>
                  Storage period
                </h2>
                <div className="space-y-6 text-sm opacity-90">
                  <p>Data will be stored for the period required to fulfill the purposes:</p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-[#F8AE01] font-bold">Contract:</span>
                      <span>Entire duration of the relationship + 10 years prescription period.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#F8AE01] font-bold">Disputes:</span>
                      <span>Entire duration of disputes until time limit for appeals has expired.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#F8AE01] font-bold">Legal:</span>
                      <span>Relevant timeframes provided by law and regulations.</span>
                    </li>
                  </ul>
                  <p className="pt-4 border-t border-white/10 text-xs opacity-60">At the end of the conservation period, data will be deleted or anonymized.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 7. RIGHTS & CONTACT (Blue) */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-[1.5fr_1fr] gap-16">
              <div>
                <h2 className="tracking-[0.14em] uppercase text-[#F8AE01] mb-10" style={{ fontSize: "2.4rem" }}>
                  Rights of the<br />Data Subject
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 text-white/80 text-sm">
                  <ul className="space-y-3">
                    <li>• Be informed about processing.</li>
                    <li>• Withdraw consent at any time.</li>
                    <li>• Restrict processing of Personal Data.</li>
                    <li>• Object to the processing.</li>
                    <li>• Access personal data.</li>
                  </ul>
                  <ul className="space-y-3">
                    <li>• Verify and request rectification.</li>
                    <li>• Obtain the erasure of data.</li>
                    <li>• Transfer data to another controller.</li>
                    <li>• File a complaint with authorities.</li>
                    <li>• Take legal action.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#F8AE01] text-[#2E2784] p-10 rounded-[40px] flex flex-col justify-center">
                <h3 className="uppercase tracking-widest font-bold text-sm mb-4">Exercise your rights</h3>
                <p className="text-sm mb-8 leading-relaxed">To exercise any of your rights, send a request to our dedicated support email:</p>
                <div className="space-y-4">
                  <a href="mailto:info@klr-europe.com" className="group flex items-center gap-3 text-2xl font-bold hover:underline">
                    info@klr-europe.com
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <p className="text-[0.65rem] uppercase tracking-tighter opacity-70">We aim to respond to all legitimate requests within 30 days.</p>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-10 border-t border-white/10 text-center">
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