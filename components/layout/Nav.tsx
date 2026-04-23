"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/about",    label: "About" },
  { href: "/services", label: "Services" },
  { href: "/brands",   label: "Brands" },
  { href: "/work",     label: "Case Studies" },
  { href: "/blog",     label: "Insights" },
  { href: "/team",     label: "Team" },
  { href: "/10-years", label: "KLR 10 Years" },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
            width={120}
            height={40}
            className="h-6 md:h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3 py-1.5 rounded-xl tracking-tight transition-all duration-300 text-[0.82rem]"
                style={
                  active
                    ? {
                        color: "#fff",
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                      }
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
            href="/contact"
            data-cursor="cta"
            className="hidden sm:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-xl tracking-tight text-[0.85rem] font-medium transition-all"
            style={{
              background: "#F8AE01",
              color: "#000",
              }}
          >
            <span>Keep in Touch!</span>
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.12)" }}
            >
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
            {[{ href: "/", label: "Home" }, ...links].map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-3 rounded-xl text-[0.92rem] tracking-tight transition-all"
                  style={
                    active
                      ? {
                          background: "rgba(255,255,255,0.12)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.10)",
                        }
                      : { color: "rgba(255,255,255,0.65)" }
                  }
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-1.5 px-4 py-3 rounded-xl text-[0.92rem] font-medium tracking-tight"
              style={{
                background: "#F8AE01",
                color: "#000",
                boxShadow: "0 0 24px rgba(248,174,1,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              Keep in Touch!
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
