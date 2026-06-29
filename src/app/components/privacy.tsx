"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Shield, Database, Cookie, Scale, Clock, UserCheck } from "lucide-react";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { softShadow, hexToRgba } from "./ui-bits";
import type { Route } from "../App";

type PrivacyCms = {
  hero?: Record<string, unknown>;
  company?: Record<string, unknown>;
  cookies?: { intro?: string; manage?: string; typesText?: string };
  legalBasis?: { intro?: string; itemsText?: string };
  methods?: { text?: string };
  storage?: { itemsText?: string };
  rights?: { itemsText?: string };
  closing?: Record<string, unknown>;
};

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa: "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

const dataCategories = [
  {
    label: "1. Voluntarily Provided",
    items: [
      { term: "Contact Data", desc: "First name, last name, address, e-mail address, phone number, pictures, authentication credentials, any further information sent by the Data Subject." },
      { term: "Employment Data", desc: "Data entered in the curriculum vitae, data on spouse or children, social security data, etc." },
    ],
  },
  {
    label: "2. Collected Automatically",
    items: [
      { term: "Technical Data", desc: "IP addresses, browser type, type of Internet provider (ISP), device information. Such data may leave traces which, combined with unique identifiers, can be used to create profiles." },
      { term: "Usage Data", desc: "Pages visited, number of clicks, actions taken, duration of sessions, etc." },
    ],
  },
];

const defaultCookieTypes = [
  { term: "First Party", desc: "Set by the website you're visiting. Only that specific website can read them." },
  { term: "Third Party", desc: "Set by websites other than the one you're visiting. Mainly used for tracking and marketing." },
  { term: "Persistent", desc: "Stored on your computer even after you quit your browser." },
  { term: "Session", desc: "Automatically deleted from your computer immediately after you quit your browser." },
];

const defaultLegalBases = [
  {
    label: "Contract Performance",
    items: ["Fulfillment of any obligation arising from the pre-contractual or contractual relationship.", "Registration and authentication of the Data Subject.", "Support and contact to answer the Data Subject's requests."],
  },
  {
    label: "Legal Obligations",
    items: ["Fulfilment of any obligation provided for by the applicable norms, laws and regulations, in particular on tax and fiscal matters."],
  },
  {
    label: "Legitimate Interest",
    items: ["Marketing purposes by e-mail for products/services similar to those sold.", "Anonymous data based statistics to analyze behaviors and improve products and/or services.", "Interactions with external web platforms or social networks."],
  },
  {
    label: "Consent",
    items: ["Profiling for marketing purposes via automated processing to predict the Data Subject's preferences.", "Retargeting and remarketing to reach the Data Subject with customized advertisements."],
  },
];

const defaultRights = [
  "Be informed about the processing of their Personal Data",
  "Withdraw consent at any time",
  "Restrict the processing of Personal Data",
  "Object to the processing of Personal Data",
  "Access their Personal Data",
  "Verify and request the rectification of Personal Data",
  "Obtain the erasure of Personal Data",
  "Transfer Personal Data to another data controller",
  "File a complaint with the Personal Data protection supervisory authority",
  "Take legal action",
];

const defaultStorageItems = [
  { term: "Contract", desc: "Entire duration of the contractual relationship + 10 years ordinary prescription period." },
  { term: "Legal Disputes", desc: "Entire duration of disputes, until the time limit for appeals has expired." },
  { term: "Legal Obligations", desc: "Relevant timeframes provided by applicable obligations, regulations, and laws." },
  { term: "Consent-based", desc: "Until the consent is revoked by the Data Subject." },
];

function parseKeyValueLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [key, ...rest] = line.split("|");
      return { term: key.trim(), desc: rest.join("|").trim() };
    });
}

function parseListLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function Privacy({ go }: { go?: (r: Route) => void }) {
  const [cms, setCms] = useState<PrivacyCms>({});

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { if (d?.data?.privacy) setCms(d.data.privacy as PrivacyCms); })
      .catch(() => {});
  }, []);

  const hero    = cms.hero    || {};
  const company = cms.company || {};
  const cookies = cms.cookies || {};
  const legalBasis = cms.legalBasis || {};
  const methods = cms.methods || {};
  const storage = cms.storage || {};
  const rights = cms.rights || {};
  const closing = cms.closing || {};
  const visible = (s: Record<string, unknown>) => s._visible !== false;

  const heroTitleLine1 = String(hero.titleLine1 || "Privacy");
  const heroTitleLine2 = String(hero.titleLine2 || "Policy.");
  const heroSubtitle   = String(hero.subtitle || "At KLR Europe, we believe privacy is important. We want you to be aware of the data we collect, how we use it, and with whom we share it.");
  const heroImage      = String(hero.image || "");
  const heroBgColor    = String(hero.bgColor  || "#2E2784");
  const heroBgAccent   = String(hero.bgAccent || "#F8AE01");
  const heroBackground = `linear-gradient(135deg, ${hexToRgba(heroBgAccent, 0.55)} 0%, ${hexToRgba(heroBgAccent, 0.25)} 55%, transparent 100%), ${heroBgColor}`;

  const companyName    = String(company.companyName    || "KLR-EVROPA D.O.O.");
  const companyAddress = String(company.companyAddress  || "ULICA 15 MAJA 19");
  const companyCity    = String(company.companyCity     || "6000 · KOPER, SLOVENIA");
  const vatNumber      = String(company.vatNumber       || "SI 80583857");
  const lastUpdate     = String(company.lastUpdate      || "11 / 01 / 2023");
  const companyEmail   = String(company.email           || "info@klr-europe.com");
  const companyTitle   = String(company.title           || "Privacy is\nimportant to us.");
  const paragraph1     = String(company.paragraph1      || "At KLR-EVROPA D.O.O. (\"KLR Europe\"), we believe privacy is important. We want you to be aware about the data that we track and collect, how we use these data and with whom we share them. This privacy policy applies to all personal data we collect in connection with our corporate website, www.klr-europe.com.");
  const paragraph2     = String(company.paragraph2      || "The purpose of this page is to inform the natural person (the \"Data Subject\") about the processing of personal data collected by KLR-EVROPA D.O.O. (the \"Data Controller\") via the website https://klr-europe.com/ (the \"Application\").");
  const paragraph3     = String(company.paragraph3      || "");

  const cookiesIntro   = String(cookies.intro          || "The Application uses cookies, web beacons, univocal identifiers and other similar technologies to collect Personal Data on visited pages and links. This data is stored and then used the next time the Data Subject browses the Application.");
  const cookiesManage  = String(cookies.manage         || "You can refuse or accept performance and marketing cookies through our cookie banner or browser settings at any time. For more info: aboutcookies.org");
  const cookieTypeItems = parseKeyValueLines(String(cookies.typesText || ""));

  const legalBasisIntro = String(legalBasis.intro      || "Personal Data may be processed under several legal bases depending on the purpose of the processing.");
  const legalBasisItems = parseKeyValueLines(String(legalBasis.itemsText || "")).map((item) => ({ label: item.term, items: item.desc ? [item.desc] : [] }));

  const methodsText    = String(methods.text           || "Processing is performed via paper-based and computer tools with methods and logics strictly related to specified purposes, through adoption of appropriate security measures.");

  const storageItems   = parseKeyValueLines(String(storage.itemsText || ""));

  const rightsItems    = parseListLines(String(rights.itemsText || ""));

  const closingEmail = String(closing.email   || "info@klr-europe.com");
  const closingHref  = String(closing.ctaHref || "/contact");

  return (
    <>
      {visible(hero) && <PageHero
        eyebrow={String(hero.eyebrow || "Legal")}
        title={<>{heroTitleLine1}<br /><span className="text-[#F8AE01]">{heroTitleLine2}</span></>}
        subtitle={heroSubtitle}
        image={heroImage || undefined}
        background={heroBackground}
      />}

      {/* INTRO & COMPANY — yellow */}
      {visible(company) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
              {/* Company card */}
              <div>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Data Controller</div>
                <div
                  className="mt-6 rounded-[28px] p-8 border border-[#2E2784]/15"
                  style={{ background: "#2E2784", ...softShadow }}
                >
                  <div className="text-[#F8AE01] tracking-[0.2em] uppercase mb-4" style={{ fontSize: "0.62rem", fontWeight: 800 }}>{companyName}</div>
                  <div className="text-white space-y-1" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                    <p>{companyAddress}</p>
                    <p>{companyCity}</p>
                    <p className="text-white/60 mt-3" style={{ fontSize: "0.8rem" }}>Tax Code / VAT No.</p>
                    <p className="text-[#F8AE01]" style={{ fontWeight: 700 }}>{vatNumber}</p>
                    <a
                      href={`mailto:${companyEmail}`}
                      className="block text-white/80 hover:text-white transition-colors mt-4 border-t border-white/15 pt-4"
                      style={{ fontSize: "0.88rem" }}
                    >
                      {companyEmail}
                    </a>
                  </div>
                </div>

                <div className="mt-5 rounded-[20px] p-6 border border-[#2E2784]/15" style={{ background: "rgba(255,255,255,0.35)", ...softShadow }}>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-2" style={{ fontSize: "0.6rem", fontWeight: 700 }}>Last Update</div>
                  <div className="text-[#2E2784]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{lastUpdate}</div>
                </div>
              </div>

              {/* Intro text */}
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.0, fontWeight: 800, whiteSpace: "pre-line" }}>
                  {companyTitle}
                </h2>
                <div className="mt-8 space-y-5 text-[#2E2784]" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", lineHeight: 1.7 }}>
                  <p>{paragraph1}</p>
                  <p>{paragraph2}</p>
                </div>
                <div className="mt-8 rounded-[20px] p-6 border border-[#2E2784]/20" style={{ background: "rgba(255,255,255,0.4)", ...softShadow }}>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-3" style={{ fontSize: "0.6rem", fontWeight: 700 }}>Changes and Updates</div>
                  <p className="text-[#2E2784]" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                    Changes and updates will be effective as soon as they are published on the Application. In case of non-acceptance of the changes, the Data Subject shall stop using this Application and may ask the Data Controller to delete his/her Personal Data.
                  </p>
                </div>

                <div className="mt-5 rounded-[20px] p-6 border border-[#2E2784]/15" style={{ background: "rgba(255,255,255,0.35)", ...softShadow }}>
                  <div className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-3" style={{ fontSize: "0.6rem", fontWeight: 700 }}>Applicability and Scope</div>
                  <p className="text-[#2E2784]" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                    The Privacy Statement is applicable to all <strong>consumers, clients, suppliers, visitors, contractors</strong> and other business relations of KLR Europe.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* CATEGORIES OF DATA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0">
                <Database className="w-4 h-4 text-[#2E2784]" />
              </div>
              <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Categories of Personal Data</div>
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-2 max-w-3xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
              What data<br /><span className="text-[#F8AE01]">we process.</span>
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-6">
              {dataCategories.map((cat) => (
                <div key={cat.label} className="rounded-[28px] p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}>
                  <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 800 }}>
                    {cat.label}
                  </div>
                  <div className="mt-6 space-y-5">
                    {cat.items.map((item) => (
                      <div key={item.term} className="border-t border-white/10 pt-5">
                        <div className="text-white" style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.4rem" }}>{item.term}</div>
                        <p className="text-white/65" style={{ fontSize: "0.85rem", lineHeight: 1.65 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[20px] p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <p className="text-white/50" style={{ fontSize: "0.82rem", lineHeight: 1.65, fontStyle: "italic" }}>
                If the Data Subject decides not to provide Personal Data for which there is a legal or contractual obligation, it will be impossible for the Data Controller to establish or continue any relationship with the Data Subject.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* COOKIES — rosa */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2E2784] flex items-center justify-center flex-shrink-0">
                <Cookie className="w-4 h-4 text-[#F8AE01]" />
              </div>
              <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Cookies and Similar Technologies</div>
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-2" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
              How we use<br /><span className="text-[#2E2784]">cookies.</span>
            </h2>

            <p className="text-[#2E2784] mt-8 max-w-3xl" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", lineHeight: 1.7 }}>
              The Application uses cookies, web beacons, univocal identifiers and other similar technologies to collect Personal Data on visited pages and links. This data is stored and then used the next time the Data Subject browses the Application.
            </p>

            <div className="mt-14 grid md:grid-cols-2 gap-6">
              {/* What are cookies */}
              <div className="rounded-[28px] p-8 border border-[#2E2784]/15 md:col-span-2" style={{ background: "#2E2784", ...softShadow }}>
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 800 }}>What are cookies?</div>
                <p className="text-white/80 mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {cookiesIntro}
                </p>
              </div>

              {/* Cookie types */}
              {(cookieTypeItems.length ? cookieTypeItems : defaultCookieTypes).map((c) => (
                <div key={c.term} className="rounded-[20px] p-7 border border-[#2E2784]/15" style={{ background: "rgba(255,255,255,0.4)", ...softShadow }}>
                  <div className="text-[#2E2784]" style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.5rem" }}>{c.term}</div>
                  <p className="text-[#2E2784]/70" style={{ fontSize: "0.85rem", lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            {/* How to manage */}
            <div className="mt-6 rounded-[28px] p-8 border border-[#2E2784]/15" style={{ background: "rgba(255,255,255,0.35)", ...softShadow }}>
              <div className="tracking-[0.2em] uppercase text-[#2E2784]/60 mb-4" style={{ fontSize: "0.62rem", fontWeight: 700 }}>How to Manage Cookies</div>
              <div className="grid md:grid-cols-2 gap-6 text-[#2E2784]" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                <p><strong>Delete cookies:</strong> You can delete cookies by clearing your browsing history. Note that deleting cookies may cause loss of some valuable information (login details, site preferences, etc.).</p>
                <p><strong>Manage or block cookies:</strong> {cookiesManage}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* LEGAL BASIS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/10 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0">
                <Scale className="w-4 h-4 text-[#2E2784]" />
              </div>
              <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Legal Basis and Purpose</div>
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-2" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", lineHeight: 1.0, fontWeight: 800 }}>
              Why we process<br /><span className="text-[#F8AE01]">your data.</span>
            </h2>

            <p className="text-white/70 mt-8 max-w-3xl" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>{legalBasisIntro}</p>
            <div className="mt-14 grid md:grid-cols-2 gap-5">
              {(legalBasisItems.length ? legalBasisItems : defaultLegalBases).map((basis, i) => (
                <div key={basis.label} className="rounded-[28px] p-8 border border-white/10" style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.09)" : "rgba(248,174,1,0.08)", borderColor: i % 2 === 0 ? "rgba(255,255,255,0.1)" : "rgba(248,174,1,0.2)", ...softShadow }}>
                  <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 800 }}>
                    {basis.label}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {basis.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/75" style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                        <span className="text-[#F8AE01] mt-1 flex-shrink-0">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[20px] p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-white/50" style={{ fontSize: "0.82rem", lineHeight: 1.65, fontStyle: "italic" }}>
                Personal Data may also be used by the Data Controller to protect itself in judicial proceedings before the competent courts.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* METHODS + STORAGE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -right-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Methods */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#2E2784] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#F8AE01]" />
                  </div>
                  <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Processing Methods</div>
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mt-2" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  How we handle<br />your data.
                </h2>
                <p className="text-[#2E2784] mt-6" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {methodsText}
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Persons authorized by the Data Controller committed to confidentiality.",
                    "Separate data controllers or processors — business partners, consultants, IT companies, hosting providers.",
                    "Bodies to whom it is mandatory to communicate data by law or order of authorities.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-[16px] p-5 border border-[#2E2784]/15" style={{ background: "rgba(255,255,255,0.35)" }}>
                      <span className="text-[#2E2784] font-black mt-0.5 flex-shrink-0">›</span>
                      <p className="text-[#2E2784]" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[#2E2784] text-sm font-bold italic">Personal Data will not be indiscriminately shared in any way.</p>
              </div>

              {/* Storage */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#2E2784] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#F8AE01]" />
                  </div>
                  <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Storage Period</div>
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mt-2" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  How long we<br />keep it.
                </h2>

                <div className="mt-6 rounded-[28px] overflow-hidden border border-[#2E2784]/15" style={{ background: "#2E2784", ...softShadow }}>
                  {(storageItems.length ? storageItems : defaultStorageItems).map((item, i) => (
                    <div key={item.term} className={`p-6 flex gap-4 ${i > 0 ? "border-t border-white/10" : ""}`}>
                      <div className="text-[#F8AE01] w-28 flex-shrink-0" style={{ fontSize: "0.8rem", fontWeight: 800 }}>{item.term}</div>
                      <p className="text-white/75" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  ))}
                  <div className="px-6 py-4 border-t border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <p className="text-white/70" style={{ fontSize: "0.75rem", lineHeight: 1.6, fontStyle: "italic" }}>
                      At the end of the conservation period, all Personal Data will be deleted or stored in a form that does not allow identification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* RIGHTS + CONTACT — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Rights */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-4 h-4 text-[#2E2784]" />
                  </div>
                  <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>Rights of the Data Subject</div>
                </div>
                <h2 className="text-white tracking-[-0.035em] mt-2" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.0, fontWeight: 800 }}>
                  Your rights,<br /><span className="text-[#F8AE01]">always.</span>
                </h2>

                <div className="mt-10 space-y-2">
                  {(rightsItems.length ? rightsItems : defaultRights).map((right, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-white/10">
                      <span
                        className="w-6 h-6 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ fontSize: "0.58rem", fontWeight: 800, color: "#2E2784" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-white/80" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{right}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-5">
                <div className="rounded-[28px] p-8 border border-[#F8AE01]/30" style={{ background: "rgba(248,174,1,0.08)", ...softShadow }}>
                  <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Exercise your rights</div>
                  <h3 className="text-white tracking-[-0.02em] mt-4" style={{ fontSize: "1.4rem", fontWeight: 800, lineHeight: 1.2 }}>
                    Get in touch with<br />our team
                  </h3>
                  <p className="text-white/70 mt-4" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>
                    To exercise any of your rights, send a request to our dedicated email address. Requests will be immediately treated and processed within 30 days.
                  </p>

                  <a
                    href={`mailto:${closingEmail}`}
                    className="mt-8 flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F8AE01] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-[#2E2784]" />
                    </div>
                    <span
                      className="text-white group-hover:text-[#F8AE01] transition-colors"
                      style={{ fontSize: "1.05rem", fontWeight: 700 }}
                    >
                      {closingEmail}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#F8AE01] transition-colors" />
                  </a>
                </div>

                <Link
                  href={closingHref}
                  onClick={() => go?.({ page: "contact" })}
                  className="w-full rounded-[28px] p-8 border border-white/10 text-left group transition-all hover:border-[#F8AE01]/30 block"
                  style={{ background: "rgba(255,255,255,0.07)", ...softShadow }}
                >
                  <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Contact Us</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-white group-hover:text-[#F8AE01] transition-colors" style={{ fontSize: "1rem", fontWeight: 700 }}>
                      Visit our Contact page
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#F8AE01] transition-colors" />
                  </div>
                </Link>
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
