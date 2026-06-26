"use client";

import { brandPartners } from "../data";

export function PartnerLogosMarquee({ eyebrow = "Our Brand Partners" }: { eyebrow?: string }) {
  const partnerLogos = brandPartners.filter((b) => b.logo);
  return (
    <section className="relative py-14 overflow-hidden" style={{ background: "#06051C" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(46,39,132,0.25) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto px-8 mb-10">
        <div className="tracking-[0.3em] uppercase text-[#F8AE01]/60 text-center" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
          {eyebrow}
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-8 sm:gap-10 md:gap-12 items-center"
          style={{
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}
        >
          {[...partnerLogos, ...partnerLogos].map((b, i) => (
            <div key={i} className="flex items-center justify-center h-14 w-28 sm:w-32 md:w-36 shrink-0">
              <img
                src={b.logo!}
                alt={b.name}
                className="h-full w-full object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }}
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
