"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, softShadow } from "./ui-bits";
import { studies as fallbackStudies, brands as fallbackBrands } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa: "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

export function StudyDetail({ id, go, initialStudies }: { id: string; go: (r: Route) => void; initialStudies?: typeof fallbackStudies }) {
  const studies = initialStudies?.length ? initialStudies : fallbackStudies;

  const s = studies.find((x) => x.id === id) || studies[0];
  const brand = fallbackBrands.find((b) => b.name === s.brand);
  const details = (s as any).details;
  const currentIndex = studies.findIndex((x) => x.id === s.id);
  const prevStudy = currentIndex > 0 ? studies[currentIndex - 1] : null;
  const nextStudy = currentIndex < studies.length - 1 ? studies[currentIndex + 1] : null;
  const related = studies
    .filter((x) => x.id !== s.id)
    .sort((a, b) => {
      const aScore = (a.brand === s.brand ? 2 : 0) + (a.cat === s.cat ? 1 : 0);
      const bScore = (b.brand === s.brand ? 2 : 0) + (b.cat === s.cat ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  const sector = s.cat === "petrol" ? "Fuel" : "Grocery";
  const campaignType = s.cat === "petrol" ? "Fuel Loyalty Campaign" : "Grocery Loyalty Campaign";
  const rewardGroups = details?.rewardGroups ?? [];
  const activations = details?.activations ?? [];
  const mechanics = details?.mechanics ?? [];
  const gallery = details?.gallery ?? [s.img];
  const social = details?.social ?? [];
  const videos = details?.videos ?? [];
  const informationBlocks = [
    {
      label: "Client Objective",
      text: details?.challenge || s.summary,
    },
    {
      label: "Reward Strategy",
      text: rewardGroups.length
        ? `${rewardGroups.length} reward clusters built around high perceived value and practical usage.`
        : "Reward portfolio designed to maximize participation and redemption.",
    },
    {
      label: "Execution Model",
      text: mechanics.length
        ? `${mechanics.length} clear mechanics to drive repeat visits and measurable engagement.`
        : "Simple participation mechanics designed for scale and repeat behavior.",
    },
  ];

  const titleWords = s.title.split(" ");
  const titleStart = titleWords.slice(0, -2).join(" ");
  const titleEnd = titleWords.slice(-2).join(" ");

  const quickFacts = [
    { label: "Client", value: s.client },
    { label: "Country", value: s.location },
    { label: "Sector", value: sector },
    { label: "Year", value: s.year },
    { label: "Brand", value: s.brand },
    { label: "Campaign Type", value: campaignType },
  ];

  return (
    <>
      <PageHero
        eyebrow={s.cat === "petrol" ? "Fuel · Case Study" : "Grocery · Case Study"}
        title={titleStart ? <>{titleStart} <span className="text-[#F8AE01]">{titleEnd}</span></> : <>{titleEnd}</>}
        image={s.img}
        cta={{ label: "All Case Studies", href: "/work" }}
      >
        <div className="mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2 border border-[#F8AE01]/45 bg-[#F8AE01]/20 text-white tracking-tight" style={{ fontSize: "0.86rem" }}>
          <span className="text-[#F8AE01]" style={{ fontWeight: 700 }}>{s.client}</span>
          <span className="text-white/55">|</span>
          {!s.client.includes(s.location) && (
            <>
              <span>{s.location}</span>
              <span className="text-white/55">|</span>
            </>
          )}
          <span>{s.year}</span>
          <span className="text-white/55">|</span>
          <span>{s.brand}</span>
        </div>
      </PageHero>

      {/* OVERVIEW + KPI — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-7">
                <Eyebrow>Overview</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4.1rem)", lineHeight: 0.98, fontWeight: 800 }}>
                  Campaign at<br />
                  <em className="not-italic text-black">a Glance</em>
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-6 max-w-3xl" style={{ fontSize: "clamp(1rem, 1.35vw, 1.15rem)", lineHeight: 1.65 }}>
                  {s.summary}
                </p>
              </div>

              <div className="md:col-span-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
                  {s.results.map((r) => (
                    <article key={`${r.k}-${r.v}`} className="rounded-[24px] p-6 border-2 border-[#2E2784]/35 bg-[#F8AE01]/35" style={softShadow}>
                      <div className="text-[#2E2784]/55 tracking-[0.16em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                        {r.v}
                      </div>
                      <div className="text-[#2E2784] tracking-[-0.03em] mt-2" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", lineHeight: 1, fontWeight: 800 }}>
                        {r.k}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {quickFacts.map((fact, i) => (
                <article
                  key={fact.label}
                  className="rounded-[24px] p-6 border-2 border-[#2E2784]"
                  style={i % 2 === 0 ? { background: "#2E2784", ...softShadow } : { background: "rgba(248,174,1,0.35)", ...softShadow }}
                >
                  <div className={`${i % 2 === 0 ? "text-[#F8AE01]/90" : "text-[#2E2784]/45"} tracking-[0.16em] uppercase`} style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                    {fact.label}
                  </div>
                  <div className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-tight mt-3`} style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}>
                    {fact.value}
                  </div>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CAMPAIGN CONTEXT — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5">
                <Eyebrow onDark>Campaign</Eyebrow>
                <h2 className="text-white tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.1 }}>
                  {details?.campaignTitle || "How The Campaign Was Designed"}
                </h2>
                <p className="text-white/75 tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                  {details?.challenge || s.summary}
                </p>
              </div>

              <div className="md:col-span-7">
                <Eyebrow onDark>Information Structure</Eyebrow>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.05 }}>
                  What mattered most,
                  <br /><span className="text-[#F8AE01]">and why it worked.</span>
                </h3>

                <div className="mt-7 space-y-3">
                  {informationBlocks.map((block) => (
                    <div key={block.label} className="rounded-[18px] p-5 border border-[#F8AE01]/30 bg-[#F8AE01]/12" style={softShadow}>
                      <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                        {block.label}
                      </div>
                      <p className="text-white/90 tracking-tight mt-3" style={{ fontSize: "0.93rem", lineHeight: 1.6 }}>
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* REWARDS — rosa */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Reward Collection</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98, fontWeight: 800 }}>
              Premium rewards<br />
              <span className="text-black">people actually want.</span>
            </h2>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewardGroups.map((group: any, i: number) => (
                <article
                  key={group.title}
                  className="rounded-[28px] p-6"
                  style={i % 2 === 0 ? { background: "#2E2784", border: "2px solid #2E2784", ...softShadow } : { background: "rgba(255,255,255,0.35)", border: "2px solid rgba(255,255,255,0.5)", ...softShadow }}
                >
                  <div className={`${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.015em]`} style={{ fontSize: "1.08rem", fontWeight: 800, lineHeight: 1.25 }}>{group.title}</div>
                  <p className={`${i % 2 === 0 ? "text-white/75" : "text-[#2E2784]/75"} tracking-tight mt-3`} style={{ fontSize: "0.86rem", lineHeight: 1.55 }}>
                    {group.subtitle}
                  </p>
                  <div className="mt-5 space-y-2">
                    {group.items?.map((item: string) => (
                      <div key={item} className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-tight`} style={{ fontSize: "0.88rem", lineHeight: 1.45 }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ACTIVATIONS + MECHANICS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-12">
              <div className="md:col-span-6">
                <Eyebrow onDark>In-Store Experience</Eyebrow>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.05 }}>
                  Activations that turn
                  <br />footfall into engagement.
                </h3>
                <div className="mt-7 space-y-3">
                  {activations.length > 0 ? (
                    activations.map((item: string) => (
                      <div key={item} className="rounded-[18px] p-4 border border-[#F8AE01]/30 bg-[#F8AE01]/12 text-white/90 tracking-tight" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}>
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[18px] p-4 border border-[#F8AE01]/30 bg-[#F8AE01]/12 text-white/90 tracking-tight" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}>
                      Campaign assets were activated in high-traffic locations to increase visibility, participation and conversion.
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-6">
                <Eyebrow onDark>Mechanics</Eyebrow>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.05 }}>
                  Clear mechanics,
                  <br />strong repeat behavior.
                </h3>
                <div className="mt-7 space-y-3">
                  {mechanics.map((item: string) => (
                    <div key={item} className="rounded-[18px] p-4 border border-[#F8AE01]/30 bg-[#F8AE01]/12 text-white/90 tracking-tight" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GALLERY — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98, fontWeight: 800 }}>
              In-store assets,<br />
              <span className="text-black">POSM and campaign touchpoints.</span>
            </h2>

            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {gallery.map((img: string, i: number) => (
                <div key={`${img}-${i}`} className="rounded-[24px] overflow-hidden border border-white/40" style={softShadow}>
                  <ImageWithFallback src={img} alt={`${s.title} gallery ${i + 1}`} className="w-full h-[220px] object-cover" />
                </div>
              ))}
            </div>

            {social.length > 0 && (
              <>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60 mt-14" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  Social Media
                </div>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {social.slice(0, 3).map((img: string, i: number) => (
                    <div key={`${img}-${i}`} className="rounded-[24px] overflow-hidden border border-white/40" style={softShadow}>
                      <ImageWithFallback src={img} alt={`${s.title} social ${i + 1}`} className="w-full h-[220px] object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {videos.length > 0 && (
              <>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60 mt-14" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  Video
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  {videos.map((video: string, i: number) => (
                    <div key={`${video}-${i}`} className="rounded-[24px] overflow-hidden border border-white/40 bg-black" style={softShadow}>
                      <video className="w-full h-[280px] object-cover" controls preload="metadata" playsInline>
                        <source src={video} />
                      </video>
                    </div>
                  ))}
                </div>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* BRAND LINK — rosa */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            {brand && (
              <div className="rounded-[24px] p-8 flex flex-wrap items-center justify-between gap-6" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.45)" }}>
                <div>
                  <div className="text-[#2E2784]/60 tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>Featured Brand</div>
                  <div className="text-[#2E2784] tracking-tight mt-2" style={{ fontSize: "1.3rem", fontWeight: 800 }}>{brand.name}</div>
                </div>
                <button
                  onClick={() => go({ page: "brand-detail", id: brand.id })}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>Explore Brand</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* RELATED — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Related
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98, fontWeight: 800 }}>
              More stories,<br /><span className="text-black">same loyalty ambition.</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => go({ page: "study-detail", id: r.id })}
                  className="group rounded-[28px] overflow-hidden bg-[#2E2784] border border-white/15 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6">
                    <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                      {r.cat === "retail" ? "Grocery" : "Fuel"}
                    </div>
                    <div className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25 }}>{r.title}</div>
                    <div className="text-white/65 tracking-tight mt-3" style={{ fontSize: "0.85rem" }}>{r.client} · {r.location}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button
                onClick={() => prevStudy && go({ page: "study-detail", id: prevStudy.id })}
                disabled={!prevStudy}
                className={`group inline-flex items-center gap-3 px-1 py-1.5 transition-all ${prevStudy ? "text-[#2E2784] hover:opacity-75" : "text-[#2E2784]/45 cursor-not-allowed"}`}
              >
                <span className={`${prevStudy ? "text-[#2E2784]" : "text-[#2E2784]/45"}`}>
                  <ArrowLeft className="w-4 h-4" />
                </span>
                <span className="tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {prevStudy ? `Prev: ${prevStudy.title}` : "No previous"}
                </span>
              </button>

              <button
                onClick={() => nextStudy && go({ page: "study-detail", id: nextStudy.id })}
                disabled={!nextStudy}
                className={`group inline-flex items-center gap-3 px-1 py-1.5 transition-all ${nextStudy ? "text-[#2E2784] hover:opacity-75" : "text-[#2E2784]/45 cursor-not-allowed"}`}
              >
                <span className="tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {nextStudy ? `Next: ${nextStudy.title}` : "No next"}
                </span>
                <span className={`${nextStudy ? "text-[#2E2784]" : "text-[#2E2784]/45"}`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — blue */}
      <section className="relative pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.8rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  Let's Design
                  <br />
                  <span className="text-[#F8AE01]">Your Loyalty Campaign</span>
                </h2>
              </div>
              <div className="md:text-right">
                <button
                  onClick={() => go({ page: "contact" })}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-[#ffd95a] hover:text-[#2E2784]"
                >
                  <span>Book an Appointment</span>
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
