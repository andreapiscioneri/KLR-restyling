"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight, LucideLinkedin } from "lucide-react";
import { softShadow, openMailtoDraft } from "./ui-bits";
import { leadership as fallbackLeadership, locations, images, stats as fallbackStats } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";
import { useState, useEffect } from "react";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa: "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

const locationPhotoByCity: Record<string, string> = {
  Koper: "/team/Koper.png",
  Rovato: "/team/Rovato.png",
  Milan: "/team/Milan.png",
  Düsseldorf: "/team/dusseldorf.png",
  Lille: "/team/Lille.png",
  Budapest: "/team/Budapest.png",
  Lublin: "/team/Lublin.png",
  Prague: "/team/Prague.png",
  Belgrade: "/team/Belgrade.png",
  Riga: "/team/Riga.png",
  Madrid: "/team/Madrid.png",
};

const linkedinById: Record<string, string> = {
  "antonio-finazzi": "https://www.linkedin.com/search/results/all/?keywords=Antonio%20Finazzi%20KLR",
  "stefano-finazzi": "https://www.linkedin.com/search/results/all/?keywords=Stefano%20Finazzi%20KLR",
  "sebastjan-kocjancic": "https://www.linkedin.com/search/results/all/?keywords=Sebastjan%20Kocjan%C4%8Di%C4%8D%20KLR",
  "marcello-leonardi": "https://www.linkedin.com/search/results/all/?keywords=Marcello%20Leonardi%20KLR",
  "olga-wojcik": "https://www.linkedin.com/search/results/all/?keywords=Olga%20Wojcik%20KLR",
  "marta-marga": "https://www.linkedin.com/search/results/all/?keywords=Marta%20Marga%20KLR",
  "jan-sahbaz-pergar": "https://www.linkedin.com/search/results/all/?keywords=Jan%20Sahbaz%20Pergar%20KLR",
  "riccardo-fogazzi": "https://www.linkedin.com/search/results/all/?keywords=Riccardo%20Fogazzi%20KLR",
  "nina-bjelivuk": "https://www.linkedin.com/search/results/all/?keywords=Nina%20Bjelivuk%20KLR",
  "natalia-molchanova": "https://www.linkedin.com/search/results/all/?keywords=Natalia%20Molchanova%20KLR",
};

// Row 1: founder Antonio + 4 leads
const row1Ids = ["antonio-finazzi", "sebastjan-kocjancic", "marcello-leonardi", "marta-marga", "natalia-molchanova"];
// Row 2: founder Stefano + 4 leads
const row2Ids = ["stefano-finazzi", "olga-wojcik", "jan-sahbaz-pergar", "riccardo-fogazzi", "nina-bjelivuk"];

function splitName(name: string) {
  const parts = name.trim().split(" ");
  const last = parts.pop()!;
  return { first: parts.join(" "), last };
}

function FounderCard({
  person,
  go,
}: {
  person: (typeof fallbackLeadership)[number];
  go: (r: Route) => void;
}) {
  const { first, last } = splitName(person.name);
  const li = linkedinById[person.id];
  return (
    <article
      className="rounded-[24px] p-5 md:p-7 flex flex-col items-center text-center"
      style={{ background: "#2E2784", ...softShadow }}
    >
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F8AE01] overflow-hidden flex-shrink-0 border-4 border-[#F8AE01]">
        <ImageWithFallback src={person.img} alt={person.name} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-white mt-5 tracking-[-0.01em] leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)", fontWeight: 800 }}>
        {first}
        <br />
        <span className="uppercase">{last}</span>
      </h3>

      <p className="text-[#F8AE01] mt-2 tracking-tight" style={{ fontSize: "0.85rem", fontWeight: 600, fontStyle: "italic" }}>
        {person.role}
      </p>

      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={() => go({ page: "team-detail", id: person.id })}
          className="inline-flex items-center gap-1 text-white/80 hover:text-[#F8AE01] transition-colors"
          style={{ fontSize: "0.75rem", fontWeight: 700 }}
        >
          Profile <ArrowUpRight className="w-3 h-3" />
        </button>
        {li && (
          <a
            href={li}
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-[#F8AE01] text-[#2E2784] flex items-center justify-center hover:bg-white transition-colors"
            aria-label={`LinkedIn – ${person.name}`}
          >
            <LucideLinkedin className="w-4 h-4" fill="currentColor" stroke="none" />
          </a>
        )}
      </div>
    </article>
  );
}

