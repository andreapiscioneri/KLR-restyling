"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Users, Star, TrendingUp, CheckCircle, LayoutTemplate, Rocket, Heart, Award, Eye, Smile, Lightbulb, Globe, Handshake } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PageHero } from "@/src/app/components/page-hero";
import { images, whatWeDeliver, aboutImpact, journey } from "@/src/app/data";

const G = {
  blue:   "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa:   "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

type CmsSection = Record<string, string>;
type AboutCms = Record<string, CmsSection>;

export function AboutClient() {
  const [cms, setCms] = useState<AboutCms>({});

  useEffect(() => {
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { if (d?.data?.about) setCms(d.data.about as AboutCms); })
      .catch(() => {});
  }, []);

  const hero              = cms.hero             || {};
  const whatWeDo          = cms.whatWeDo         || {};
  const brandStory        = cms.brandStory       || {};
  const journeyData       = cms.journey          || {};
  const moreThanLoyalty   = cms.moreThanLoyalty  || {};
  const vision            = cms.vision           || {};
  const ourSolution       = cms.ourSolution      || {};
  const impact            = cms.impact           || {};
  const corePromise       = cms.corePromise      || {};
  const closing           = cms.closing          || {};

  const visible = (s: CmsSection) => (s as Record<string, unknown>)._visible !== false;

  return (
    <>
      {/* ── 1. HERO ── */}
      {visible(hero) && <PageHero
        eyebrow={hero.eyebrow || "About KLR"}
        title={<><span>We Are Central</span><br /><span className="text-[#F8AE01]">to Loyalty.</span></>}
        subtitle={hero.subtitle || "KLR was born from friendship — different cultures, shared ambitions, and a belief that loyalty is built on trust. Over ten years, we've grown from a three-person office in Koper to a 43-person international team delivering campaigns across 20+ European markets."}
        image={hero.image || images.teamwork}
        cta={{ label: "Meet the Team", href: "/team" }}
      />}

      {/* ── 2. WHAT WE DO ── */}
      {visible(whatWeDo) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="tracking-[-0.04em] mb-10" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, fontStyle: "italic", color: "#2E2784" }}>
              {whatWeDo.eyebrow || "What We Do"}
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Left — big blue card */}
              <div className="rounded-[24px] p-8 md:p-10 flex items-center" style={{ background: "#2E2784", minHeight: "280px" }}>
                <p className="text-white tracking-tight" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)", lineHeight: 1.75 }}>
                  {whatWeDo.mainText || "We transform customer engagement in grocery and petrol retail into lasting loyalty — combining behavioural insight, emotional reward design, and measurable commercial outcomes. Easy to run for retailers and their marketing teams."}
                </p>
              </div>

              {/* Right — two cards stacked */}
              <div className="flex flex-col gap-5">
                <div className="rounded-[24px] p-8 flex items-center gap-4" style={{ background: "#2C2C34" }}>
                  <img src="/anniv.png" alt="KLR 10 Years" className="w-16 h-16 object-contain shrink-0 drop-shadow-[0_0_16px_rgba(248,174,1,0.4)]" />
                  <span className="text-white tracking-tight" style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.25 }}>{whatWeDo.badge1 || "Years of Expertise"}</span>
                </div>
                <div className="rounded-[24px] p-8 flex items-center" style={{ background: "#2E2784" }}>
                  <p className="text-white tracking-tight" style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55 }}>
                    {whatWeDo.badge2 || "Not just a rewards supplier. A strategic loyalty partner."}
                  </p>
                </div>
                <div className="rounded-[24px] p-8 flex items-center" style={{ background: "#2E2784" }}>
                  <p className="text-white tracking-tight" style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.55 }}>
                    {whatWeDo.badge3 || "We make loyalty campaigns easy to run."}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 3. BRAND STORY ── */}
      {visible(brandStory) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#2E2784]/08 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  {brandStory.eyebrow || "Brand Story"}
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  {brandStory.title || "Where Others Operate Loyalty Programs, We Design Emotional Loyalty Experiences"}
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-8" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.65 }}>
                  {brandStory.text || "KLR was founded in 2015 in Koper, Slovenia — a city at the crossroads of Central and Western Europe. From day one, our ambition was clear: bring world-class loyalty marketing to retailers who needed it most. Today, we are a 43-person team spanning 11 nationalities, running campaigns in 20+ markets."}
                </p>
              </div>

              {/* Anniversary photo — rounded, no decorative ring */}
              <div className="flex justify-center md:justify-end">
                <div
                  className="w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-[40px] overflow-hidden"
                  style={{ boxShadow: "0 40px 100px -24px rgba(46,39,132,0.25)" }}
                >
                  <img src={images.teamPhoto} alt="KLR Anniversary" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 4. OUR JOURNEY ── */}
      {visible(journeyData) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {journeyData.eyebrow || "Our Journey"}
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {journeyData.title || "10 Years of Growth"}
            </h2>

            {/* Desktop timeline */}
            <div className="hidden md:block mt-14 relative">
              <div className="absolute left-0 right-0 h-px bg-white/20" style={{ top: "2.25rem" }} />
              <div className="grid grid-cols-9 gap-2">
                {journey.map((j, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shrink-0 z-10"
                      style={{ background: i % 2 === 0 ? "#F8AE01" : "#C8B8F0" }}
                    />
                    <div className="mt-3 text-[#F8AE01] tracking-[0.15em] uppercase text-center" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                      {j.year}
                    </div>
                    <div className="mt-2 text-white/70 tracking-tight text-center" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
                      {j.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden mt-14 relative pl-6">
              <div className="absolute left-[0.6rem] top-2 bottom-2 w-px bg-white/20" />
              <div className="flex flex-col gap-6">
                {journey.map((j, i) => (
                  <div key={i} className="relative flex gap-4 items-start">
                    <div
                      className="absolute -left-6 mt-1 w-4 h-4 rounded-full border-2 border-white shrink-0"
                      style={{ background: i % 2 === 0 ? "#F8AE01" : "#C8B8F0" }}
                    />
                    <div>
                      <div className="text-[#F8AE01] tracking-[0.15em] uppercase" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                        {j.year}
                      </div>
                      <div className="mt-1 text-white/70 tracking-tight" style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>
                        {j.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex">
              <Link
                href="/10-years"
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
              >
                <span>Explore Our Full 10-Year Journey</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 5. MORE THAN A LOYALTY COMPANY ── */}
      {visible(moreThanLoyalty) && <section className="w-full">
        <img src="/fondo.png" alt="More Than a Loyalty Company" className="w-full h-auto block" />
        <div className="flex justify-center py-10" style={{ backgroundImage: "url('/back.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <Link
            href="/team"
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
          >
            <span>Discover More About Our Team</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>}

      {/* ── 6. KLR VISION ── */}
      {visible(vision) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 right-0 w-[480px] h-[480px] rounded-full bg-[#2E2784]/06 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[#2E2784]/05 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60 mb-4" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {vision.eyebrow || "KLR Vision"}
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {vision.title || "We Are Central to Loyalty"}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { Icon: Lightbulb, desc: vision.item1 || "We envision a future where loyalty campaigns are powerful experiences that customers look forward to.", bg: "#2E2784" },
                { Icon: Globe,     desc: vision.item2 || "Where retailers can run engaging loyalty programs without operational complexity.", bg: "#2C2C34" },
                { Icon: Handshake, desc: vision.item3 || "KLR aims to become the most trusted loyalty partner for retail and fuel chains across Europe and beyond — known for creativity, reliability, and exceptional campaign execution.", bg: "#2E2784" },
              ].map(({ Icon, desc, bg }, i) => (
                <div key={i} className="rounded-[28px] p-8" style={{ background: bg }}>
                  <Icon className="w-8 h-8 mb-5 text-[#F8AE01]" />
                  <p className="tracking-tight" style={{ fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(255,255,255,0.75)" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 7. OUR SOLUTION (shopping bags) ── */}
      {visible(ourSolution) && <section className="relative pt-28 md:pt-32 pb-32 md:pb-40 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {ourSolution.eyebrow || "Our Solution"}
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {ourSolution.title || "We Design Loyalty Campaigns That…"}
            </h2>

            <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 pt-8">
              {whatWeDeliver.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.2 }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: "easeInOut", delay: i * 0.2 }}
                    className="relative bg-[#2E2784] rounded-b-xl rounded-t-sm ] p-0 h-full min-h-[420px]"
                    style={{ border: "5px solid #F8AE01" }}
                  >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-14 border-t-[6px] border-x-[6px] border-[#F8AE01] rounded-t-full z-[-1]" />
                    <div className="h-full border-[3px] border-[#2E2784] bg-[#2E2784] p-6 md:p-8 flex flex-col items-center text-center">
                      <div className="text-[#F8AE01] tracking-[0.2em] font-black text-sm mb-14">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-black uppercase leading-[1.1] tracking-tighter text-[1.4rem] text-[#F8AE01]">
                        {item.title}
                      </h3>
                      <p className="text-[#F8AE01] tracking-tight text-[0.95rem] leading-relaxed mt-4 flex-1">
                        {item.desc}
                      </p>
                      <div className="flex gap-3 text-[#F8AE01] items-end justify-center w-full relative h-[60px] mt-6 pt-4">
                        {i === 0 && (
                          <>
                            <Users size={54} strokeWidth={1.5} className="absolute bottom-0 left-1/2 -translate-x-1/2" />
                            <Star size={20} fill="currentColor" className="absolute top-0 right-6" />
                            <Star size={14} fill="currentColor" className="absolute top-4 left-8" />
                          </>
                        )}
                        {i === 1 && (
                          <>
                            <TrendingUp size={48} strokeWidth={2.5} />
                            <CheckCircle size={32} strokeWidth={2.5} className="mb-2" />
                          </>
                        )}
                        {i === 2 && (
                          <>
                            <LayoutTemplate size={50} strokeWidth={1.5} className="absolute left-6 bottom-0" />
                            <Rocket size={36} strokeWidth={1.5} className="absolute right-8 bottom-2" />
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 8. LOYALTY FRAMEWORK ── */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F8AE01]/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #C8B8F0 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 w-full">
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  The KLR Loyalty Framework
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mb-10" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  Designing Emotional Loyalty
                </h2>
                <p className="text-[#2E2784]/80 tracking-tight mb-8" style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                  Our 3 Pillars of Loyalty:
                </p>
                <div className="space-y-4">
                  <div className="rounded-[24px] p-6" style={{ background: "#2C2C34" }}>
                    <Eye className="w-7 h-7 mb-3" style={{ color: "#F8AE01" }} />
                    <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "#F8AE01", color: "#2C2C34" }}>Desire</div>
                    <p className="text-white/80 leading-snug" style={{ fontSize: "0.95rem" }}>"Dream" High-Quality <span className="font-black text-white">Rewards</span> that Money Can't Buy</p>
                  </div>
                  <div className="rounded-[24px] p-6" style={{ background: "#C8B8F0" }}>
                    <Star className="w-7 h-7 mb-3" style={{ color: "#2E2784" }} fill="currentColor" />
                    <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "#2E2784", color: "#C8B8F0" }}>Experience</div>
                    <p className="text-[#2E2784] leading-snug" style={{ fontSize: "0.95rem" }}>High Participation is The Key to <span className="font-black italic">Real Engagement</span></p>
                  </div>
                  <div className="rounded-[24px] p-6" style={{ background: "#2E2784" }}>
                    <Smile className="w-7 h-7 mb-3" style={{ color: "#F8AE01" }} />
                    <div className="inline-block font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3" style={{ fontSize: "0.72rem", background: "#F8AE01", color: "#2E2784" }}>Satisfaction</div>
                    <p className="text-white/80 leading-snug" style={{ fontSize: "0.95rem" }}>High Perceived Value Rewards — <span className="font-black italic text-white block mt-1">Long Positive Memory Effect</span></p>
                  </div>
                </div>
              </div>

              {/* Venn diagram */}
              <div className="lg:w-1/2 w-full flex justify-center lg:justify-end items-center min-h-[450px]">
                <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex justify-center pt-8 sm:pt-10 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#2C2C34", background: "rgba(44,44,52,0.12)" }}>
                    <Eye className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#2C2C34" }} />
                  </div>
                  <div className="absolute bottom-4 left-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex items-end justify-start pb-10 pl-10 sm:pb-14 sm:pl-14 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#C8B8F0", background: "rgba(200,184,240,0.18)" }}>
                    <Star className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#9B7FD4" }} fill="currentColor" />
                  </div>
                  <div className="absolute bottom-4 right-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-[5px] flex items-end justify-end pb-10 pr-10 sm:pb-14 sm:pr-14 transition-transform hover:scale-105 duration-500" style={{ borderColor: "#2E2784", background: "rgba(46,39,132,0.10)" }}>
                    <Smile className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: "#2E2784" }} />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 z-20 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#2E2784] shadow-[0_0_40px_rgba(46,39,132,0.4)] animate-pulse">
                    <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#F8AE01] fill-[#F8AE01]" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 8. THE IMPACT ── */}
      {visible(impact) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#2E2784]/06 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {impact.eyebrow || "The Impact"}
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {impact.title || "What This Delivers To You"}
            </h2>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutImpact.map((item, i) => {
                const bg = i === 0 ? "#2E2784" : i === 1 ? "#2C2C34" : "#2E2784";
                const titleCol = "#F8AE01";
                return (
                  <div key={item.title} className="rounded-[28px] p-8" style={{ background: bg }}>
                    <h3 className="tracking-[-0.02em]" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3, color: titleCol }}>
                      {item.title}
                    </h3>
                    <p className="tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 9. THIS ISN'T JUST LOYALTY + CTA SERVICES ── */}
      {visible(corePromise) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-white tracking-[-0.04em]" style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)", fontWeight: 800, lineHeight: 1.1 }}>
                This isn't just Loyalty…<br />
                <span className="text-[#F8AE01]">this is Marketing!</span>
              </p>
            </div>

            {/* Pillar callout */}
            <div className="rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 justify-between" style={{ background: "#2C2C34" }}>
              <div className="md:max-w-xl">
                <div className="tracking-[0.3em] uppercase mb-4" style={{ fontSize: "0.65rem", fontWeight: 600, color: "#C8B8F0" }}>
                  {corePromise.eyebrow || "Our Core Promise"}
                </div>
                <h3 className="text-white tracking-[-0.03em]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)", fontWeight: 800, lineHeight: 1.1 }}>
                  {corePromise.title || "We Make the Process More Than Simple."}
                </h3>
                <p className="mt-6 tracking-tight" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
                  {corePromise.text || "From concept to in-store execution, logistics, brand licensing, and post-campaign reporting — we manage 100% of the campaign so your team stays focused on running your business."}
                </p>
              </div>
              <Link
                href={corePromise.ctaHref || "/services"}
                className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 shrink-0 hover:opacity-90 whitespace-nowrap"
                style={{ background: "#F8AE01", color: "#2C2C34" }}
              >
                <span style={{ fontWeight: 600 }}>{corePromise.ctaLabel || "Learn More About Our Services"}</span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(44,44,52,0.15)" }}>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* ── 10. CLOSING CTA ── */}
      {visible(closing) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-[#2E2784] tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 4rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  {closing.title || "Let's Build Something Together"}
                </h2>
                <p className="text-[#2E2784]/70 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
                  {closing.subtitle || "Whether you're a retailer looking for your next campaign or a brand wanting to reach millions — we'd love to hear from you."}
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href={closing.ctaHref || "/contact"}
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span>{closing.ctaLabel || "Get in Touch"}</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>}
    </>
  );
}
