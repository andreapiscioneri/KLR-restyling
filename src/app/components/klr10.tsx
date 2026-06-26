"use client";

import { useRef, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { images, leadership, fallbackPosts } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

function VideoWithPoster({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const capture = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d")?.drawImage(video, 0, 0);
        video.poster = canvas.toDataURL("image/jpeg", 0.92);
      } catch {
        // cross-origin or codec issue — leave without poster
      }
    };
    video.addEventListener("loadeddata", capture, { once: true });
    return () => video.removeEventListener("loadeddata", capture);
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      preload="metadata"
      className="w-full block"
      style={{ maxHeight: "70vh", objectFit: "contain" }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa: "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

type TenYearsSection = Record<string, string | boolean | undefined>;

type TenYearsCms = {
  hero?: TenYearsSection;
  intro?: TenYearsSection;
  stats?: TenYearsSection;
  journey?: TenYearsSection;
  map?: TenYearsSection;
  vision?: TenYearsSection;
  anniversary?: TenYearsSection;
  team?: TenYearsSection;
  closing?: TenYearsSection;
};

type TenYearsMilestone = { n: string; year: string; title: string };

const defaultMilestones: TenYearsMilestone[] = [
  { n: "01", year: "2015", title: "First office opening in Koper, Slovenia" },
  { n: "02", year: "2015", title: "First petrol station campaign — Richardson Sheffield at Adria Oil, Croatia" },
  { n: "03", year: "2016", title: "First supermarket campaign — Bormioli Rocco at Tuš, Bosnia" },
  { n: "04", year: "2017", title: "Rovato office opening in Italy" },
  { n: "05", year: "2017", title: "First 10 countries milestone reached" },
  { n: "06", year: "2017", title: "First multi-country campaign — Blaupunkt for MOL Group, 6 markets" },
  { n: "07", year: "2019", title: "First lottery & international retail chain campaign — Ducati Corse at Kaufland, Bulgaria" },
  { n: "08", year: "2025", title: "Celebrating 10 years in 20 countries" },
];

const defaultPageStats = [
  { k: "30+", v: "Talented professionals who joined the KLR team and grew with us" },
  { k: "340+", v: "Tailor-made loyalty campaigns launched across industries" },
  { k: "6M+", v: "Rewards delivered into the hands of happy customers" },
  { k: "20+", v: "Countries in which we operate — and counting" },
];

const insights = [
  {
    id: "antonio-finazzi",
    quote: "KLR was born from friendship — people from different cultures coming together. Our journey is about more than knowledge; it's about growth, adaptability, and teamwork. We're not just colleagues; we evolve together as individuals.",
  },
  {
    id: "stefano-finazzi",
    quote: "Success isn't about hiring experience; it's about hiring those eager to learn. Technical skills can be taught, but a growth mindset is invaluable. This has set KLR apart, making us adaptable, innovative, and distinct in the market.",
  },
  {
    id: "sebastjan-kocjancic",
    quote: "Scaling up without losing our DNA was a challenge, but we made it happen. Managing a growing, multicultural team while staying true to our values has been key. And as we evolved, so did our tools — from Excel to SQL, Vasco to ERP — ensuring efficiency and better service.",
  },
  {
    id: "olga-wojcik",
    quote: "Loyalty in B2B is about trust, not just transactions. We build lasting partnerships, creating value beyond purchases. When sales and marketing align, loyalty programs become powerful tools for growth.",
  },
  {
    id: "marta-marga",
    quote: "Six years at KLR — what a ride! When I started, there was no marketing roadmap set, and the opportunity to mould a vision from scratch paid off. We relentlessly make it happen. What we do sparks emotions, leaving no one indifferent. Proud of what we've built — and it's just the beginning.",
  },
  {
    id: "jan-sahbaz-pergar",
    quote: "Loyalty programs are more than rewards — they require smart product design, strong branding, and seamless execution. At KLR, we craft loyalty campaigns that align with brand identities, ensuring engagement and long-term success.",
  },
  {
    id: "natalia-molchanova",
    quote: "KLR's voice has evolved, but our core remains — authenticity, trust, and a personal approach. Internal communication is as crucial as external branding. A strong culture starts with clear, meaningful messaging.",
  },
];

export function Klr10({ go, cms = {} }: { go: (r: Route) => void; cms?: TenYearsCms }) {
  const anniversary = fallbackPosts.find((p) => p.slug.includes("10-anniversary")) || fallbackPosts[4];

  const cHero    = cms.hero        || {};
  const cIntro   = cms.intro       || {};
  const cStats   = cms.stats       || {};
  const cAnniv   = cms.anniversary || {};
  const cJourney = cms.journey     || {};
  const cMap     = cms.map         || {};
  const cVision  = cms.vision      || {};
  const cTeam    = cms.team        || {};
  const cClosing = cms.closing     || {};

  const visible = (s: TenYearsSection) => (s as Record<string, unknown>)._visible !== false;
  const text = (section: TenYearsSection, key: string, fallback: string) => {
    const value = section[key];
    return typeof value === "string" && value.trim().length > 0 ? value : fallback;
  };
  const image = (section: TenYearsSection, key: string, fallback: string) => {
    const value = section[key];
    return typeof value === "string" && value.trim().length > 0 ? value : fallback;
  };
  const hasText = (section: TenYearsSection, key: string) => {
    const value = section[key];
    return typeof value === "string" && value.trim().length > 0;
  };

  const parseMilestones = (value?: string): TenYearsMilestone[] => {
    const rows = (value || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [year, ...rest] = line.split("|");
        return { year: year?.trim() || "", title: rest.join("|").trim() };
      })
      .filter((item) => item.year && item.title);

    return rows.length > 0
      ? rows.map((item, index) => ({ n: String(index + 1).padStart(2, "0"), ...item }))
      : defaultMilestones;
  };

  const milestones = parseMilestones(cJourney.milestonesText as string | undefined);
  const statsCards = [
    { k: String(cStats.card1Value || defaultPageStats[0].k), v: String(cStats.card1Text || defaultPageStats[0].v) },
    { k: String(cStats.card2Value || defaultPageStats[1].k), v: String(cStats.card2Text || defaultPageStats[1].v) },
    { k: String(cStats.card3Value || defaultPageStats[2].k), v: String(cStats.card3Text || defaultPageStats[2].v) },
    { k: String(cStats.card4Value || defaultPageStats[3].k), v: String(cStats.card4Text || defaultPageStats[3].v) },
  ];

  const resolvedInsights = insights.map((ins) => ({
    ...ins,
    person: leadership.find((p) => p.id === ins.id)!,
  })).filter((i) => Boolean(i.person));

  const heroTitle = text(cHero, "title", "A decade built together.");
  const heroTitleWords = heroTitle.split(" ");
  const heroTitleLine1 = heroTitleWords.slice(0, -2).join(" ");
  const heroTitleLine2 = heroTitleWords.slice(-2).join(" ");

  return (
    <div>
      {visible(cHero) && <PageHero
        eyebrow={text(cHero, "eyebrow", "KLR 10 Years")}
        title={heroTitleLine1 ? <>{heroTitleLine1}<br /><span className="text-[#F8AE01]">{heroTitleLine2}</span></> : heroTitle}
        subtitle={text(cHero, "subtitle", "From three founders in Koper to a 43-person international team delivering loyalty campaigns across 20+ European markets. This is our story.")}
        image={image(cHero, "image", images.anniversario)}
        cta={{ label: "Discover Our Journey", href: "#milestones" }}
      />}

      {/* INTRO — yellow */}
      {visible(cIntro) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <Eyebrow>{text(cIntro, "eyebrow", "10 years of commitment, teamwork and growth")}</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.96, fontWeight: 800 }}>
                  {text(cIntro, "title", "More than a company —")}<br />
                  <em className="not-italic text-black">{text(cIntro, "emphasis", "a story of people growing together.")}</em>
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}>
                  {text(cIntro, "subtitle", "KLR was born from friendship — different cultures, shared ambitions, and a belief that loyalty is built on trust.")}
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}>
                  {text(cIntro, "paragraph1", "Over the past 10 years, we've grown not just as a business, but as individuals, adapting, learning, and pushing boundaries together.")}
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.6 }}>
                  {text(cIntro, "paragraph2", "Our success isn't just measured in numbers but in the strong partnerships we've built across Europe, the milestones we've reached, and the people who've shaped our journey.")}
                </p>
              </div>
              <div className="relative flex justify-center md:justify-end">
                <div className="absolute -bottom-10 -left-6 w-[180px] h-[180px] rounded-full bg-[#F8AE01]" />
                <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-white/40" style={softShadow}>
                  <ImageWithFallback src={image(cIntro, "image", images.teamPhoto)} alt="KLR Team" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* STATS — rosa */}
      {visible(cStats) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="text-[#2E2784] tracking-[-0.04em] max-w-4xl" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95, fontWeight: 800 }}>
              {cStats.title || "10 Years of Loyalty,"}{" "}
              <span className="text-black">Built Together.</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-10 border-t border-[#2E2784]/15">
              {statsCards.map((s) => (
                <div key={s.k}>
                  <div className="text-[#2E2784] tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1, fontWeight: 800 }}>{s.k}</div>
                  <div className="text-[#2E2784]/70 tracking-tight mt-3" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", lineHeight: 1.45 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* 10 MILESTONES — yellow */}
      {visible(cJourney) && <section id="milestones" className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow lineColor="#2E2784">{text(cJourney, "eyebrow", "Timeline")}</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
              {text(cJourney, "title", "10 Years of Growth")}
            </h2>

            <div className="mt-14 grid md:grid-cols-2 gap-4">
              {milestones.map((m, i) => {
                const isDark = i % 2 === 0;
                return (
                  <div
                    key={m.n}
                    className="rounded-[28px] p-6 md:p-8 flex gap-5 items-start border-2 border-[#2E2784]"
                    style={isDark ? { background: "#2E2784", ...softShadow } : { background: "transparent", ...softShadow }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: isDark ? "#F8AE01" : "#2E2784" }}
                    >
                      <span style={{ fontSize: "0.65rem", fontWeight: 800, color: isDark ? "#2E2784" : "#fff" }}>
                        {m.n}
                      </span>
                    </div>
                    <div>
                      <div
                        className="tracking-[0.2em] uppercase mb-1.5"
                        style={{ fontSize: "0.62rem", fontWeight: 700, color: isDark ? "#F8AE01" : "#2E2784" }}
                      >
                        {m.year}
                      </div>
                      <p
                        className="tracking-tight"
                        style={{ fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 600, color: isDark ? "rgba(255,255,255,0.9)" : "#2E2784" }}
                      >
                        {m.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* MAP — blue */}
      {visible(cMap) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <Eyebrow onDark>{text(cMap, "eyebrow", "International Growth")}</Eyebrow>
                <h2 className="text-[#F8AE01] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800, fontStyle: "italic" }}>
                  {text(cMap, "title", '"10 years of growth on a map."')}
                </h2>
              </div>
              <div>
                <p className="text-white/90 tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65 }}>
                  {text(cMap, "subtitle", "Based in Italy and Slovenia, we operate in 20+ countries in Europe and keep growing. Having an international network of partners helps us to better serve our multinational clients by providing local expertise and understanding of different cultures and consumer behaviours.")}
                </p>
              </div>
            </div>
            <div className="mt-14 rounded-[40px] overflow-hidden border border-white/15" style={softShadow}>
              <img
                src={image(cMap, "image", "/KLR-MAPPA-GIF-FINALE-DEF.gif")}
                alt="KLR 10 years of growth across Europe"
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* OUR VISION — yellow */}
      {visible(cVision) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>{text(cVision, "eyebrow", "Our Vision")}</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
              {text(cVision, "title", "The people who")}<br />{hasText(cVision, "title") ? null : <span>shaped the decade.</span>}
            </h2>

            <div className="mt-14 space-y-8">
              {resolvedInsights.map((ins, i) => {
                const flip = i % 2 !== 0;
                return (
                  <div
                    key={ins.id}
                    className={`grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10 items-center ${flip ? "md:[direction:rtl]" : ""}`}
                  >
                    {/* photo */}
                    <div className={`flex flex-col items-center gap-3 text-center ${flip ? "md:[direction:ltr]" : ""}`}>
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white flex-shrink-0" style={{ background: "#F8AE01" }}>
                        <ImageWithFallback src={ins.person.img} alt={ins.person.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{ins.person.name}</div>
                        <div className="text-[#2E2784]/60 tracking-tight" style={{ fontSize: "0.78rem" }}>{ins.person.role}</div>
                      </div>
                    </div>
                    {/* quote */}
                    <div
                      className={`rounded-[28px] p-7 md:p-10 ${flip ? "md:[direction:ltr]" : ""}`}
                      style={flip ? { background: "#2E2784", ...softShadow } : { background: "transparent", border: "2px solid #2E2784", ...softShadow }}
                    >
                      <p
                        className="tracking-tight"
                        style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", lineHeight: 1.75, fontStyle: "italic", fontWeight: 600, color: flip ? "rgba(255,255,255,0.9)" : "#2E2784" }}
                      >
                        "{ins.quote}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* FRANCIACORTA VIDEO — blue */}
      {visible(cAnniv) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow onDark>{text(cAnniv, "eyebrow", "The Celebration")}</Eyebrow>
            <h2 className="text-white tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
              {text(cAnniv, "title", "Revisit the moments we shared")}<br />
              <span className="text-[#F8AE01]">{text(cAnniv, "subtitle", "in Franciacorta!")}</span>
            </h2>

            <div className="mt-14 rounded-[40px] overflow-hidden border border-white/15 bg-black" style={softShadow}>
              <VideoWithPoster src={encodeURI(text(cAnniv, "videoUrl", "/KLR 10th Anniversary Event in Franciacorta, Italy.mp4"))} />
            </div>

            <div className="mt-35 px-2">
              <p className="text-[#F8AE01] tracking-[0.2em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                {text(cAnniv, "captionEyebrow", "Franciacorta · September 2025")}
              </p>
              <h3 className="text-white tracking-[-0.02em] mt-2" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, lineHeight: 1.2 }}>
                {text(cAnniv, "captionTitle", "KLR 10th Anniversary Event in Franciacorta, Italy")}
              </h3>
            </div>

            <button
              onClick={() => go({ page: "blog-detail", slug: anniversary.slug })}
              className="mt-8 w-full rounded-[40px] overflow-hidden text-left group"
              style={{ background: G.yellow, ...softShadow }}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <ImageWithFallback
                    src={images.anniversario}
                    alt={anniversary.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]"
                  />
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-between gap-6">
                  <div>
                    <div className="tracking-[0.2em] uppercase text-[#2E2784]/70" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      Franciacorta · September 2025
                    </div>
                    <h3 className="text-[#2E2784] tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                      {anniversary.title}
                    </h3>
                    <p className="text-[#2E2784]/70 tracking-tight mt-5" style={{ fontSize: "0.97rem", lineHeight: 1.65 }}>
                      {anniversary.excerpt}
                    </p>
                  </div>
                  <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5 self-start" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                    Read the anniversary story →
                  </span>
                </div>
              </div>
            </button>
          </AnimatedSection>
        </div>
      </section>}

      {/* CLOSING CTA — yellow */}
      {visible(cClosing) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  {text(cClosing, "title", "Are you ready to start")}<br />
                  <span className="text-black">{text(cClosing, "subtitle", "something new together?")}</span>
                </h2>
                <p className="text-[#2E2784]/80 tracking-tight mt-6 max-w-xl" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
                  {text(cClosing, "body", "Get in touch with us and we'll find the right solution for you.")}
                </p>
              </div>
              <CTA label={text(cClosing, "ctaLabel", "Keep in Touch!")} variant="dark" onClick={() => go({ page: "contact" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>}
    </div>
  );
}
