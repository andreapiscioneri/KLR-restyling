"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const gradients = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
};

export function LogoLoader() {
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("klr-loaded")) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("klr-loaded", "1");
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] overflow-hidden flex flex-col items-center justify-center"
          style={{ background: gradients.blue }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/10 blur-3xl" />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src="/klr-logo.png"
                alt="KLR Europe"
                width={140}
                height={48}
                priority
                className="h-12 w-auto brightness-0 invert"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 text-[#F8AE01] tracking-[0.3em] uppercase"
              style={{ fontSize: "0.65rem", fontWeight: 600 }}
            >
              Key to Loyalty in Retail
            </motion.p>

            {/* Progress bar */}
            <div className="mt-12 w-64 h-px bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full bg-[#F8AE01]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
