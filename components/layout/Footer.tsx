"use client";

import Link from "next/link";
import Image from "next/image";

const explore = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/brands", label: "Brands" },
];
const more = [
  { href: "/work", label: "Case Studies" },
  { href: "/blog", label: "Insights" },
  { href: "/team", label: "Team" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#2E2784]">
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-12 gap-12 mb-24">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-10">
              <Image src="/klr-logo.png" alt="KLR Europe" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <div
              className="text-white tracking-[-0.03em] max-w-md"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15, fontWeight: 600 }}
            >
              Key to Loyalty in Retail.<br />
              <span className="text-[#F8AE01]">Built on trust and teamwork.</span>
            </div>
            <p className="text-white/60 tracking-tight mt-6 max-w-xs text-[0.9rem] leading-relaxed">
              We design and deliver marketing campaigns with positive results for retail businesses.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://www.linkedin.com/company/klr-key-to-loyalty-in-retail/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#F8AE01] transition-colors text-[0.85rem] tracking-tight"
              >
                LinkedIn
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://www.youtube.com/@klreurope"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#F8AE01] transition-colors text-[0.85rem] tracking-tight"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <div className="tracking-[0.2em] uppercase text-white/50 mb-6 text-[0.7rem]">Explore</div>
            <ul className="space-y-3 text-white/80 tracking-tight text-[0.95rem]">
              {explore.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="hover:text-[#F8AE01] transition-colors">{e.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <div className="tracking-[0.2em] uppercase text-white/50 mb-6 text-[0.7rem]">Links</div>
            <ul className="space-y-3 text-white/80 tracking-tight text-[0.95rem]">
              {more.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="hover:text-[#F8AE01] transition-colors">{e.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ */}
          <div className="md:col-span-3">
            <div className="tracking-[0.2em] uppercase text-white/50 mb-6 text-[0.7rem]">Headquarters</div>
            <p className="text-white/80 tracking-tight text-[0.95rem] leading-relaxed">
              Ulica 15. Maja 19<br />
              SI-6000 Koper/Capodistria<br />
              +386 5 902 87 58
            </p>
            <p className="text-white/80 tracking-tight text-[0.95rem] leading-relaxed mt-4">
              Via XXV Aprile 68<br />
              25038 Rovato (BS), Italy<br />
              +39 030 52 81 427
            </p>
            <a
              href="mailto:info@klr-europe.com"
              className="text-white/70 hover:text-[#F8AE01] tracking-tight mt-4 block transition-colors text-[0.95rem]"
            >
              info@klr-europe.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between text-white/40 tracking-tight pt-10 border-t border-white/10 flex-wrap gap-4 text-[0.8rem]">
          <span>© 2026 KLR-EVROPA d.o.o.</span>
          <div className="flex items-center gap-4">
            <Link href="/copyright" className="hover:text-white transition-colors">Copyright</Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