function TeamCard({
  person,
  go,
}: {
  person: (typeof fallbackLeadership)[number];
  go: (r: Route) => void;
}) {
  const { first, last } = splitName(person.name);
  const li = linkedinById[person.id];
  return (
    <article
      // Centrato con items-center, text-center e justify-center
      className="rounded-[24px] p-4 flex flex-col items-center text-center justify-center"
      style={{ background: "#F8AE01", ...softShadow }}
    >
      {/* Bordo blu (#2E2784) */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white border-4 border-[#2E2784] flex-shrink-0">
        <ImageWithFallback src={person.img} alt={person.name} className="w-full h-full object-cover" />
      </div>

      <h3 className="text-[#2E2784] mt-4 tracking-[-0.01em] leading-tight" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
        {first}
        <br />
        <span className="uppercase">{last}</span>
      </h3>

      <p className="text-[#2E2784]/75 tracking-tight mt-1.5" style={{ fontSize: "0.78rem", lineHeight: 1.3 }}>
        {person.role}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => go({ page: "team-detail", id: person.id })}
          className="inline-flex items-center gap-1 text-[#2E2784]/80 hover:text-black transition-colors"
          style={{ fontSize: "0.72rem", fontWeight: 700 }}
        >
          Profile <ArrowUpRight className="w-3 h-3" />
        </button>
        {li && (
          <a
            href={li}
            target="_blank"
            rel="noreferrer"
            className="w-6 h-6 rounded-full bg-[#2E2784] text-white flex items-center justify-center hover:bg-black transition-colors"
            aria-label={`LinkedIn – ${person.name}`}
          >
            <LucideLinkedin className="w-3.5 h-3.5" fill="currentColor" stroke="none" />
          </a>
        )}
      </div>
    </article>
  );
}

type TeamCmsData = {
  hero?: { eyebrow?: string; title?: string; subtitle?: string; image?: string };
  international?: { eyebrow?: string; title?: string };
  joinUs?: { eyebrow?: string; title?: string; subtitle?: string; contactEmail?: string; ctaLabel?: string; ctaHref?: string };
};

export function Team({ go }: { go: (r: Route) => void }) {
  const [leadership, setLeadership] = useState(fallbackLeadership);
  const [stats, setStats] = useState(fallbackStats);
  const [teamCms, setTeamCms] = useState<TeamCmsData>({});
  useEffect(() => {
    fetch("/api/content?type=leadership", { cache: "no-store" }).then(r => r.json()).then(j => { if (j.data?.length) setLeadership(j.data); }).catch(() => {});
    fetch("/api/content?type=stats", { cache: "no-store" }).then(r => r.json()).then(j => { if (j.data) setStats(j.data); }).catch(() => {});
    fetch("/api/content?type=pages", { cache: "no-store" })
      .then(r => r.json())
      .then(j => { if (j.data?.team) setTeamCms(j.data.team); })
      .catch(() => {});
  }, []);
  const get = (id: string) => leadership.find((p) => p.id === id)!;
  const row1 = row1Ids.map(get);
  const row2 = row2Ids.map(get);

  const testimonials = [
    { id: "sebastjan-kocjancic", text: "At KLR, everyone contributes. We solve complex multi-market challenges as one team." },
    { id: "marta-marga", text: "You have freedom to create, support to grow, and space to bring your perspective." },
    { id: "jan-sahbaz-pergar", text: "People here care about quality, speed, and helping each other get better every day." },
    { id: "nina-bjelivuk", text: "Different cultures, one rhythm. That's what makes this team strong." },
  ]
    .map((t) => ({ ...t, person: leadership.find((p) => p.id === t.id)! }))
    .filter((t) => Boolean(t.person));

  const heroEyebrow = teamCms.hero?.eyebrow || "Team";
  const heroTitle = teamCms.hero?.title || "Loyalty Starts With Us";
  const heroSubtitle = teamCms.hero?.subtitle || `A ${stats.people}-person team. ${stats.nationalities} nationalities. ${locations.length} locations across Europe. One shared passion: designing loyalty experiences that customers feel, trust, and value.`;
  const heroImage = teamCms.hero?.image || images.recruiting;
  const intlEyebrow = teamCms.international?.eyebrow || "International Presence";
  const intlTitle = teamCms.international?.title || "We Are Truly International";
  const joinEyebrow = teamCms.joinUs?.eyebrow || "Want to Work With Us?";
  const joinTitle = teamCms.joinUs?.title || "Join Our Team";
  const joinSubtitle = teamCms.joinUs?.subtitle || "We're always interested in meeting talented people who share our passion for loyalty and teamwork. Send us your details and we'll be in touch.";
  const visible = (section?: Record<string, string>) => (section as Record<string, unknown> | undefined)?._visible !== false;

  // Split title for coloring last words
  const heroTitleWords = heroTitle.trim().split(/\s+/);
  const heroTitleFirst = heroTitleWords.slice(0, -2).join(" ");
  const heroTitleLast = heroTitleWords.slice(-2).join(" ");

  return (
    <>
      {visible(teamCms.hero) && <PageHero
        eyebrow={heroEyebrow}
        title={heroTitleFirst ? <>{heroTitleFirst}<br /><span className="text-[#F8AE01]">{heroTitleLast}</span></> : <>{heroTitle}</>}
        subtitle={heroSubtitle}
        image={heroImage}
        cta={{ label: "Meet Our Leadership", href: "#leadership-grid" }}
      />}

      {/* LEADERSHIP TEAM — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div id="leadership-grid" className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Leadership Team
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              Our Leading People
            </h2>

            {/* Mobile: uniform 2-col grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
              {[...row1, ...row2].map((p) =>
                p.id === "antonio-finazzi" || p.id === "stefano-finazzi" ? (
                  <FounderCard key={p.id} person={p} go={go} />
                ) : (
                  <TeamCard key={p.id} person={p} go={go} />
                )
              )}
            </div>

            {/* Desktop: 2 rows — founder card + 4 team cards */}
            <div className="hidden lg:flex flex-col gap-4 mt-10">
              {/* Row 1 */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "1.45fr 1fr 1fr 1fr 1fr" }}>
                <FounderCard person={row1[0]} go={go} />
                {row1.slice(1).map((p) => (
                  <TeamCard key={p.id} person={p} go={go} />
                ))}
              </div>
              {/* Row 2 */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "1.45fr 1fr 1fr 1fr 1fr" }}>
                <FounderCard person={row2[0]} go={go} />
                {row2.slice(1).map((p) => (
                  <TeamCard key={p.id} person={p} go={go} />
                ))}
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-12 flex justify-end">
              <p className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.4rem, 3vw, 2.6rem)", fontWeight: 700 }}>
                driving{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700 }}>
                  a {stats.people}-Person Team
                </em>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* INTERNATIONAL PRESENCE — blue */}
      {visible(teamCms.international) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              {intlEyebrow}
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              {intlTitle.includes(",") ? (
                <>{intlTitle.split(",")[0]},<br /><span className="text-[#F8AE01]">{intlTitle.split(",").slice(1).join(",").trim()}</span></>
              ) : intlTitle.split(" ").length > 3 ? (
                <>{intlTitle.split(" ").slice(0, -2).join(" ")}<br /><span className="text-[#F8AE01]">{intlTitle.split(" ").slice(-2).join(" ")}</span></>
              ) : intlTitle}
            </h2>
            <p className="text-white/70 mt-5 tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              {locations.length} locations across Europe, from Slovenia to Latvia — one connected team.
            </p>

            {/* Location photos */}
            <div className="mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {locations.map((l) => {
                return (
                  <div key={l.city} className="relative rounded-[12px] overflow-hidden" style={{ aspectRatio: "2000 / 2956" }}>
                    <ImageWithFallback
                      src={locationPhotoByCity[l.city]}
                      alt={`${l.city}, ${l.country}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 px-3 py-3"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
                    >
                      <div style={{ fontSize: "0.58rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.8 }}>
                        {l.country}
                      </div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginTop: "2px", lineHeight: 1.1 }}>
                        {l.city}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* OUR CULTURE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Our Culture
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05 }}>
              What It's Like to Work at KLR
            </h2>
            <p className="text-[#2E2784]/80 tracking-tight mt-7 max-w-4xl" style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
              KLR is more than a company — it's a family of open-minded professionals from different cultures and backgrounds. We give people freedom to contribute, support to grow, and recognition for the value they bring.
            </p>

            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {testimonials.map((t) => (
                <article key={t.id} className="rounded-[24px] p-5 border border-white/40 bg-white/65" style={softShadow}>
                  <div className="flex items-center gap-3">
                    <img src={t.person.img} alt={t.person.name} className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                    <div>
                      <div className="text-[#2E2784] tracking-tight" style={{ fontSize: "0.9rem", fontWeight: 700 }}>{t.person.name}</div>
                      <div className="text-[#2E2784]/60 tracking-tight" style={{ fontSize: "0.75rem" }}>{t.person.role}</div>
                    </div>
                  </div>
                  <p className="text-[#2E2784]/85 tracking-tight mt-4" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>
                    "{t.text}"
                  </p>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* GUIDING PRINCIPLE — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="rounded-[40px] p-8 md:p-16 border border-white/15" style={{ background: "linear-gradient(145deg, #2E2784 0%, #241f69 100%)", ...softShadow }}>
              <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                Guiding Principle
              </div>
              <h2 className="text-[#F8AE01] tracking-[-0.04em] mt-7" style={{ fontSize: "clamp(2rem, 5.5vw, 4.7rem)", fontWeight: 800, lineHeight: 0.94 }}>
                People First.
                <br />
                <span className="text-white">Team Second.</span>
                <br />
                <span className="text-[#F8AE01]">Happy Clients and Customers Always.</span>
              </h2>
              <p className="text-white tracking-tight mt-10 max-w-2xl" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
                Because when people are valued, teams become stronger — and stronger teams create better results.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* JOIN OUR TEAM — rosa */}
      {visible(teamCms.joinUs) && <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                  {joinEyebrow}
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  {joinTitle}
                </h2>
                <p className="text-[#2E2784]/75 tracking-tight mt-6 max-w-md" style={{ fontSize: "1rem", lineHeight: 1.65 }}>
                  {joinSubtitle}
                </p>
              </div>

              {/* CONTACT FORM */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  openMailtoDraft(e.currentTarget, "info@klr-europe.com", "KLR Team Application");
                }}
                className="rounded-[32px] p-7 md:p-10 grid gap-5"
                style={{ background: "rgba(255,255,255,0.30)", border: "1px solid rgba(255,255,255,0.5)", ...softShadow }}
              >

                <div className="border-b border-[#2E2784]/20 pb-4">
                  <input
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/45 tracking-tight"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                <div className="border-b border-[#2E2784]/20 pb-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/45 tracking-tight"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                <div className="border-b border-[#2E2784]/20 pb-4">
                  <input
                    name="role"
                    placeholder="Role of interest"
                    className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/45 tracking-tight"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                <div className="border-b border-[#2E2784]/20 pb-4">
                  <input
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full bg-transparent outline-none text-[#2E2784] tracking-tight file:mr-4 file:rounded-full file:border-0 file:bg-[#2E2784] file:px-3 file:py-1.5 file:text-xs file:text-white"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>

                <div className="border-b border-[#2E2784]/20 pb-4">
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Short message"
                    className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/45 tracking-tight resize-none"
                    style={{ fontSize: "1rem" }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                  >
                    <span>Send Application</span>
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>}

      {/* CLOSING CTA — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.9rem)", lineHeight: 1.1, fontWeight: 700 }}>
                  Get in Touch
                </h3>
              </div>
              <div className="md:text-right">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                >
                  <span style={{ fontWeight: 700 }}>Get in Touch</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}