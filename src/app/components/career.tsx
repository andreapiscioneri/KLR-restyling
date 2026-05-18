"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { images, careerValues, offices } from "../data";
import { PageHero } from "./page-hero";
import type { Route } from "../App";

type Position = { id: string; role: string; loc: string; description?: string };

type CmsCareer = {
  hero?: Record<string, string>;
  teamBanner?: Record<string, string>;
  values?: Record<string, string>;
  positions?: Record<string, string>;
  closing?: Record<string, string>;
};

export function Career({ go, cms, positionsList }: {
  go: (r: Route) => void;
  cms?: CmsCareer;
  positionsList?: Position[];
}) {
  const hero     = cms?.hero     || {};
  const banner   = cms?.teamBanner || {};
  const valData  = cms?.values   || {};
  const posData  = cms?.positions || {};
  const closing  = cms?.closing  || {};

  const values = [
    { title: valData.value1Title || careerValues[0].title, desc: valData.value1Desc || careerValues[0].desc },
    { title: valData.value2Title || careerValues[1].title, desc: valData.value2Desc || careerValues[1].desc },
    { title: valData.value3Title || careerValues[2].title, desc: valData.value3Desc || careerValues[2].desc },
  ];

  const eyebrow  = hero.eyebrow  || "Career";
  const title    = hero.title    || "A Loyal Team of Professionals.";
  const subtitle = hero.subtitle || "Loyalty starts within our team. We are open-minded professionals of different nationalities, united by trust, mutual respect, and a passion for loyalty marketing.";
  const heroImg  = hero.image    || images.recruiting;
  const ctaLabel = hero.ctaLabel || "See Open Positions";
  const ctaHref  = hero.ctaHref  || "#positions";

  const bannerImg   = banner.image || images.teamPhoto;
  const bannerTitle = banner.title || "Be part of our International Team.";
  const visible = (section?: Record<string, string>) => (section as Record<string, unknown> | undefined)?._visible !== false;

  const positions = positionsList ?? [
    { id: "1", role: "Loyalty Program Manager", loc: "Milan · IT" },
    { id: "2", role: "Account Executive — Petrol", loc: "Ljubljana · SI" },
    { id: "3", role: "Creative Copywriter", loc: "Remote · EU" },
    { id: "4", role: "Supply Chain Coordinator", loc: "Milan · IT" },
  ];

  return (
    <div className="pb-48">
      {visible(hero) && <PageHero
        eyebrow={eyebrow}
        title={<>{title.replace(" of Professionals.", "")}<br /><span className="text-[#F8AE01]">of Professionals.</span></>}
        subtitle={subtitle}
        image={heroImg}
        cta={{ label: ctaLabel, href: ctaHref }}
      />}

      <div className="pt-2">
        {visible(banner) && <section className={`relative h-[75vh] min-h-[480px] mx-4 md:mx-8 mb-32 rounded-[40px] overflow-hidden ${hairline}`} style={softShadow}>
          <ImageWithFallback src={bannerImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/70 via-[#2E2784]/10 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-[#F8AE01] tracking-[-0.035em] max-w-2xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05, fontWeight: 600 }}>
              {bannerTitle}
            </h2>
          </div>
        </section>}

        {/* VALUES */}
        {visible(valData) && <section className="max-w-6xl mx-auto px-8 mb-32">
          <Eyebrow>{valData.eyebrow || "How we work"}</Eyebrow>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className={`rounded-[32px] p-10 bg-white ${hairline}`} style={softShadow}>
                <h3 className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  {v.title}
                </h3>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>}

        {/* POSITIONS */}
        {visible(posData) && <section id="positions" className="max-w-5xl mx-auto px-8 mb-32">
          <div className={`rounded-[40px] p-10 md:p-14 ${hairline}`} style={{ ...softShadow, background: "#2E2784" }}>
            <Eyebrow onDark>{posData.eyebrow || "Open positions"}</Eyebrow>
            <h2 className="text-[#F8AE01] tracking-[-0.035em] mt-8 max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.05 }}>
              {posData.title || "Let's get started something new together."}
            </h2>
            <div className="mt-12 divide-y divide-white/10">
              {positions.map((p) => (
                <div key={p.id} className="py-6 flex items-center justify-between gap-4 group cursor-pointer">
                  <div>
                    <div className="text-white tracking-[-0.02em]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{p.role}</div>
                    <div className="text-white tracking-tight mt-1" style={{ fontSize: "0.85rem", opacity: 0.6 }}>{p.loc}</div>
                    {p.description && (
                      <div className="text-white/50 tracking-tight mt-2" style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>{p.description}</div>
                    )}
                  </div>
                  <span className="text-[#F8AE01] tracking-tight group-hover:translate-x-2 transition-transform duration-500" style={{ fontSize: "0.9rem" }}>
                    Apply →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>}

        {/* OFFICES */}
        <section className="max-w-6xl mx-auto px-8 mb-24">
          <Eyebrow>Our offices</Eyebrow>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {offices.map((o) => (
              <div key={o.city} className={`rounded-[28px] p-8 bg-white ${hairline}`} style={softShadow}>
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.7rem" }}>{o.region}</div>
                <div className="text-[#2E2784] tracking-[-0.02em] mt-4" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{o.city}</div>
                <div className="text-black tracking-tight mt-3" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{o.addr}</div>
                <div className="text-black tracking-tight mt-1" style={{ fontSize: "0.9rem" }}>{o.phone}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        {visible(closing) && <section className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-6">
          <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
            {closing.title || "Let's get started something new together."}
          </h3>
          <CTA label={closing.ctaLabel || "Get in Touch"} variant="yellow" onClick={() => go({ page: "contact" })} />
        </section>}
      </div>
    </div>
  );
}
