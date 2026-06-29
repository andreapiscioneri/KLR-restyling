import { notFound } from "next/navigation";
import { getCustomPages } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

type Block =
  | { type: "text";  title?: string; body: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "cta";   label: string; href: string; style?: "primary" | "secondary" };

type CustomPage = {
  slug:        string;
  title:       string;
  description?: string;
  blocks:      Block[];
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pages = (await getCustomPages()) as CustomPage[];
  const page = pages.find(p => p.slug === slug);
  if (!page) return {};
  return {
    title:       `${page.title} | KLR Europe`,
    description: page.description || "",
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;

  // Don't intercept known static routes
  const RESERVED = ["about","services","brands","work","blog","team","contact","10-years","career","geo","privacy","copyright","admin"];
  if (RESERVED.includes(slug)) notFound();

  const pages = (await getCustomPages()) as CustomPage[];
  const page = pages.find(p => p.slug === slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen pb-24">
      {/* Page title */}
      <div className="max-w-4xl mx-auto px-8 pt-32 pb-12">
        <h1 className="text-[#2E2784] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.05, fontWeight: 700 }}>
          {page.title}
        </h1>
        {page.description && (
          <p className="mt-6 text-black/70" style={{ fontSize: "1.1rem", lineHeight: 1.75 }}>
            {page.description}
          </p>
        )}
      </div>

      {/* Blocks */}
      <div className="max-w-4xl mx-auto px-8 space-y-16">
        {page.blocks.map((block, i) => {
          if (block.type === "text") {
            return (
              <section key={i}>
                {block.title && (
                  <h2 className="text-[#2E2784] tracking-[-0.025em] mb-6"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}>
                    {block.title}
                  </h2>
                )}
                <div className="text-black/80 prose prose-lg max-w-none"
                  style={{ lineHeight: 1.75, fontSize: "1.05rem" }}
                  dangerouslySetInnerHTML={{ __html: block.body }}
                />
              </section>
            );
          }
          if (block.type === "image") {
            return (
              <figure key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.url} alt={block.alt || ""} className="w-full rounded-[24px] object-cover" style={{ maxHeight: "560px" }} />
                {block.caption && (
                  <figcaption className="mt-3 text-center text-black/50 text-sm">{block.caption}</figcaption>
                )}
              </figure>
            );
          }
          if (block.type === "cta") {
            const isPrimary = block.style !== "secondary";
            return (
              <div key={i} className="flex justify-center">
                <a
                  href={block.href}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold tracking-tight transition-all"
                  style={isPrimary
                    ? { background: "#F8AE01", color: "#000", boxShadow: "0 0 32px rgba(248,174,1,0.3)" }
                    : { background: "#2E2784", color: "#fff" }}
                >
                  {block.label}
                </a>
              </div>
            );
          }
          return null;
        })}
      </div>
    </main>
  );
}
