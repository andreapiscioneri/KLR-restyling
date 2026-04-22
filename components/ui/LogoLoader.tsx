"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

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
          className="fixed inset-0 z-[9998] bg-white flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
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
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Progress bar */}
          <div className="mt-10 w-52 h-px bg-black/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full bg-[#F8AE01]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "linear" }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-[#2E2784] tracking-[0.25em] uppercase"
            style={{ fontSize: "0.65rem" }}
          >
            Key to Loyalty in Retail
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
