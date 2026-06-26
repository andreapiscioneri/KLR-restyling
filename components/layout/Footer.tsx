"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const explore = [
  { href: "/",          label: "Home",     indent: false },
  { href: "/about",     label: "About",    indent: false },
  { href: "/10-years",  label: "10 Years", indent: true  },
  { href: "/services",  label: "Services", indent: false },
  { href: "/brands",    label: "Brands",   indent: false },
];
const more = [
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

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

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
            <Image src="/klr-logo.png" alt="KLR Europe" width={130} height={44} className="h-9 w-auto" />
          </Link>
          <h2
            className="text-white tracking-[-0.04em] leading-none"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)", fontWeight: 800 }}
          >
            We Design<br />
            <span style={{ color: "#F8AE01", textShadow: "0 0 60px rgba(248,174,1,0.35)" }}>
              Emotional Loyalty.
            </span>
          </h2>
          <p className="text-white/45 tracking-tight mt-5 max-w-sm text-[0.9rem] leading-relaxed">
            human centred loyalty marketing — transforming customer engagement into lasting loyalty across Europe and beyond.
          </p>
        </div>

        {/* ── Columns ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Socials + desc */}
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="text-white/40 tracking-tight text-[0.88rem] leading-relaxed max-w-xs">
              KLR-EVROPA d.o.o. — Loyalty campaign design and full-cycle execution for grocery and petrol retailers across 20+ European markets.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://www.linkedin.com/company/klr-key-to-loyalty-in-retail/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:scale-105"
                style={{ ...glassCard, color: "rgba(255,255,255,0.55)" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@klreurope"
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
            <div className="tracking-[0.22em] uppercase text-[#F8AE01]/70 mb-5 text-[0.63rem]">Headquarters</div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#F8AE01]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/55 tracking-tight text-[0.88rem] leading-relaxed">
                    Ulica 15. Maja 19<br />
                    SI-6000 Koper/Capodistria<br />
                    <span className="text-white/35">+386 5 902 87 58</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#F8AE01]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/55 tracking-tight text-[0.88rem] leading-relaxed">
                    Via XXV Aprile 66<br />
                    25038 Rovato (BS), Italy<br />
                    <span className="text-white/35">+39 030 52 81 427</span>
                  </p>
                </div>
              </div>

              <a
                href="mailto:info@klr-europe.com"
                className="text-[#F8AE01]/80 hover:text-[#F8AE01] tracking-tight block transition-colors text-[0.88rem]"
              >
                info@klr-europe.com
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex items-center justify-between text-[#F8AE01]/50 tracking-tight pt-8 flex-wrap gap-4 text-[0.78rem]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span>© 2026 KLR-EVROPA d.o.o.</span>
          <div className="flex items-center gap-4">
            <Link href="/copyright" className="text-[#F8AE01]/70 hover:text-[#F8AE01] transition-colors">Copyright</Link>
            <span className="text-[#F8AE01]/20">·</span>
            <Link href="/privacy" className="text-[#F8AE01]/70 hover:text-[#F8AE01] transition-colors">Privacy Policy</Link>
          </div>
        </div>

        </div>
      </div>
    </footer>
  );
}
