"use client";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { leadership as fallbackLeadership } from "../data";
import { PageHero } from "./page-hero";
import { ArrowLeft, Linkedin, Mail } from "lucide-react";
import type { Route } from "../App";

export function TeamDetail({ id, go }: { id: string; go: (r: Route) => void }) {
  const [leadership, setLeadership] = useState(fallbackLeadership);

  useEffect(() => {
    fetch("/api/content?type=leadership", { cache: "no-store" })
      .then(r => r.json())
      .then(j => { if (j.data?.length) setLeadership(j.data); })
      .catch(() => {});
  }, []);

  const p = leadership.find((x) => x.id === id) || leadership[0];
  const others = leadership.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="pb-48">
      <PageHero
        eyebrow={p.role}
        title={<>{p.name}<span className="text-[#F8AE01]">.</span></>}
        subtitle={p.bio}
        image={p.img}
        cta={{ label: "Back to Team", href: "/team" }}
      />
      <div className="max-w-6xl mx-auto px-8">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start mb-24 pt-20">
        <div className={`md:col-span-6 rounded-[40px] overflow-hidden ${hairline} bg-[#F8AE01]/20`} style={softShadow}>
          <div className="aspect-[4/5]">
            <ImageWithFallback src={p.img} alt={p.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-6 md:pt-8">
          <Eyebrow>{p.role}</Eyebrow>
          <h1 className="text-black tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, fontWeight: 700 }}>
            {p.name}<span className="text-[#F8AE01]">.</span>
          </h1>
          <p className="text-black tracking-tight mt-10 max-w-md" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>{p.bio}</p>

          <div className="mt-10 flex gap-3">
            <button className={`w-11 h-11 rounded-full bg-[#2E2784] text-white flex items-center justify-center hover:bg-[#F8AE01] hover:text-black transition-all`}>
              <Linkedin className="w-4 h-4" />
            </button>
            <button className="w-11 h-11 rounded-full bg-[#2E2784] text-white flex items-center justify-center hover:bg-[#F8AE01] hover:text-black transition-all">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div className={`rounded-[40px] p-12 md:p-20 mb-24 ${hairline}`} style={{ ...softShadow, background: "#2E2784" }}>
        <div className="text-[#F8AE01] tracking-[-0.03em]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.15, fontWeight: 600 }}>
          "{p.quote}"
        </div>
        <div className="tracking-[0.2em] uppercase text-white mt-10" style={{ fontSize: "0.7rem" }}>— {p.name}</div>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-24">
        <div className="text-black tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, lineHeight: 1.15 }}>
          Want to work with {p.name.split(" ")[0]}?
        </div>
        <CTA label="Get in touch" variant="yellow" onClick={() => go({ page: "contact" })} />
      </div>

      {/* OTHER FOUNDERS */}
      <div>
        <Eyebrow>More from the team</Eyebrow>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {others.map((o) => (
            <button
              key={o.id}
              onClick={() => go({ page: "team-detail", id: o.id })}
              className={`group rounded-[32px] overflow-hidden bg-white ${hairline} text-left flex`}
              style={softShadow}
            >
              <div className="w-2/5 aspect-square overflow-hidden bg-[#F8AE01]/20">
                <ImageWithFallback src={o.img} alt={o.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="tracking-[0.2em] uppercase text-[#F8AE01]" style={{ fontSize: "0.65rem" }}>{o.role}</div>
                <div className="text-black tracking-[-0.02em] mt-2" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{o.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
