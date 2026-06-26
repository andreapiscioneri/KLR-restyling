"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type NavSub  = { href: string; label: string };
type NavLink = { href: string; label: string; sub?: NavSub[] };

const DEFAULT_LINKS: NavLink[] = [
  { href: "/about",    label: "About", sub: [{ href: "/10-years", label: "10 Years" }] },
  { href: "/services", label: "Services" },
  { href: "/brands",   label: "Brands" },
  { href: "/work",     label: "Case Studies" },
  { href: "/blog",     label: "Insights" },
  { href: "/team",     label: "Team" },
];

const glass = {
  base: {
    background: "rgba(12,9,52,0.55)",
    backdropFilter: "blur(60px) saturate(180%)",
    WebkitBackdropFilter: "blur(60px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 8px 40px -12px rgba(46,39,132,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  scrolled: {
    background: "rgba(10,7,46,0.82)",
    backdropFilter: "blur(80px) saturate(200%)",
    WebkitBackdropFilter: "blur(80px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 24px 80px -16px rgba(46,39,132,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
  },
};

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [links, setLinks] = useState<NavLink[]>(DEFAULT_LINKS);
  const [ctaLabel, setCtaLabel] = useState("Get in Touch");
  const [ctaHref, setCtaHref] = useState("/contact");

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        const nav = d?.data?.nav;
        if (!nav) return;
        if (Array.isArray(nav.links) && nav.links.length > 0) setLinks(nav.links);
        if (nav.ctaLabel) setCtaLabel(nav.ctaLabel);
        if (nav.ctaHref) setCtaHref(nav.ctaHref);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl">
      <motion.div
        className="rounded-[20px] pl-4 pr-2.5 py-2 flex items-center justify-between transition-all duration-500"
        style={scrolled ? glass.scrolled : glass.base}
        layout
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" data-cursor="default">
          <Image
            src="/klr-logo.png"
            alt="KLR Europe"
            width={100}
            height={30}
            className="h-4 md:h-5 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            if (l.sub && l.sub.length > 0) {
              return (
                <div key={l.href} className="relative group">
                  <Link
                    href={l.href}
                    className="relative px-3 py-1.5 rounded-xl tracking-tight transition-all duration-300 text-[0.82rem] flex items-center gap-1"
                    style={
                      active
                        ? { color: "#F8AE01", background: "rgba(248,174,1,0.12)", border: "1px solid rgba(248,174,1,0.18)", boxShadow: "inset 0 1px 0 rgba(248,174,1,0.15)" }
                        : { color: "rgba(255,255,255,0.6)" }
                    }
                  >
                    {l.label}
                    <svg className="w-2.5 h-2.5 opacity-50" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </Link>
                  <div className="absolute top-full left-0 pt-2 min-w-[140px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="rounded-[14px] py-1.5" style={{ ...(scrolled ? glass.scrolled : glass.base), boxShadow: "0 16px 48px -8px rgba(46,39,132,0.5)" }}>
                      {l.sub.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2.5 text-[0.82rem] tracking-tight transition-colors hover:text-[#F8AE01]"
                          style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3 py-1.5 rounded-xl tracking-tight transition-all duration-300 text-[0.82rem]"
                style={
                  active
                    ? { color: "#F8AE01", background: "rgba(248,174,1,0.12)", border: "1px solid rgba(248,174,1,0.18)", boxShadow: "inset 0 1px 0 rgba(248,174,1,0.15)" }
                    : { color: "rgba(255,255,255,0.6)" }
                }
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + burger */}
        <div className="flex items-center gap-2">
          <Link
            href={ctaHref}
            data-cursor="cta"
            className="hidden lg:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-xl tracking-tight text-[0.85rem] font-medium transition-all"
            style={{ background: "#F8AE01", color: "#000" }}
          >
            <span>{ctaLabel}</span>
            <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.12)" }}>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <button
            className="lg:hidden p-2 rounded-xl transition-all text-white/70 hover:text-white"
            style={{ background: "rgba(255,255,255,0.07)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden mt-2 rounded-2xl p-2.5 flex flex-col gap-0.5"
            style={{
              background: "rgba(10,7,46,0.90)",
              backdropFilter: "blur(80px)",
              WebkitBackdropFilter: "blur(80px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 32px 80px -16px rgba(46,39,132,0.65), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            {[{ href: "/", label: "Home", sub: undefined as NavSub[] | undefined }, ...links].map((l) => (
              <div key={l.href}>
                <Link
                  href={l.href}
                  className="block px-4 py-3 rounded-xl text-[0.92rem] tracking-tight transition-all"
                  style={
                    pathname === l.href
                      ? { background: "rgba(248,174,1,0.12)", color: "#F8AE01", border: "1px solid rgba(248,174,1,0.18)" }
                      : { color: "rgba(255,255,255,0.65)" }
                  }
                >
                  {l.label}
                </Link>
                {l.sub?.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block px-7 py-2.5 rounded-xl text-[0.86rem] tracking-tight transition-all"
                    style={
                      pathname === s.href ? { color: "#F8AE01" } : { color: "rgba(255,255,255,0.4)" }
                    }
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href={ctaHref}
              className="mt-1.5 px-4 py-3 rounded-xl text-[0.92rem] font-medium tracking-tight"
              style={{ background: "#F8AE01", color: "#000", boxShadow: "0 0 24px rgba(248,174,1,0.35), inset 0 1px 0 rgba(255,255,255,0.3)" }}
            >
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
