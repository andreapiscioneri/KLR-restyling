"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight, LucideLinkedin } from "lucide-react";
import { softShadow } from "./ui-bits";
import { leadership, locations, images, stats } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
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
  person: (typeof leadership)[number];
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
  person: (typeof leadership)[number];
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

export function Team({ go }: { go: (r: Route) => void }) {
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

  const openRoles = [
    {
      title: "Account Manager, Loyalty Campaigns",
      location: "Milan / Hybrid",
      desc: "Lead retail client relationships and coordinate campaign delivery across teams.",
    },
    {
      title: "Campaign Operations Specialist",
      location: "Koper / Hybrid",
      desc: "Drive execution excellence across timelines, suppliers and in-store rollout quality.",
    },
    {
      title: "Graphic & Packaging Designer",
      location: "Rovato / Hybrid",
      desc: "Create campaign-ready product collections, POSM and premium packaging systems.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Team"
        title={<>Loyalty Starts<br /><span className="text-[#F8AE01]">With Us</span></>}
        subtitle={`A ${stats.people}-person team. ${stats.nationalities} nationalities. 10 locations across Europe. One shared passion: designing loyalty experiences that customers feel, trust, and value.`}
        image={images.teamPhoto}
        cta={{ label: "Meet Our Leadership", href: "#leadership-grid" }}
      />

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
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#F8AE01]/70" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              International Presence
            </div>
            <h2 className="text-white tracking-[-0.035em] mt-4 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              We Are Truly<br /><span className="text-[#F8AE01]">International</span>
            </h2>
            <p className="text-white/70 mt-5 tracking-tight" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
              10 locations across Europe, from Slovenia to Latvia — one connected team.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10 md:mt-14">
              {locations.map((l, i) => (
                <div
                  key={l.city}
                  className="rounded-[20px] p-4 md:p-5 border border-white/12"
                  style={
                    i % 2 === 0
                      ? { background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)", ...softShadow }
                      : { background: "linear-gradient(145deg, #F8AE01 0%, #ffc63b 100%)", ...softShadow }
                  }
                >
                  <div className={`tracking-[0.18em] uppercase ${i % 2 === 0 ? "text-white/60" : "text-[#2E2784]/70"}`} style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                    {l.country}
                  </div>
                  <div className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-[-0.02em] mt-2`} style={{ fontSize: "1.08rem", fontWeight: 700 }}>
                    {l.city}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

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

      {/* JOIN OUR TEAM — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
              Want to Work With Us?
            </div>
            <h2 className="text-[#2E2784] tracking-[-0.035em] mt-4 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
              Join Our Team
            </h2>
            <p className="text-[#2E2784]/80 tracking-tight max-w-2xl mt-8" style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}>
              We're always interested in meeting talented people who share our passion for loyalty and teamwork.
            </p>

            {/* OPEN ROLES */}
            <div className="mt-10 rounded-[28px] p-6 md:p-8 border border-[#2E2784]/12" style={{ background: "rgba(255,255,255,0.3)" }}>
              <div className="text-[#2E2784]/60 tracking-[0.18em] uppercase mb-6" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                Open roles
              </div>
              <div className="space-y-4">
                {openRoles.map((r) => (
                  <div
                    key={r.title}
                    className="rounded-[18px] p-5 border border-white/10 flex flex-wrap items-start justify-between gap-4 transition-transform hover:scale-[1.01]"
                    style={{ background: "#2E2784", ...softShadow }}
                  >
                    <div className="flex-1 min-w-[280px]">
                      <div className="text-white tracking-tight" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{r.title}</div>
                      <div className="text-white/60 tracking-tight mt-1" style={{ fontSize: "0.85rem" }}>{r.location}</div>
                      <p className="text-white/85 tracking-tight mt-3" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>{r.desc}</p>
                    </div>
                    <a
                      href="mailto:info@klr-europe.com?subject=Application%20for%20KLR%20Open%20Role"
                      className="inline-flex items-center gap-1.5 text-[#F8AE01] hover:text-white transition-colors"
                      style={{ fontSize: "0.85rem", fontWeight: 700 }}
                    >
                      Apply via email <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* APPLICATION FORM */}
            <form
              method="POST"
              action="https://formsubmit.co/info@klr-europe.com"
              encType="multipart/form-data"
              className="mt-14 rounded-[40px] p-6 md:p-14 border border-[#2E2784]/10 grid md:grid-cols-2 gap-x-8 gap-y-6"
              style={{ background: "rgba(255, 255, 255, 0.25)", ...softShadow }}
            >
              <input type="hidden" name="_subject" value="KLR Team Application" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="/thank-you" />

              <div className="border-b border-[#2E2784]/20 pb-4">
                <input
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/50 tracking-tight"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div className="border-b border-[#2E2784]/20 pb-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/50 tracking-tight"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div className="border-b border-[#2E2784]/20 pb-4">
                <select
                  name="role_interest"
                  defaultValue=""
                  required
                  className="w-full bg-transparent outline-none text-[#2E2784] tracking-tight"
                  style={{ fontSize: "1rem" }}
                >
                  <option value="" disabled>Role of interest / Open application</option>
                  {openRoles.map((r) => (
                    <option key={r.title} value={r.title}>{r.title}</option>
                  ))}
                  <option value="Open application">Open application</option>
                </select>
              </div>

              <div className="border-b border-[#2E2784]/20 pb-4">
                <input
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full bg-transparent outline-none text-[#2E2784] tracking-tight file:mr-4 file:rounded-full file:border-0 file:bg-[#2E2784] file:px-3 file:py-1.5 file:text-xs file:text-white"
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              <div className="border-b border-[#2E2784]/20 pb-4 md:col-span-2">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Short message"
                  className="w-full bg-transparent outline-none text-[#2E2784] placeholder:text-[#2E2784]/50 tracking-tight resize-none"
                  style={{ fontSize: "1rem" }}
                />
              </div>

              <div className="md:col-span-2 mt-4">
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
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-white tracking-[-0.03em]" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.9rem)", lineHeight: 1.1, fontWeight: 700 }}>
                  Keep in Touch!
                </h3>
              </div>
              <div className="md:text-right">
                <a
                  href="/contacts/"
                  className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-[#2E2784] hover:bg-white"
                >
                  <span style={{ fontWeight: 700 }}>Keep in Touch!</span>
                  <span className="w-8 h-8 rounded-full bg-[#2E2784]/10 flex items-center justify-center">
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