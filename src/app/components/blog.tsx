import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eyebrow, CTA, hairline, softShadow } from "./ui-bits";
import { fallbackPosts, type Post } from "../data";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "../App";

const CATEGORIES = ["All", "Loyalty Marketing", "Retail Trends", "Leadership & Culture", "KLR Life"];

export function Blog({ go }: { go: (r: Route) => void }) {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const r = await fetch("https://klr-europe.com/wp-json/wp/v2/posts?per_page=12&_embed", { signal: ctrl.signal });
        if (!r.ok) throw new Error("insights fetch failed");
        const data = await r.json();
        const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, "&").replace(/&#8220;|&#8221;/g, '"').replace(/&nbsp;/g, " ");
        const normalized: Post[] = data.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: strip(p.title.rendered),
          date: String(p.date).slice(0, 10),
          excerpt: strip(p.excerpt.rendered).trim().slice(0, 220),
          img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          link: p.link,
          category: p._embedded?.["wp:term"]?.[0]?.[0]?.name || "Post",
        }));
        if (normalized.length) setPosts(normalized);
      } catch {
        /* fallback */
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const [featured, ...rest] = filtered;

  return (
    <div className="pt-44 pb-48 max-w-6xl mx-auto px-8">
      <section className="mb-16">
        <Eyebrow>Insights</Eyebrow>
        <h1 className="text-[#2E2784] tracking-[-0.04em] max-w-5xl mt-10" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.95, fontWeight: 700 }}>
          Ideas, trends & stories<br /><span className="text-[#F8AE01]">from KLR.</span>
        </h1>
        <p className="text-black tracking-tight max-w-2xl mt-10" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          Your go-to spot for fresh takes on loyalty marketing, industry trends, and the people behind our success.
        </p>
        {loading && (
          <div className="text-black tracking-tight mt-8" style={{ fontSize: "0.85rem" }}>
            Loading latest articles…
          </div>
        )}
      </section>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 mb-16">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-5 py-2 tracking-tight transition-all ${cat === c ? "bg-[#2E2784] text-white" : `bg-white text-black ${hairline} hover:text-[#2E2784]`}`}
            style={{ fontSize: "0.85rem" }}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <button
          onClick={() => go({ page: "blog-detail", slug: featured.slug })}
          className={`group block w-full rounded-[40px] overflow-hidden bg-white ${hairline} text-left mb-20`}
          style={softShadow}
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
              <ImageWithFallback src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="rounded-full px-3 py-1 bg-[#F8AE01] text-black tracking-[0.2em] uppercase" style={{ fontSize: "0.65rem" }}>
                    Featured
                  </span>
                  <span className="text-black tracking-tight" style={{ fontSize: "0.8rem" }}>{featured.date} · {featured.category}</span>
                </div>
                <h2 className="text-[#2E2784] tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.1 }}>
                  {featured.title}
                </h2>
                <p className="text-black tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.6 }}>{featured.excerpt}…</p>
              </div>
              <div className="inline-flex items-center gap-3">
                <span className="text-[#2E2784] border-b border-[#2E2784] pb-0.5" style={{ fontSize: "0.9rem" }}>Read the full story</span>
                <span className="w-9 h-9 rounded-full bg-[#2E2784] text-white flex items-center justify-center group-hover:bg-[#F8AE01] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </button>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {rest.map((p) => (
          <button
            key={p.id}
            onClick={() => go({ page: "blog-detail", slug: p.slug })}
            className={`group rounded-[32px] overflow-hidden bg-white ${hairline} text-left`}
            style={softShadow}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="tracking-[0.2em] uppercase text-[#2E2784]" style={{ fontSize: "0.65rem" }}>{p.category}</span>
                <span className="text-black tracking-tight" style={{ fontSize: "0.8rem" }}>{p.date}</span>
              </div>
              <h3 className="text-[#2E2784] tracking-[-0.02em] mt-5" style={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.25 }}>
                {p.title}
              </h3>
              <p className="text-black tracking-tight mt-4 line-clamp-3" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>{p.excerpt}…</p>
            </div>
          </button>
        ))}
      </div>

      {/* CLOSING CTA */}
      <section className="mt-32 flex flex-wrap items-center justify-between gap-6">
        <h3 className="text-[#2E2784] tracking-[-0.03em] max-w-xl" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>
          Are you ready to start something new together?
        </h3>
        <CTA label="Get in Touch" variant="yellow" onClick={() => go({ page: "contact" })} />
      </section>
    </div>
  );
}
