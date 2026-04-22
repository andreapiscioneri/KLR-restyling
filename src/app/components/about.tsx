import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { images, whatWeDeliver, aboutImpact, moreThanLoyalty, journey } from "../data";
import type { Route } from "../App";

export function About({ go }: { go: (r: Route) => void }) {
  return (
    <div className="pt-44 pb-48">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>About KLR</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          People First to Deliver<br /><span className="text-[#F8AE01]">the Best Results.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          KLR is a human-centered loyalty marketing agency. We combine qualitative and quantitative methodologies to design incentive-based solutions that foster customer loyalty and increase sales — for grocery retailers, petrol chains, and beyond.
        </p>
      </section>

      {/* HOW WE BRING LOYALTY TO LIFE */}
      <section className="max-w-6xl mx-auto px-8 mb-40">
        <div className={`rounded-[40px] overflow-hidden ${hairline} relative`} style={softShadow}>
          <div className="aspect-[16/9] overflow-hidden">
            <ImageWithFallback src={images.teamPhoto} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2784]/80 via-[#2E2784]/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
            <Eyebrow onDark>How We Bring Loyalty to Life</Eyebrow>
            <h2 className="text-white tracking-[-0.035em] mt-8 max-w-3xl" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.05 }}>
              The culture of loyalty<br /><span className="text-[#F8AE01]">starts within our team.</span>
            </h2>
          </div>
        </div>
        <p className="text-black tracking-tight max-w-3xl mt-12" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
          KLR is more than just a company — it is a family of open-minded people. We are flexible, quick, and smart to deliver all the services tailored specifically to each client's needs.
        </p>
        <p className="text-black tracking-tight max-w-3xl mt-6" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
          Our approach combines behavioural insight with creative design, powerful omnichannel communication, and exceptional reward collections. We help brands turn transactions into lasting relationships.
        </p>
      </section>

      {/* OUR ANSWER */}
      <section className="max-w-6xl mx-auto px-8 mb-40">
        <Eyebrow>Our Answer</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          We design loyalty campaigns that…
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {whatWeDeliver.map((v, i) => (
            <div key={v.title} className={`rounded-[32px] p-10 ${hairline}`} style={i === 1 ? { background: "#2E2784", ...softShadow } : { background: "#fff", ...softShadow }}>
              <h3 className={`${i === 1 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.03em]`} style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                {v.title}
              </h3>
              <p className={`${i === 1 ? "text-white" : "text-black"} tracking-tight mt-6`} style={{ fontSize: "1rem", lineHeight: 1.55 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE IMPACT */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>The Impact</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          What this delivers<br /><span className="text-[#F8AE01]">to you.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {aboutImpact.map((v) => (
            <div key={v.title} className={`rounded-[32px] p-10 bg-white ${hairline}`} style={softShadow}>
              <h3 className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700, lineHeight: 1.15 }}>
                {v.title}
              </h3>
              <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.55 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BIG STATEMENT */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <div className={`rounded-[40px] p-12 md:p-20 ${hairline}`} style={{ background: "#2E2784", ...softShadow }}>
          <h2 className="text-[#F8AE01] tracking-[-0.04em]" style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 0.95 }}>
            This isn't just Loyalty…<br /><span className="text-white">this is Marketing!</span>
          </h2>
          <p className="text-white tracking-tight mt-8 max-w-xl" style={{ fontSize: "1.125rem", lineHeight: 1.55 }}>
            And we make the process MORE than simple.
          </p>
        </div>
      </section>

      {/* MORE THAN A LOYALTY COMPANY */}
      <section className="max-w-6xl mx-auto px-8 mb-40">
        <Eyebrow>More than a loyalty company</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          We are more than a<br /><span className="text-[#F8AE01]">loyalty company.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {moreThanLoyalty.map((v) => (
            <div key={v.title} className={`rounded-[32px] p-10 bg-white ${hairline}`} style={softShadow}>
              <h3 className="text-[#2E2784] tracking-[-0.03em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, lineHeight: 1.1 }}>{v.title}</h3>
              <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.55 }}>{v.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CTA label="Discover More About Our Team" variant="dark" onClick={() => go({ page: "team" })} />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-6xl mx-auto px-8 mb-32">
        <Eyebrow>Our Journey</Eyebrow>
        <h2 className="text-[#2E2784] tracking-[-0.035em] mt-10 max-w-3xl" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, fontWeight: 700 }}>
          The Power of Our Experience<br /><span className="text-[#F8AE01]">is Rooted in Our History.</span>
        </h2>
        <div className="mt-14 flex flex-col md:flex-row md:overflow-x-auto md:snap-x gap-6 pb-4">
          {journey.map((j, i) => (
            <div key={i} className={`md:snap-start shrink-0 md:w-72 rounded-[28px] p-8 ${hairline}`} style={i % 2 === 0 ? { background: "#fff", ...softShadow } : { background: "#2E2784", ...softShadow }}>
              <div className={`tracking-[0.25em] uppercase ${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#F8AE01]"}`} style={{ fontSize: "0.7rem" }}>{j.year}</div>
              <div className={`${i % 2 === 0 ? "text-[#2E2784]" : "text-white"} tracking-[-0.02em] mt-6`} style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.25 }}>{j.title}</div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CTA label="Explore Our Full 10-Year Journey" variant="yellow" onClick={() => go({ page: "klr10" })} />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-5xl mx-auto px-8 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Join our team and let's shape together the world of loyalty.
        </h3>
        <CTA label="Keep in Touch!" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
