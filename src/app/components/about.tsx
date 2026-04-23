"use client";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, softShadow } from "./ui-bits";
import { images, journey } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

const values = [
  { title: "People First", desc: "People are at the center of everything we do — colleagues, clients, and customers." },
  { title: "Creativity", desc: "We bring fresh thinking to every campaign, every market, every challenge." },
  { title: "Personalised Approach", desc: "Every client receives tailor-made solutions built around their specific needs and audience." },
  { title: "Proactiveness", desc: "We anticipate needs and act before problems arise — always one step ahead." },
  { title: "Experience", desc: "10+ years and 340+ campaigns give us a depth of knowledge that truly sets us apart." },
];

const stats = [
  { k: "150+", v: "Retail Chains" },
  { k: "300+", v: "Successful Campaigns" },
  { k: "20+", v: "Countries" },
  { k: "10+", v: "Years of Experience" },
];

export function About({ go }: { go: (r: Route) => void }) {
  return (
    <>
      <PageHero
        eyebrow="About KLR"
        title={<>We put <span className="text-[#F8AE01]">People First</span><br />to Deliver the Best Results.</>}
        subtitle="Our unique, human-centred approach to loyalty design is the key to deliver successful campaigns through smart, incentive-based solutions."
        image={images.teamPhoto}
        cta={{ label: "Meet the Team", href: "/team" }}
      />

      {/* HOW WE BRING LOYALTY TO LIFE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Eyebrow>Our Approach</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.96, fontWeight: 800 }}>
                  How we bring<br />
                  <em className="not-italic text-black">Loyalty to Life</em>
                </h2>
                <p className="text-[#2E2784] tracking-tight mt-10" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  Our unique, human-centred approach to loyalty design is the key to deliver successful campaigns through smart, incentive-based solutions creating a positive, trustful and loyal relationship between retail chains and their clients.
                </p>
                <p className="text-[#2E2784] tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  We are experts in understanding customers through the lens of human behavior by combining qualitative and quantitative methodologies. We pride ourselves on our ability to deliver tailor-made solutions that are always adapted to specific client needs based on their target audience — identifying the right rewards and a compelling offer that will motivate them to take action, increasing sales and building brand loyalty.
                </p>
              </div>
              <div className="relative flex justify-center md:justify-end">
                <div className="absolute -bottom-10 -left-6 w-[200px] h-[200px] rounded-full bg-[#F8AE01]" />
                <div className="w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-4 border-white/40" style={softShadow}>
                  <ImageWithFallback src={images.aboutTonda} alt="How we bring Loyalty to Life" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 10 YEARS STATEMENT + STATS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <h2 className="text-white tracking-[-0.04em] max-w-4xl" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.95, fontWeight: 800 }}>
              10 Years in Loyalty Business,{" "}
              <span className="text-[#F8AE01]">More than 100 Retail Chains</span>{" "}
              as Clients.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 pt-10 border-t border-white/15">
              {stats.map((s) => (
                <div key={s.v}>
                  <div className="text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1, fontWeight: 800 }}>{s.k}</div>
                  <div className="text-white tracking-tight mt-3" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.2rem)" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CULTURE OF LOYALTY + VALUES — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
              <div>
                <Eyebrow>Our Culture</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  The culture of loyalty<br />starts within our team.
                </h2>
              </div>
              <div className="md:pt-16">
                <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  Our values are at the heart of everything that we do. We've put them in place to ensure that everyone who works at KLR feels empowered and ambitious too.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-[28px] p-6 md:p-8 border border-black/5"
                  style={i % 2 === 0 ? { background: "#2E2784", ...softShadow } : { background: "#fff", ...softShadow }}
                >
                  <h3
                    className={`${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.02em]`}
                    style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className={`${i % 2 === 0 ? "text-white/75" : "text-black"} tracking-tight mt-4`}
                    style={{ fontSize: "0.85rem", lineHeight: 1.55 }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* KLR IS MORE THAN A COMPANY — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <h2 className="text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800, fontStyle: "italic" }}>
                  "KLR is more than just a company: it is a family of open-minded people."
                </h2>
              </div>
              <div>
                <p className="text-white/90 tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65 }}>
                  Working at KLR means joining a unique organization that's a pioneer in the field of loyalty programs and that has repeatedly been named by our employees one of the best places to work at because we give them opportunities to grow and rewards them for their performance.
                </p>
                <p className="text-white/90 tracking-tight mt-6" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.65 }}>
                  We're hiring talented and diverse people who want to make a difference. Whether you're just starting out or have a long history of success, you have a right field here to realise your ambitions. Brilliant extraordinary people with unconventional approach are always welcome.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* THE POWER OF EXPERIENCE — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <Eyebrow>Our History</Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                  The Power of our Experience is Rooted in our History.
                </h2>
              </div>
              <div className="md:pt-16 space-y-6">
                <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  150 retail chains and more than 1000 successful campaigns around Europe cannot be wrong: we are experts with a long and successful history.
                </p>
                <p className="text-[#2E2784] tracking-tight" style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                  Our international vision is combined with a local market approach. With years of experience, we always offered an attractive range of physical rewards, our understanding, knowledge and creativity to help keep your shoppers shopping with you.
                </p>
                <div className="pt-4">
                  <CTA label="Explore KLR 10 Years" variant="dark" onClick={() => go({ page: "klr10" })} />
                </div>
              </div>
            </div>

            {/* Timeline cards */}
            <div className="mt-16 flex flex-col md:flex-row md:overflow-x-auto md:snap-x gap-6 pb-4">
              {journey.map((j, i) => (
                <div key={i} className="md:snap-start shrink-0 md:w-64 rounded-[24px] p-6 border border-black/5" style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
                  <div className={`tracking-[0.25em] uppercase ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#F8AE01]"}`} style={{ fontSize: "0.7rem" }}>{j.year}</div>
                  <div className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-white"} tracking-[-0.02em] mt-4`} style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1.3 }}>{j.title}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* JOIN OUR TEAM CTA — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h3 className="text-white tracking-[-0.04em] max-w-2xl" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1, fontWeight: 800 }}>
                Join our team and let's{" "}
                <span className="text-[#F8AE01]">shape together</span>{" "}
                the world of loyalty.
              </h3>
              <CTA label="Apply Now" variant="yellow" onClick={() => go({ page: "career" })} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
