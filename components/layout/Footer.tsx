"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { openCookiePreferences } from "@/components/layout/CookieConsent";

type FooterLink = { href: string; label: string };

type FooterCms = {
  tagline?: string;
  description?: string;
  companyDesc?: string;
  copyright?: string;
  hqTitle?: string;
  hq1?: string;
  hq2?: string;
  email?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  exploreLinks?: FooterLink[];
  moreLinks?: FooterLink[];
};

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

const defaultExplore = [
  { href: "/",          label: "Home",     indent: false },
  { href: "/about",     label: "About",    indent: false },
  { href: "/10-years",  label: "10 Years", indent: true  },
  { href: "/services",  label: "Services", indent: false },
  { href: "/brands",    label: "Brands",   indent: false },
];
const defaultMore = [
  { href: "/work",     label: "Case Studies" },
  { href: "/blog",     label: "Insights" },
  { href: "/team",     label: "Team" },
  { href: "/contact",  label: "Contact" },
];

const glassCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
};

type FooterProps = {
  initialData?: FooterCms;
  logoUrl?: string;
};

export function Footer({ initialData, logoUrl }: FooterProps = {}) {
  const pathname = usePathname();
  const cms = initialData || {};

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const tagline = cms.tagline || "We Design Emotional Loyalty.";
  const taglineWords = tagline.split(" ");
  const taglineStart = taglineWords.slice(0, -2).join(" ");
  const taglineEnd = taglineWords.slice(-2).join(" ");
  const description = cms.description || "human centred loyalty marketing — transforming customer engagement into lasting loyalty across Europe and beyond.";
  const companyDesc = cms.companyDesc || "KLR-EVROPA d.o.o. — Loyalty campaign design and full-cycle execution for grocery and petrol retailers across 20+ European markets.";
  const copyright = cms.copyright || "© 2026 KLR-EVROPA d.o.o.";
  const hqTitle = cms.hqTitle || "Headquarters";
  const hq1 = (cms.hq1 || "Ulica 15. Maja 19 / SI-6000 Koper/Capodistria / +386 5 902 87 58").split(" / ");
  const hq2 = (cms.hq2 || "Via XXV Aprile 66 / 25038 Rovato (BS), Italy / +39 030 52 81 427").split(" / ");
  const email = cms.email || "info@klr-europe.com";
  const linkedinUrl = cms.linkedinUrl || "https://www.linkedin.com/company/klr-key-to-loyalty-in-retail/";
  const youtubeUrl = cms.youtubeUrl || "https://www.youtube.com/@klreurope";
  const explore = cms.exploreLinks?.length ? cms.exploreLinks.map(l => ({ ...l, indent: false })) : defaultExplore;
  const more = cms.moreLinks?.length ? cms.moreLinks : defaultMore;

  return (
    <footer className="relative overflow-hidden" style={{ background: "#06051C" }}>

      {/* Decorative gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", left: "-8%",
          width: 560, height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(248,174,1,0.18) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", right: "-10%",
          width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,39,132,0.55) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%", left: "35%",
          width: 320, height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,104,250,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-8">

        {/* ── Tagline ── */}
        <div className="mb-16">
          <Link href="/" className="inline-block mb-8">
            <Image src={logoUrl || "/klr-logo.png"} alt="KLR Europe" width={130} height={44} className="h-9 w-auto" />
          </Link>
          <h2
            className="text-white tracking-[-0.04em] leading-none"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)", fontWeight: 800 }}
          >
            {taglineStart ? <>{taglineStart}<br /></> : null}
            <span style={{ color: "#F8AE01", textShadow: "0 0 60px rgba(248,174,1,0.35)" }}>
              {taglineEnd}
            </span>
          </h2>
          <p className="text-white/45 tracking-tight mt-5 max-w-sm text-[0.9rem] leading-relaxed">
            {description}
          </p>
        </div>

        {/* ── Columns ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Socials + desc */}
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="text-white/40 tracking-tight text-[0.88rem] leading-relaxed max-w-xs">
              {companyDesc}
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-105"
                style={{ ...glassCard, color: "rgba(255,255,255,0.55)" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-105"
                style={{ ...glassCard, color: "rgba(255,255,255,0.55)" }}
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <div className="tracking-[0.22em] uppercase text-[#F8AE01]/70 mb-5 text-[0.63rem]">Explore</div>
            <ul className="space-y-3.5">
              {explore.map((e) => (
                <li key={e.href} className={e.indent ? "pl-3" : ""}>
                  <Link
                    href={e.href}
                    className={`hover:text-[#F8AE01] transition-colors tracking-tight ${e.indent ? "text-white/35 text-[0.82rem]" : "text-white/55 text-[0.9rem]"}`}
                  >
                    {e.indent && <span className="mr-1.5 text-[#F8AE01]/30">—</span>}{e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <div className="tracking-[0.22em] uppercase text-[#F8AE01]/70 mb-5 text-[0.63rem]">Pages</div>
            <ul className="space-y-3.5">
              {more.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-white/55 hover:text-[#F8AE01] transition-colors tracking-tight text-[0.9rem]"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="tracking-[0.22em] uppercase text-[#F8AE01]/70 mb-5 text-[0.63rem]">{hqTitle}</div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#F8AE01]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/55 tracking-tight text-[0.88rem] leading-relaxed">
                    {hq1[0]}<br />
                    {hq1[1]}<br />
                    <span className="text-white/35">{hq1[2]}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#F8AE01]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/55 tracking-tight text-[0.88rem] leading-relaxed">
                    {hq2[0]}<br />
                    {hq2[1]}<br />
                    <span className="text-white/35">{hq2[2]}</span>
                  </p>
                </div>
              </div>

              <a
                href={`mailto:${email}`}
                className="text-[#F8AE01]/80 hover:text-[#F8AE01] tracking-tight block transition-colors text-[0.88rem]"
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex items-center justify-between text-[#F8AE01]/50 tracking-tight pt-8 flex-wrap gap-4 text-[0.78rem]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span>{copyright}</span>
          <div className="flex items-center gap-4">
            <Link href="/copyright" className="text-[#F8AE01]/70 hover:text-[#F8AE01] transition-colors">Copyright</Link>
            <span className="text-[#F8AE01]/20">·</span>
            <Link href="/privacy" className="text-[#F8AE01]/70 hover:text-[#F8AE01] transition-colors">Privacy Policy</Link>
            <span className="text-[#F8AE01]/20">·</span>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="text-[#F8AE01]/70 hover:text-[#F8AE01] transition-colors"
            >
              Cookie Preferences
            </button>
          </div>
        </div>

        </div>
      </div>
    </footer>
  );
}
