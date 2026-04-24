"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  cta?: { label: string; href: string };
}

export function PageHero({ eyebrow, title, subtitle, image, cta }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-[#2E2784]/65" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-6xl mx-auto px-8 flex flex-col justify-center min-h-screen pt-32 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="tracking-[0.3em] uppercase text-[#F8AE01]"
          style={{ fontSize: "0.65rem", fontWeight: 600 }}
        >
          {eyebrow}
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-white/80 tracking-tight max-w-2xl mt-10"
            style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href={cta.href}
              data-cursor="cta"
              className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
            >
              <span>{cta.label}</span>
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
