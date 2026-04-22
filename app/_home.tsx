"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { images, stats, brandPartners, studies, fallbackPosts } from "@/src/app/data";

const gradients = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
};

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen pt-40 pb-24 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={images.hero} alt="KLR Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#2E2784]/65" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-6xl mx-auto px-8 flex flex-col justify-end min-h-[calc(100vh-10rem)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="tracking-[0.3em] uppercase text-[#F8AE01]"
          style={{ fontSize: "0.65rem", fontWeight: 600 }}
        >
          Key to Loyalty in Retail
        </motion.div>

        <motion.h1
          className="text-white tracking-[-0.04em] max-w-5xl mt-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, fontWeight: 800 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We are Key to
          <br />
          <span className="text-[#F8AE01]">Loyalty in Retail.</span>
        </motion.h1>

        <motion.p
          className="text-white tracking-tight max-w-2xl mt-10"
          style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Built on trust and teamwork. Grounded in experience. Engaged in our clients' success and the happiness of their customers.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-white hover:text-[#2E2784]"
          >
            <span>Get in Touch</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">
        <AnimatedSection>
          <div>
            <h2 className="tracking-[0.14em] uppercase text-black" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)", lineHeight: 1.15 }}>
              We are
              <br />
              <span className="text-[#2E2784]">Key to Loyalty in Retail</span>
            </h2>
            <p className="mt-10 text-black" style={{ fontSize: "clamp(1.02rem, 1.35vw, 1.25rem)", lineHeight: 1.45 }}>
              At KLR, we apply a unique combination of teamwork, expertise and international experience to deliver bespoke loyalty solutions that work.
              <br />
              We know loyalty is more than just collecting points. It's about understanding your customers, your business and your markets and delivering solutions that help you achieve your goals.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute -bottom-10 -left-6 w-[200px] h-[200px] rounded-full bg-[#F8AE01]" />
            <div className="w-[330px] h-[330px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden bg-[#F8AE01]">
              <img src={images.aboutTonda} alt="Key to Loyalty in Retail" className="w-full h-full object-cover" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HumanCentered() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">
        <AnimatedSection>
          <div className="relative flex justify-center md:justify-start">
            <div className="absolute inset-0 m-auto w-[370px] h-[370px] md:w-[460px] md:h-[460px] rounded-full bg-[#F8AE01]" />
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden bg-[#2E2784]">
              <img src={images.human} alt="Human Centered Loyalty Marketing" className="w-full h-full object-cover" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="tracking-[0.14em] uppercase text-[#F8AE01]" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)", lineHeight: 1.15 }}>
            Human Centered
          </h2>
          <h3 className="tracking-[0.14em] uppercase text-white mt-2" style={{ fontSize: "clamp(1.3rem, 2.6vw, 2.5rem)", lineHeight: 1.15 }}>
            Loyalty Marketing
          </h3>
          <p className="mt-10 text-white/90" style={{ fontSize: "clamp(1.02rem, 1.35vw, 1.25rem)", lineHeight: 1.45 }}>
            One of the things that makes us special is that we're hands on. We personally handle and work with each and every client, which means we're always providing individualised attention.
          </p>
          <p className="mt-6 text-white/90" style={{ fontSize: "clamp(1.02rem, 1.35vw, 1.25rem)", lineHeight: 1.45 }}>
            We believe that loyalty is not about money or rewards, but about understanding your audience's needs and delivering what they want. We put the people at the core of our work, because only genuine and meaningful relationships can result in long-lasting customer loyalty.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternationalExperience() {
  return (
    <section className="relative text-black pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <h2 className="tracking-[0.14em] uppercase max-w-2xl text-[#2E2784]" style={{ fontSize: "clamp(1.8rem, 3.4vw, 3.5rem)", lineHeight: 1.1 }}>
            360deg Loyalty
            <br />
            International
            <br />
            Experience
          </h2>
          <p className="mt-16 max-w-5xl text-[#2E2784]" style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.55rem)", lineHeight: 1.4 }}>
            We've been working on international markets for years, and we know what it takes to win. We're flexible, quick, and smart enough to deliver all the services tailored specifically to each client's needs.
            <br />
            Our international presence with a strong network of partners all around the world allows us to offer the best prices and logistic efficiency.
          </p>
          <div className="mt-14 flex justify-end">
            <Link href="/services" className="text-[#2E2784] hover:text-black transition-colors" style={{ fontSize: "clamp(2rem, 3.2vw, 3.4rem)", letterSpacing: "0.12em" }}>
              Services <ArrowUpRight className="inline-block w-9 h-9" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const serviceBlocks = [
  {
    title: "Loyalty Marketing Strategic Development",
    body: "We develop winning loyalty marketing strategies that bring concrete results because we know how to understand our clients' business goals and their customers' needs.",
  },
  {
    title: "Loyalty Campaign Management",
    body: "KLR offers a stress free campaign execution and management. Our international network of local suppliers allows us to handle all the necessary operations required for a successful campaign.",
  },
  {
    title: "Loyalty Measurement and Analytics",
    body: "Each campaign for us is the opportunity to learn something new, this is the reason why campaign measurement and analytics is an important part of our working process.",
  },
];

function ServicesAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative text-white pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -top-20 -right-24 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        {serviceBlocks.map((item, i) => {
          const isOpen = i === open;
          return (
            <AnimatedSection key={item.title} delay={i * 0.03}>
              <div className={`py-8 ${i !== serviceBlocks.length - 1 ? "border-b border-white/10" : ""}`}>
                <button className="w-full flex items-start justify-between gap-6 text-left" onClick={() => setOpen(i)} type="button">
                  <h3 className="tracking-[0.1em]" style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)", lineHeight: 1.15 }}>
                    {item.title}
                  </h3>
                  {isOpen ? <ChevronUp className="w-8 h-8 text-[#F8AE01] shrink-0" /> : <ChevronDown className="w-8 h-8 text-[#F8AE01] shrink-0" />}
                </button>

                {isOpen && (
                  <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-8 items-start">
                    <p className="text-white/90 max-w-4xl" style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}>{item.body}</p>
                    <Link href="/services" className="text-white/90 hover:text-[#F8AE01] transition-colors" style={{ fontSize: "clamp(1.8rem, 2.8vw, 3rem)", letterSpacing: "0.1em" }}>
                      Read More
                    </Link>
                  </div>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="relative text-black pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10">
            <h2 className="tracking-[0.14em] uppercase text-[#2E2784]" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}>
              Why to choose
              <br />
              KLR
            </h2>
            <p className="text-[#2E2784]" style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.55rem)", lineHeight: 1.4 }}>
              150 retail chains that trusted us and more than 1000 successful campaigns around Europe cannot be wrong: we are experts with a long and successful history.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 pt-10 border-t border-[#2E2784]/30">
            <div>
              <div className="text-[#2E2784]" style={{ fontSize: "clamp(2.1rem, 4.1vw, 4.1rem)", lineHeight: 1 }}>{stats.retailers}</div>
              <div className="mt-3 text-[#2E2784]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.6rem)" }}>Retail Chains</div>
            </div>
            <div>
              <div className="text-[#2E2784]" style={{ fontSize: "clamp(2.1rem, 4.1vw, 4.1rem)", lineHeight: 1 }}>{stats.campaigns}</div>
              <div className="mt-3 text-[#2E2784]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.6rem)" }}>Successful Campaigns</div>
            </div>
            <div>
              <div className="text-[#2E2784]" style={{ fontSize: "clamp(2.1rem, 4.1vw, 4.1rem)", lineHeight: 1 }}>{stats.countries}</div>
              <div className="mt-3 text-[#2E2784]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.6rem)" }}>Countries</div>
            </div>
            <div>
              <div className="text-[#2E2784]" style={{ fontSize: "clamp(2.1rem, 4.1vw, 4.1rem)", lineHeight: 1 }}>{stats.years}</div>
              <div className="mt-3 text-[#2E2784]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.6rem)" }}>Years of Experience</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CustomersAndLogos() {
  const logos = brandPartners.filter((b) => b.logo).slice(0, 18);
  const rows = [logos.slice(0, 6), logos.slice(6, 12), logos.slice(12, 18)].filter((r) => r.length > 0);

  return (
    <section className="relative text-white pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="tracking-[0.14em] uppercase" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}>
                Our European
                <br />
                Customers
              </h2>
              <p className="mt-10" style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.55rem)", lineHeight: 1.4 }}>
                We design and deliver loyalty marketing campaigns with positive results. 10 Years of experience and 1000 campaigns completed in more than 10 countries are a guarantee that you can trust us.
              </p>
            </div>
            <div>
              <img src={images.map} alt="Our European customers" className="w-full h-auto" />
            </div>
          </div>

          <h3 className="text-[#F8AE01] tracking-[0.14em] uppercase text-center mt-20" style={{ fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)" }}>
            Trusted By 100+ clients:
          </h3>
          <div className="mt-10 space-y-8">
            {rows.map((row, rowIdx) => {
              const reverse = rowIdx % 2 === 1;
              const durations = [28, 32, 30];

              return (
                <div key={`logos-row-${rowIdx}`} className="logo-marquee">
                  <div
                    className="logo-marquee-track"
                    style={{
                      animationDuration: `${durations[rowIdx % durations.length]}s`,
                      animationDirection: reverse ? "reverse" : "normal",
                    }}
                  >
                    {[...row, ...row].map((logo, idx) => (
                      <div key={`${logo.name}-${idx}`} className="shrink-0 flex items-center justify-center px-7 md:px-10 min-h-[52px]">
                        <img
                          src={logo.logo as string}
                          alt={logo.name}
                          className="max-h-10 md:max-h-12 w-auto object-contain opacity-90"
                          style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CaseStudies() {
  const entries = studies.slice(0, 3);

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-20 -left-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <h2 className="tracking-[0.14em] uppercase" style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}>
              <span className="text-black">KLR Loyalty</span>
              <br />
              <span className="text-[#F8AE01]">Case Studies</span>
              <br />
              <span className="text-black">Experience</span>
            </h2>
            <p className="text-black max-w-lg" style={{ fontSize: "clamp(1.15rem, 1.6vw, 2rem)", lineHeight: 1.35 }}>
              Built on trust and teamwork. Grounded in experience.
              <br />
              Engaged in our clients success and happiness of their customers.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <Link key={entry.id} href={`/work/${entry.id}`} className="group block rounded-[28px] overflow-hidden bg-white/85 backdrop-blur-sm border border-white/60">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={entry.img} alt={entry.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <h3 className="mt-5 px-5 text-black" style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.9rem)", lineHeight: 1.28 }}>
                  {entry.title}
                </h3>
                <p className="mt-4 px-5 text-black/55" style={{ fontSize: "0.98rem", lineHeight: 1.55 }}>{entry.summary}</p>
                <span className="mt-5 mb-5 px-5 inline-block text-black" style={{ fontSize: "2rem", lineHeight: 1 }}>
                  Read More
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/work" className="text-[#2E2784] tracking-[0.4em] uppercase" style={{ fontSize: "0.95rem" }}>
              Load more
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function BlogPreview() {
  const posts = fallbackPosts.slice(0, 3);

  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.blue }}>
      <div className="absolute -bottom-24 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block rounded-[28px] overflow-hidden bg-white/92 backdrop-blur-sm border border-white/60">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <h3 className="mt-5 px-5 text-black" style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.9rem)", lineHeight: 1.28 }}>
                  {post.title}
                </h3>
                <p className="mt-4 px-5 text-black/55" style={{ fontSize: "0.98rem", lineHeight: 1.55 }}>{post.excerpt}</p>
                <span className="mt-5 mb-5 px-5 inline-block text-black" style={{ fontSize: "2rem", lineHeight: 1 }}>
                  Read More
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: gradients.yellow }}>
      <div className="absolute -top-24 right-20 w-[380px] h-[380px] rounded-full bg-white/15 blur-3xl" />
      <div className="max-w-6xl mx-auto px-8">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-white" style={{ fontSize: "clamp(2.4rem, 5vw, 5.4rem)", lineHeight: 1.02 }}>
                Are you ready to
                <br />
                <span className="text-[#2E2784] font-semibold">start something</span>
                <br />
                <span className="text-[#2E2784] font-semibold">new</span> together?
              </h2>
              <p className="mt-8 text-[#2E2784]" style={{ fontSize: "clamp(1.08rem, 1.5vw, 1.7rem)", lineHeight: 1.35 }}>
                Get in touch with us and we'll find the right solution for you
              </p>
            </div>
            <div className="md:text-right">
              <Link href="/contact" className="text-white hover:text-[#2E2784] transition-colors" style={{ fontSize: "clamp(2rem, 3.2vw, 3.4rem)", letterSpacing: "0.1em" }}>
                Get in Touch <ArrowUpRight className="inline-block w-9 h-9" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div>
      <Hero />
      <Intro />
      <HumanCentered />
      <InternationalExperience />
      <ServicesAccordion />
      <WhyChoose />
      <CustomersAndLogos />
      <CaseStudies />
      <BlogPreview />
      <ClosingCta />
    </div>
  );
}
