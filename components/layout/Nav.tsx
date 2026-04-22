"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/about",    label: "About" },
  { href: "/services", label: "Services" },
  { href: "/brands",   label: "Brands" },
  { href: "/work",     label: "Case Studies" },
  { href: "/blog",     label: "Insights" },
  { href: "/career",   label: "Career" },
  { href: "/10-years", label: "KLR 10 Years" },
];

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
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl">
      <div
        className="rounded-full pl-5 pr-2 py-2 flex items-center justify-between border border-white/10 transition-shadow duration-500"
        style={{
          background: scrolled ? "rgba(46,39,132,0.97)" : "rgba(46,39,132,0.88)",
          backdropFilter: "blur(80px) saturate(200%)",
          WebkitBackdropFilter: "blur(80px) saturate(200%)",
          boxShadow: scrolled
            ? "0 30px 80px -20px rgba(46,39,132,0.5)"
            : "0 30px 80px -20px rgba(46,39,132,0.3)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0" data-cursor="default">
          <Image src="/klr-logo.png" alt="KLR Europe" width={120} height={40} className="h-7 md:h-8 w-auto" priority />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F8AE01]" />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-full tracking-tight transition-all duration-300 text-[0.82rem] ${
                  active ? "bg-white/20 text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            data-cursor="cta"
            className="inline-flex px-4 py-1.5 rounded-full bg-[#F8AE01] text-black tracking-tight hover:bg-[#2E2784] hover:text-white transition-all text-[0.85rem]"
          >
            Keep in Touch!
          </Link>
          <button className="lg:hidden text-white p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden mt-3 rounded-3xl p-3 flex flex-col gap-1 border border-white/10"
            style={{
              background: "rgba(46,39,132,0.97)",
              backdropFilter: "blur(80px)",
              WebkitBackdropFilter: "blur(80px)",
            }}
          >
            {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Keep in Touch!" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-3 rounded-2xl text-left transition-all text-[0.92rem] ${
                  pathname === l.href
                    ? "bg-white/20 text-white"
                    : l.href === "/contact"
                    ? "bg-[#F8AE01] text-black"
                    : "text-white/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
