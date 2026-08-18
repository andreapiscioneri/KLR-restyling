"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Target, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AuthorAvatar } from "./author-avatar";
import { Eyebrow } from "./ui-bits";
import { fallbackPosts, type Post } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  useEditMode, useCollectionEditor, EditableText, EditableImage, EditToolbar,
  type CustomBlock, newBlockId, blankBlock, InsertBlockButton, BlockShell, EditableVideoUrl,
} from "./inline-edit";
import { VideoEmbed } from "./video-embed";
import { Lightbox, type LightboxState } from "./lightbox";
import type { Route } from "../App";

const BLOCK_LABELS: Record<string, string> = { text: "Testo", image: "Immagine", gallery: "Galleria", video: "Video" };
const BLOCK_BG = ["#241f69", "#F8AE01", "#1a1752"];

const COLORS = {
  navy: "#1a1752",       // Sfondo pagina profondo
  purpleBox: "#241f69",  // Sfondo dei Box (più chiaro del navy)
  gold: "#F8AE01",       // Giallo per accenti e titoletti
  whiteText: "#f8f9fa",  // Bianco sporco per massima leggibilità del testo
};

type FullPost = Post & { 
  contentHtml?: string; 
  authorName?: string; 
  authorAvatar?: string;
};

type BlogDetailProps = {
  slug: string;
  go: (r: Route) => void;
  initialPost?: FullPost;
  initialOthers?: FullPost[];
};

