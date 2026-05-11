'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const gradients = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
};

export default function NotFound() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-16 md:px-8 md:pt-40 md:pb-24" style={{ background: gradients.blue }}>
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center md:text-left"
          >
            {/* Large 404 with styled "0" */}
            <div className="relative mb-8">
              <div className="flex items-start justify-center md:justify-start gap-2">
                <h1
                  className="text-white"
                  style={{
                    fontSize: 'clamp(5rem, 15vw, 12rem)',
                    lineHeight: 0.9,
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                  }}
                >
                  4
                </h1>
                <div className="relative" style={{ marginTop: '0.5rem' }}>
                  <div
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#F8AE01] flex items-center justify-center"
                    style={{
                      fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                      fontWeight: 800,
                      color: 'white',
                      lineHeight: 1,
                    }}
                  >
                    0
                  </div>
                </div>
                <h1
                  className="text-white"
                  style={{
                    fontSize: 'clamp(5rem, 15vw, 12rem)',
                    lineHeight: 0.9,
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                  }}
                >
                  4
                </h1>
              </div>
            </div>

            {/* Heading */}
            <motion.h2
              className="text-white tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.2,
                fontWeight: 700,
                marginBottom: '2rem',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Lost your Way?
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-white tracking-tight max-w-xl mx-auto md:mx-0"
              style={{
                fontSize: 'clamp(1.02rem, 1.35vw, 1.125rem)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                opacity: 0.95,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Oops, the page you were looking for is not here...
            </motion.p>

            <motion.p
              className="text-white tracking-tight max-w-xl mx-auto md:mx-0"
              style={{
                fontSize: 'clamp(1.02rem, 1.35vw, 1.125rem)',
                lineHeight: 1.6,
                marginBottom: '3rem',
                opacity: 0.85,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              But don't worry – we have plenty of other places for you to explore!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
              >
                <span>Visit Homepage</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 border-2 border-[#F8AE01] text-[#F8AE01] hover:bg-[#F8AE01] hover:text-black"
              >
                <span>Our Works</span>
                <span className="w-8 h-8 rounded-full bg-[#F8AE01]/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration/image placeholder */}
          <motion.div
            className="relative hidden md:block h-[500px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-full h-full rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-full h-full bg-gradient-to-br from-[#F8AE01]/20 via-[#5b53bf]/20 to-[#2E2784]/20 flex items-center justify-center p-10">
                <Image
                  src="/klr-logo.png"
                  alt="KLR"
                  width={360}
                  height={360}
                  className="w-full max-w-[360px] h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