export function BlogDetail({ slug, go, initialPost, initialOthers }: BlogDetailProps) {
  const baseInitial: FullPost = initialPost || fallbackPosts.find((p) => p.slug === slug) || fallbackPosts[0];
  const editMode = useEditMode();
  const editor = useCollectionEditor<any>("posts", "slug", baseInitial.slug, editMode);
  const editing = editMode && editor.ready;
  const [openImageEditor, setOpenImageEditor] = useState<"hero" | "avatar" | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const openLightbox = (images: string[], index: number) => setLightbox({ images, index });
  const post: FullPost = {
    ...baseInitial,
    ...(editor.current ?? {}),
    link: `/blog/${baseInitial.slug}`,
    authorName: (editor.current ?? baseInitial).authorName || "KLR Editorial Team",
  };
  const contentRef = useRef<HTMLDivElement>(null);

  const layoutMode: "default" | "custom" = (post as any).layoutMode === "custom" ? "custom" : "default";
  const customBlocks: CustomBlock[] = Array.isArray((post as any).layoutBlocks) ? (post as any).layoutBlocks : [];
  function switchToCustomLayout() {
    if (customBlocks.length > 0) { editor.patch({ layoutMode: "custom" }); return; }
    const seeded: CustomBlock[] = [
      { id: newBlockId(), type: "text", text: post.excerpt || "" },
      { id: newBlockId(), type: "text", text: "" },
    ];
    editor.patch({ layoutMode: "custom", layoutBlocks: seeded });
  }
  function switchToDefaultLayout() { editor.patch({ layoutMode: "default" }); }
  function updateBlock(idx: number, patch: Partial<CustomBlock>) {
    editor.patch({ layoutBlocks: customBlocks.map((b, i) => (i === idx ? ({ ...b, ...patch } as CustomBlock) : b)) });
  }
  function removeBlock(idx: number) { editor.patch({ layoutBlocks: customBlocks.filter((_, i) => i !== idx) }); }
  function insertBlockAt(idx: number, type: CustomBlock["type"]) {
    const next = customBlocks.slice();
    next.splice(idx, 0, blankBlock(type));
    editor.patch({ layoutBlocks: next });
  }
  function moveBlockIdx(idx: number, dir: -1 | 1) {
    const next = customBlocks.slice();
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    editor.patch({ layoutBlocks: next });
  }

  const others = (initialOthers?.length ? initialOthers : fallbackPosts).filter((p) => p.slug !== post.slug).slice(0, 3);

  // LOGICA DEL TITOLO HERO: Dividiamo le parole per colorarle
  const titleWords = post.title ? post.title.split(" ") : [];
  const titleFirstPart = titleWords.slice(0, 2).join(" ");
  const titleSecondPart = titleWords.slice(2).join(" ");

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#F8AE01] selection:text-[#1a1752]" style={{ background: COLORS.navy }}>
      
      {/* INIEZIONE CSS: Tutti i titoletti (h3, h4) diventano gialli */}
      <style dangerouslySetInnerHTML={{ __html: `
        .klr-editorial-content * {
          color: #f8f9fa !important;
          background-color: transparent !important;
          font-family: inherit !important;
        }
        
        .klr-editorial-content p {
          font-size: 1rem !important;
          line-height: 1.75 !important;
          margin-bottom: 1.75rem !important;
          font-weight: 300 !important;
          opacity: 0.9 !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content p {
            font-size: 1.15rem !important;
            margin-bottom: 2rem !important;
          }
        }

        .klr-editorial-content h1, 
        .klr-editorial-content h2 {
          color: ${COLORS.gold} !important;
          font-size: clamp(2.2rem, 5vw, 3.5rem) !important;
          font-weight: 900 !important;
          letter-spacing: -0.05em !important;
          line-height: 1.05 !important;
          margin-top: 4.5rem !important;
          margin-bottom: 1.5rem !important;
        }

        /* MODIFICA: Ora h3 e h4 forzati in Giallo Oro */
        .klr-editorial-content h3,
        .klr-editorial-content h4 {
          color: ${COLORS.gold} !important;
          font-size: 1.3rem !important;
          font-weight: 800 !important;
          letter-spacing: -0.02em !important;
          margin-top: 2.5rem !important;
          margin-bottom: 0.75rem !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content h3,
          .klr-editorial-content h4 {
            font-size: 1.75rem !important;
            margin-top: 3.5rem !important;
            margin-bottom: 1rem !important;
          }
        }

        .klr-editorial-content img,
        .klr-editorial-content video,
        .klr-editorial-content iframe {
          width: 100% !important;
          height: auto !important;
          border-radius: 30px !important;
          margin: 4.5rem 0 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }

        .klr-editorial-content a {
          color: ${COLORS.gold} !important;
          text-decoration: none !important;
          font-weight: 700 !important;
          border-bottom: 2px solid rgba(248,174,1,0.3) !important;
          transition: all 0.3s ease !important;
        }

        .klr-editorial-content a:hover {
          border-bottom-color: ${COLORS.gold} !important;
        }

        .klr-editorial-content blockquote {
          border-left: 5px solid ${COLORS.gold} !important;
          background: rgba(255,255,255,0.04) !important;
          padding: 1.5rem 1.5rem !important;
          margin: 2rem 0 !important;
          border-radius: 0 20px 20px 0 !important;
          font-size: 1.1rem !important;
          font-weight: 600 !important;
          font-style: italic !important;
          line-height: 1.5 !important;
          letter-spacing: -0.01em !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content blockquote {
            padding: 2.5rem 3rem !important;
            margin: 3.5rem 0 !important;
            border-radius: 0 28px 28px 0 !important;
            font-size: 1.6rem !important;
          }
        }

        .klr-editorial-content ul, 
        .klr-editorial-content ol {
          margin-bottom: 2.5rem !important;
          padding-left: 1.75rem !important;
        }

        .klr-editorial-content li {
          margin-bottom: 0.75rem !important;
          font-size: 1rem !important;
          line-height: 1.65 !important;
        }

        @media (min-width: 768px) {
          .klr-editorial-content li {
            font-size: 1.15rem !important;
            margin-bottom: 0.85rem !important;
            line-height: 1.7 !important;
          }
        }
        
        .klr-editorial-content strong,
        .klr-editorial-content b {
          font-weight: 800 !important;
          color: #ffffff !important;
        }
      `}} />

      {/* 1. HERO */}
      <PageHero
        eyebrow={editing ? (
          <EditableText as="span" editing value={post.category || ""} onCommit={(v) => editor.patch({ category: v })} />
        ) : post.category}
        title={editing ? (
          <EditableText as="span" editing value={post.title || ""} onCommit={(v) => editor.patch({ title: v })}
            className="font-black tracking-tighter leading-[0.9]"/>
        ) : (
          <span className="font-black tracking-tighter leading-[0.9]">
            <span className="text-white">{titleFirstPart} </span>
            {titleSecondPart && <span className="text-[#F8AE01]">{titleSecondPart}</span>}
          </span>
        )}
        subtitle={post.excerpt}
        image={post.img}
        editingImage={editing}
        onImageChange={(v) => editor.patch({ img: v })}
        imageEditorOpen={openImageEditor === "hero"}
        onImageEditorOpenChange={(o) => setOpenImageEditor(o ? "hero" : null)}
        ctaEditing={editing}
        cta={{ label: "Back to Insights", href: "/blog" }}
        extraCornerControls={editing && (
          <EditableImage editing variant="corner" cornerTopRem={11} label="Cambia avatar autore"
            src={post.authorAvatar || ""} onCommit={(v) => editor.patch({ authorAvatar: v })}
            openControlled={openImageEditor === "avatar"} onOpenChange={(o) => setOpenImageEditor(o ? "avatar" : null)}
            alt="" className="hidden"/>
        )}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 space-y-16">

        {layoutMode === "default" && (
          <>
        {/* 2. OVERVIEW & AUTHOR */}
        {post.excerpt && post.excerpt.trim() && (
        <AnimatedSection>
          <div className="rounded-[40px] border border-white/10 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Author Profilo */}
            <div className="lg:w-1/3 p-10 md:p-14 flex flex-col items-center justify-center text-center" style={{ background: COLORS.purpleBox }}>
              <div className="w-32 h-32 rounded-full border-4 border-[#F8AE01] overflow-hidden mb-6 flex items-center justify-center">
                <AuthorAvatar src={post.authorAvatar} name={post.authorName} size={128} />
              </div>
              <div className="text-white/50 font-bold tracking-[0.2em] uppercase text-xs mb-2">Author</div>
              {/* MODIFICA: Nome Autore Giallo Oro */}
              <h3 className="text-[#F8AE01] text-xl md:text-3xl font-black tracking-tight leading-none mb-4">{post.authorName}</h3>
              {post.date && <div className="text-white/60 text-sm tracking-tight">{post.date}</div>}
            </div>

            {/* Right: Overview/Estratto (Giallo) */}
            <div className="lg:w-2/3 p-10 md:p-14 flex flex-col justify-center" style={{ background: COLORS.gold }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#1a1752] flex items-center justify-center text-[#F8AE01] rotate-3">
                  <Target size={24} strokeWidth={3} />
                </div>
                <div className="text-[#2E2784] font-bold tracking-[0.2em] uppercase text-xs">Executive Summary</div>
              </div>

              <h2 className="text-[#2E2784] text-2xl md:text-5xl font-black tracking-tighter mb-6 leading-none italic">
                The core concept.
              </h2>
              <EditableText as="p" editing={editing} value={post.excerpt || ""} multiline outlineColor="#2E2784"
                onCommit={(v) => editor.patch({ excerpt: v })}
                className="text-[#1a1752] text-base md:text-3xl font-medium leading-snug tracking-tight border-l-4 border-[#2E2784] pl-5 md:pl-8 opacity-90"/>
            </div>

          </div>
        </AnimatedSection>
        )}

        {/* 3. CONTENUTO INTERNO: Tutti gli h3/h4 nel contenuto saranno gialli grazie all'iniezione CSS */}
        {(post.contentHtml && post.contentHtml.trim()) || editing ? (
          <AnimatedSection>
            <div className="rounded-[50px] border border-white/10 py-16 md:py-24 px-6 md:px-12" style={{ background: COLORS.purpleBox }}>
              <div className="max-w-3xl mx-auto">
                <div
                  ref={contentRef}
                  className="klr-editorial-content"
                  contentEditable={editing}
                  suppressContentEditableWarning={editing}
                  onBlur={editing ? () => editor.patch({ contentHtml: contentRef.current?.innerHTML ?? "" }) : undefined}
                  style={editing ? { outline: "2px dashed rgba(248,174,1,0.5)", outlineOffset: 8, borderRadius: 12, minHeight: 80 } : undefined}
                  dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
                />
              </div>
            </div>
          </AnimatedSection>
        ) : null}
          </>
        )}

        {layoutMode === "custom" && (
          <div>
            {editing && (
              <div className="flex justify-center py-3">
                <InsertBlockButton onInsert={(t) => insertBlockAt(0, t)} />
              </div>
            )}
            {customBlocks.map((block, idx) => {
              const bg = BLOCK_BG[idx % BLOCK_BG.length];
              const controls = editing ? {
                onUp: () => moveBlockIdx(idx, -1), onDown: () => moveBlockIdx(idx, 1), onDelete: () => removeBlock(idx),
                disabledUp: idx === 0, disabledDown: idx === customBlocks.length - 1,
              } : null;
              let content: React.ReactNode = null;
              if (block.type === "text") {
                content = (
                  <AnimatedSection>
                    <div className="rounded-[40px] border border-white/10 py-14 px-6 md:px-14" style={{ background: bg }}>
                      <div className="max-w-3xl mx-auto">
                        <EditableText as="p" editing={editing} multiline value={block.text}
                          onCommit={(v) => updateBlock(idx, { text: v })}
                          className="text-white/90 tracking-tight" style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)", lineHeight: 1.7 }}/>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              } else if (block.type === "image") {
                content = (
                  <AnimatedSection>
                    <div className="max-w-4xl mx-auto">
                      <div className={`rounded-[40px] overflow-hidden ${!editing ? "cursor-zoom-in" : ""}`}
                        onClick={() => !editing && block.imageUrl && openLightbox([block.imageUrl], 0)}>
                        <EditableImage editing={editing} src={block.imageUrl} onCommit={(v) => updateBlock(idx, { imageUrl: v })}
                          className="w-full h-[420px] object-cover rounded-[40px]" alt={post.title}/>
                      </div>
                      {(block.caption || editing) && (
                        <EditableText as="p" editing={editing} value={block.caption || ""} onCommit={(v) => updateBlock(idx, { caption: v })}
                          className="text-white/60 tracking-tight mt-3 text-center" style={{ fontSize: "0.82rem" }}/>
                      )}
                    </div>
                  </AnimatedSection>
                );
              } else if (block.type === "gallery") {
                content = (
                  <AnimatedSection>
                    <div className="max-w-5xl mx-auto">
                      {(block.title || editing) && (
                        <EditableText as="div" editing={editing} value={block.title || ""} onCommit={(v) => updateBlock(idx, { title: v })}
                          className="tracking-[0.3em] uppercase text-white/50 mb-6" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
                      )}
                      <div className="grid sm:grid-cols-2 gap-4">
                      {block.images.map((img, i) => (
                        <div key={`${img}-${i}`} className={`relative rounded-[24px] ${!editing ? "cursor-zoom-in" : ""}`}
                          onClick={() => !editing && openLightbox(block.images, i)}>
                          <EditableImage editing={editing} src={img} className="w-full h-[220px] object-cover rounded-[24px]" alt={`${post.title} ${i + 1}`}
                            onCommit={(v) => updateBlock(idx, { images: block.images.map((x, xi) => xi === i ? v : x) })}/>
                          {editing && (
                            <button type="button" onClick={() => updateBlock(idx, { images: block.images.filter((_, xi) => xi !== i) })}
                              className="absolute top-2 left-2 z-20 w-6 h-6 rounded-full bg-red-600/80 text-white flex items-center justify-center" aria-label="Rimuovi immagine">
                              <Trash2 size={12}/>
                            </button>
                          )}
                        </div>
                      ))}
                      {editing && (
                        <button type="button" onClick={() => updateBlock(idx, { images: [...block.images, ""] })}
                          className="rounded-[24px] border-2 border-dashed border-white/30 flex items-center justify-center h-[220px] text-white/60 text-sm font-semibold">
                          + Aggiungi immagine
                        </button>
                      )}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              } else if (block.type === "video") {
                content = (
                  <div className="bg-black">
                    <div className="relative w-full aspect-video max-h-[85vh] mx-auto">
                      {block.videoUrl
                        ? <VideoEmbed url={block.videoUrl} className="w-full h-full" style={{ border: 0 }}/>
                        : <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">Nessun video — aggiungine uno</div>}
                      <EditableVideoUrl editing={editing} url={block.videoUrl} onCommit={(v) => updateBlock(idx, { videoUrl: v })}/>
                    </div>
                    {(block.caption || editing) && (
                      <EditableText as="p" editing={editing} value={block.caption || ""} onCommit={(v) => updateBlock(idx, { caption: v })}
                        className="text-white/60 tracking-tight text-center py-4 px-8" style={{ fontSize: "0.82rem" }}/>
                    )}
                  </div>
                );
              }
              return (
                <div key={block.id}>
                  {controls ? <BlockShell label={BLOCK_LABELS[block.type]} {...controls}>{content}</BlockShell> : content}
                  {editing && <div className="flex justify-center py-1"><InsertBlockButton onInsert={(t) => insertBlockAt(idx + 1, t)} /></div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. RELATED ARTICLES */}
      <section className="py-16 md:py-32 px-6 md:px-8 mt-10 md:mt-20" style={{ background: COLORS.gold }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-[#2E2784] font-bold tracking-[0.3em] uppercase text-xs mb-6">Keep reading</div>
            <h2 className="text-[#2E2784] tracking-[-0.04em] md:tracking-[-0.07em] text-4xl md:text-8xl font-black leading-[0.9] md:leading-[0.85] mb-10 md:mb-20">
              More Insights,<br /><span className="text-black">Same Ambition.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {others.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => go({ page: "blog-detail", slug: p.slug })}
                  className="group relative rounded-[40px] overflow-hidden text-left transition-all duration-500 hover:-translate-y-4 border-2 border-[#2E2784]"
                  style={{ background: COLORS.navy }}
                >
                  <div className="aspect-[16/10] overflow-hidden border-b border-white/10">
                    <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                  </div>
                  <div className="p-5 md:p-10">
                    <div className="text-white/50 font-bold tracking-[0.2em] uppercase text-[10px] mb-4">0{i+1} · {p.category}</div>
                    {/* MODIFICA: Titoletto Card Giallo Oro */}
                    <h4 className="text-[#F8AE01] text-lg md:text-2xl font-black leading-tight group-hover:text-white transition-colors">{p.title}</h4>
                    
                    <div className="mt-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#F8AE01] group-hover:text-[#2E2784] transition-all">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-20 md:py-40 px-6 md:px-8 text-center" style={{ background: COLORS.gold }}>
        <AnimatedSection>
          <h2 className="text-[#2E2784] text-3xl md:text-8xl font-black tracking-[-0.04em] md:tracking-tighter leading-tight md:leading-none mb-10 md:mb-14">
            This isn't just Loyalty...<br />
            <span className="text-white drop-shadow-md">this is Marketing!</span>
          </h2>
          <button
            onClick={() => go({ page: "contact" })}
            className="group inline-flex items-center gap-3 md:gap-5 rounded-full pl-7 md:pl-10 pr-4 md:pr-6 py-4 md:py-5 bg-[#2E2784] text-[#F8AE01] text-lg md:text-2xl font-black hover:bg-black transition-all active:scale-95"
          >
            <span>Let's talk Strategy</span>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight size={28} />
            </div>
          </button>
        </AnimatedSection>
      </section>
      <EditToolbar active={editMode} ready={editor.ready} dirty={editor.dirty} saving={editor.saving} error={editor.error}
        onSave={editor.save} onDiscard={editor.discard}
        layoutControls={editing && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 rounded-full bg-[#1a1752] text-white p-1 shadow-2xl border border-white/10">
            <button type="button" onClick={switchToDefaultLayout}
              className="rounded-full text-[11px] font-bold px-3 py-1.5"
              style={{ background: layoutMode === "default" ? "#F8AE01" : "transparent", color: layoutMode === "default" ? "#2E2784" : "#fff" }}>
              Struttura predefinita
            </button>
            <button type="button" onClick={switchToCustomLayout}
              className="rounded-full text-[11px] font-bold px-3 py-1.5"
              style={{ background: layoutMode === "custom" ? "#F8AE01" : "transparent", color: layoutMode === "custom" ? "#2E2784" : "#fff" }}>
              Struttura personalizzata
            </button>
          </div>
        )}/>
      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onNavigate={(i) => setLightbox((l) => l && { ...l, index: i })}/>
    </div>
  );
}