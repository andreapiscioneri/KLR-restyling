"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight, ArrowUpRight, Pencil, Plus, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AuthorAvatar } from "./author-avatar";
import { Eyebrow, softShadow } from "./ui-bits";
import { studies as fallbackStudies, brands as fallbackBrands } from "../data";
import { PageHero } from "./page-hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  useEditMode, useCollectionEditor, EditableText, EditableImage, EditToolbar, ReorderControls, SectionOrderControls, reorder,
  type CustomBlock, newBlockId, blankBlock, InsertBlockButton, BlockShell, EditableVideoUrl,
} from "./inline-edit";
import { VideoEmbed } from "./video-embed";
import { Lightbox, type LightboxState } from "./lightbox";
import type { Route } from "../App";

const G = {
  blue: "radial-gradient(130% 130% at 10% 0%, #5b53bf 0%, #2E2784 45%, #241f69 100%)",
  yellow: "radial-gradient(130% 130% at 15% 0%, #ffd95a 0%, #F8AE01 50%, #de9800 100%)",
  rosa: "radial-gradient(130% 130% at 10% 0%, #f0e8ff 0%, #C8B8F0 45%, #9d85d4 100%)",
};

const DEFAULT_SECTION_ORDER = ["overview", "campaign", "rewards", "activation", "gallery", "brand"] as const;
const SECTION_LABELS: Record<string, string> = {
  overview: "Overview", campaign: "Campaign Context", rewards: "Rewards",
  activation: "Activations & Mechanics", gallery: "Gallery", brand: "Brand Link",
};
const BLOCK_LABELS: Record<string, string> = { text: "Testo", image: "Immagine", gallery: "Galleria", video: "Video" };

export function StudyDetail({ id, go, initialStudies }: { id: string; go: (r: Route) => void; initialStudies?: typeof fallbackStudies }) {
  const studies = initialStudies?.length ? initialStudies : fallbackStudies;

  const base = studies.find((x) => x.id === id) || studies[0];
  const editMode = useEditMode();
  const editor = useCollectionEditor<any>("studies", "id", base.id, editMode);
  const editing = editMode && editor.ready;
  const s: any = editor.current ?? base;
  const [openImageEditor, setOpenImageEditor] = useState<"hero" | "avatar" | null>(null);
  const [galleryPencilsVisible, setGalleryPencilsVisible] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const openLightbox = (images: string[], index: number) => setLightbox({ images, index });
  const brand = fallbackBrands.find((b) => b.name === s.brand);
  const details = (s as any).details;
  const currentIndex = studies.findIndex((x) => x.id === s.id);
  const prevStudy = currentIndex > 0 ? studies[currentIndex - 1] : null;
  const nextStudy = currentIndex < studies.length - 1 ? studies[currentIndex + 1] : null;
  const related = studies
    .filter((x) => x.id !== s.id)
    .sort((a, b) => {
      const aScore = (a.brand === s.brand ? 2 : 0) + (a.cat === s.cat ? 1 : 0);
      const bScore = (b.brand === s.brand ? 2 : 0) + (b.cat === s.cat ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  const sector = s.cat === "petrol" ? "Fuel" : "Grocery";
  const campaignType = s.cat === "petrol" ? "Fuel Loyalty Campaign" : "Grocery Loyalty Campaign";
  const rewardGroups = details?.rewardGroups ?? [];
  const activations = details?.activations ?? [];
  const mechanics = details?.mechanics ?? [];
  const gallery = details?.gallery ?? [s.img];
  const social = details?.social ?? [];
  const videos = details?.videos ?? [];
  const videoCaptions: string[] = details?.videoCaptions ?? [];
  const videoPositions: string[] = details?.videoPositions ?? [];
  const openingVideoIdx = videos.map((_: string, i: number) => i).filter((i: number) => videoPositions[i] === "opening");
  const isSocialEmbedUrl = (url: string) => /instagram\.com|facebook\.com|fb\.watch/.test(url);
  const galleryVideoIdx = videos.map((_: string, i: number) => i).filter((i: number) => videoPositions[i] !== "opening" && !isSocialEmbedUrl(videos[i]));
  const socialEmbedIdx = videos.map((_: string, i: number) => i).filter((i: number) => videoPositions[i] !== "opening" && isSocialEmbedUrl(videos[i]));
  const setVideoPosition = (i: number, pos: "opening" | "gallery") =>
    editor.patch({ details: { ...(s.details ?? {}), videoPositions: videos.map((_: string, xi: number) => xi === i ? pos : (videoPositions[xi] || "gallery")) } });
  type GalleryGroup = { id: string; title: string; images: string[]; feature?: boolean };
  const galleryGroups: GalleryGroup[] = details?.galleryGroups ?? [];
  const results = (s as any).results ?? [];
  const informationBlocks = [
    {
      label: "Client Objective",
      text: details?.challenge || s.summary,
    },
    {
      label: "Reward Strategy",
      text: rewardGroups.length
        ? `${rewardGroups.length} reward clusters built around high perceived value and practical usage.`
        : "Reward portfolio designed to maximize participation and redemption.",
    },
    {
      label: "Execution Model",
      text: mechanics.length
        ? `${mechanics.length} clear mechanics to drive repeat visits and measurable engagement.`
        : "Simple participation mechanics designed for scale and repeat behavior.",
    },
  ];

  const titleWords = s.title.split(" ");
  const titleStart = titleWords.slice(0, -2).join(" ");
  const titleEnd = titleWords.slice(-2).join(" ");

  const storedOrder: string[] | undefined = details?.sectionOrder;
  const sectionOrder = storedOrder && DEFAULT_SECTION_ORDER.every((k) => storedOrder.includes(k)) && storedOrder.length === DEFAULT_SECTION_ORDER.length
    ? storedOrder
    : [...DEFAULT_SECTION_ORDER];
  const moveSectionKey = (idx: number, dir: -1 | 1) =>
    editor.patch({ details: { ...(s.details ?? {}), sectionOrder: reorder(sectionOrder, idx, dir) } });

  const patchDetails = (patch: Record<string, any>) => editor.patch({ details: { ...(s.details ?? {}), ...patch } });

  // Section eyebrows/headings are marketing copy hardcoded per template —
  // `details.headings[key]` lets an admin override any of them inline; falls
  // back to the original copy when untouched.
  const headings: Record<string, string> = details?.headings ?? {};
  const heading = (key: string, fallback: string) => headings[key] ?? fallback;
  const patchHeading = (key: string, value: string) => patchDetails({ headings: { ...headings, [key]: value } });
  function HeadingInner({ k, fallbackText, defaultNode, as = "span", outlineColor }: { k: string; fallbackText: string; defaultNode: React.ReactNode; as?: any; outlineColor?: string }) {
    const override = headings[k];
    if (editing) return <EditableText as={as} editing multiline value={override ?? fallbackText} onCommit={(v) => patchHeading(k, v)} outlineColor={outlineColor}/>;
    return <>{override ?? defaultNode}</>;
  }

  const quickFacts = [
    { label: heading("quickfact_label_client", "Client"), labelKey: "quickfact_label_client", value: s.client, patchKey: "client" as const },
    { label: heading("quickfact_label_country", "Country"), labelKey: "quickfact_label_country", value: s.location, patchKey: "location" as const },
    { label: heading("quickfact_label_sector", "Sector"), labelKey: "quickfact_label_sector", value: heading("sector_value", sector), patchKey: null, headingKey: "sector_value" },
    { label: heading("quickfact_label_year", "Year"), labelKey: "quickfact_label_year", value: s.year, patchKey: "year" as const },
    { label: heading("quickfact_label_brand", "Brand"), labelKey: "quickfact_label_brand", value: s.brand, patchKey: "brand" as const },
    { label: heading("quickfact_label_campaign", "Campaign Type"), labelKey: "quickfact_label_campaign", value: heading("campaign_type_value", campaignType), patchKey: null, headingKey: "campaign_type_value" },
  ];

  const layoutMode: "default" | "custom" = details?.layoutMode === "custom" ? "custom" : "default";
  const customBlocks: CustomBlock[] = Array.isArray(details?.blocks) ? details.blocks : [];

  function switchToCustomLayout() {
    if (customBlocks.length > 0) { patchDetails({ layoutMode: "custom" }); return; }
    const seeded: CustomBlock[] = [
      { id: newBlockId(), type: "text", text: s.summary || "" },
      { id: newBlockId(), type: "text", text: details?.challenge || "" },
      { id: newBlockId(), type: "gallery", images: gallery },
      ...(videos[0] ? [{ id: newBlockId(), type: "video", videoUrl: videos[0] } as CustomBlock] : []),
    ];
    patchDetails({ layoutMode: "custom", blocks: seeded });
  }
  function switchToDefaultLayout() { patchDetails({ layoutMode: "default" }); }
  function updateBlock(idx: number, patch: Partial<CustomBlock>) {
    patchDetails({ blocks: customBlocks.map((b, i) => (i === idx ? ({ ...b, ...patch } as CustomBlock) : b)) });
  }
  function removeBlock(idx: number) { patchDetails({ blocks: customBlocks.filter((_, i) => i !== idx) }); }
  function insertBlockAt(idx: number, type: CustomBlock["type"]) {
    const next = customBlocks.slice();
    next.splice(idx, 0, blankBlock(type));
    patchDetails({ blocks: next });
  }
  function moveBlockIdx(idx: number, dir: -1 | 1) { patchDetails({ blocks: reorder(customBlocks, idx, dir) }); }

  function addOpeningVideo() {
    editor.patch({ details: { ...(s.details ?? {}), videos: [...videos, ""], videoCaptions: [...videoCaptions, ""], videoPositions: [...videoPositions, "opening"] } });
  }
  function renderOpeningVideo(i: number) {
    const video = videos[i];
    return (
      <div className="py-5 md:py-8 px-4 md:px-8" style={{ background: G.blue }}>
        <div className="relative rounded-[24px] overflow-hidden max-w-5xl mx-auto" style={{ background: "#000", ...softShadow }}>
          <div className="relative w-full aspect-video max-h-[85vh] mx-auto">
            <VideoEmbed url={video} className="w-full h-full" style={{ border: 0 }} />
            <EditableVideoUrl editing={editing} url={video}
              onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), videos: videos.map((x: string, xi: number) => xi === i ? v : x) } })}/>
            {editing && (
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                <button type="button" onClick={() => setVideoPosition(i, "gallery")}
                  className="rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold px-3 py-1.5">
                  Sposta in galleria
                </button>
                <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), videos: videos.filter((_: string, xi: number) => xi !== i), videoCaptions: videoCaptions.filter((_: string, xi: number) => xi !== i), videoPositions: videoPositions.filter((_: string, xi: number) => xi !== i) } })}
                  className="w-8 h-8 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center"
                  aria-label="Elimina video">
                  <Trash2 size={14}/>
                </button>
              </div>
            )}
          </div>
          {(videoCaptions[i] || editing) && (
            <EditableText as="p" editing={editing} value={videoCaptions[i] || ""}
              onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), videoCaptions: videos.map((_: string, xi: number) => xi === i ? v : (videoCaptions[xi] || "")) } })}
              className="text-white/60 tracking-tight text-center py-4 px-8" style={{ fontSize: "0.82rem" }}/>
          )}
        </div>
      </div>
    );
  }

  const layoutToggle = editing && (
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
  );

  return (
    <>
      <PageHero
        eyebrow={editing ? (
          <EditableText as="span" editing value={heading("hero_eyebrow", s.cat === "petrol" ? "Fuel · Case Study" : "Grocery · Case Study")} onCommit={(v) => patchHeading("hero_eyebrow", v)}/>
        ) : heading("hero_eyebrow", s.cat === "petrol" ? "Fuel · Case Study" : "Grocery · Case Study")}
        title={editing ? (
          <EditableText as="span" editing value={s.title} onCommit={(v) => editor.patch({ title: v })} />
        ) : titleStart ? <>{titleStart} <span className="text-[#F8AE01]">{titleEnd}</span></> : <>{titleEnd}</>}
        image={s.img}
        editingImage={editing}
        onImageChange={(v) => editor.patch({ img: v })}
        imageEditorOpen={openImageEditor === "hero"}
        onImageEditorOpenChange={(o) => setOpenImageEditor(o ? "hero" : null)}
        ctaEditing={editing}
        cta={{ label: editing ? (
          <EditableText as="span" editing value={heading("hero_cta", "All Case Studies")} onCommit={(v) => patchHeading("hero_cta", v)}/>
        ) : heading("hero_cta", "All Case Studies"), href: "/work" }}
        extraCornerControls={editing && (
          <EditableImage editing variant="corner" cornerTopRem={11} label="Cambia avatar autore"
            src={(s as any).authorAvatar || ""} onCommit={(v) => editor.patch({ authorAvatar: v })}
            openControlled={openImageEditor === "avatar"} onOpenChange={(o) => setOpenImageEditor(o ? "avatar" : null)}
            alt="" className="hidden"/>
        )}
      >
        <div className="mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2 border border-[#F8AE01]/45 bg-[#F8AE01]/20 text-white tracking-tight" style={{ fontSize: "0.86rem" }}>
          <EditableText as="span" editing={editing} value={s.client} onCommit={(v) => editor.patch({ client: v })} style={{ fontWeight: 700 }} className="text-[#F8AE01]"/>
          <span className="text-white/55">|</span>
          {(editing || !s.client.includes(s.location)) && (
            <>
              <EditableText as="span" editing={editing} value={s.location} onCommit={(v) => editor.patch({ location: v })}/>
              <span className="text-white/55">|</span>
            </>
          )}
          <EditableText as="span" editing={editing} value={s.year} onCommit={(v) => editor.patch({ year: v })}/>
          <span className="text-white/55">|</span>
          <EditableText as="span" editing={editing} value={s.brand} onCommit={(v) => editor.patch({ brand: v })}/>
        </div>
        {((s as any).authorName || editing) && (
          <div className="mt-4 flex items-center gap-3">
            <AuthorAvatar src={(s as any).authorAvatar} name={(s as any).authorName} size={36} />
            <div className="text-white/70 tracking-tight flex items-center gap-1" style={{ fontSize: "0.82rem" }}>
              <EditableText as="span" editing={editing} value={(s as any).authorName || ""} onCommit={(v) => editor.patch({ authorName: v })}/>
              {(editing || (s as any).publishedAt) && <span>·</span>}
              <EditableText as="span" editing={editing} value={(s as any).publishedAt || ""} onCommit={(v) => editor.patch({ publishedAt: v })}/>
            </div>
          </div>
        )}
      </PageHero>

      {layoutMode === "custom" && (
        <div className="relative" style={{ background: G.blue }}>
          {editing && (
            <div className="flex justify-center py-3">
              <InsertBlockButton onInsert={(t) => insertBlockAt(0, t)} />
            </div>
          )}
          {customBlocks.map((block, idx) => {
            const bg = [G.blue, G.yellow, G.rosa][idx % 3];
            const controls = editing ? {
              onUp: () => moveBlockIdx(idx, -1), onDown: () => moveBlockIdx(idx, 1), onDelete: () => removeBlock(idx),
              disabledUp: idx === 0, disabledDown: idx === customBlocks.length - 1,
            } : null;
            let content: React.ReactNode = null;
            if (block.type === "text") {
              content = (
                <section className="relative py-20 md:py-28 px-8" style={{ background: bg }}>
                  <div className="max-w-3xl mx-auto">
                    <EditableText as="p" editing={editing} multiline value={block.text}
                      onCommit={(v) => updateBlock(idx, { text: v })}
                      className="text-white tracking-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.6, fontWeight: 500 }}/>
                  </div>
                </section>
              );
            } else if (block.type === "image") {
              content = (
                <section className="relative py-12 px-8" style={{ background: bg }}>
                  <div className="max-w-5xl mx-auto">
                    <div className="rounded-[24px]" style={softShadow}>
                      <EditableImage editing={editing} src={block.imageUrl} onCommit={(v) => updateBlock(idx, { imageUrl: v })}
                        className="w-full h-[420px] object-cover rounded-[24px]" alt={s.title}/>
                    </div>
                    {(block.caption || editing) && (
                      <EditableText as="p" editing={editing} value={block.caption || ""} onCommit={(v) => updateBlock(idx, { caption: v })}
                        className="text-white/60 tracking-tight mt-3 text-center" style={{ fontSize: "0.82rem" }}/>
                    )}
                  </div>
                </section>
              );
            } else if (block.type === "gallery") {
              content = (
                <section className="relative py-20 px-8" style={{ background: bg }}>
                  <div className="max-w-6xl mx-auto">
                    {(block.title || editing) && (
                      <EditableText as="div" editing={editing} value={block.title || ""} onCommit={(v) => updateBlock(idx, { title: v })}
                        className="tracking-[0.3em] uppercase text-white/60 mb-8" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
                    )}
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {block.images.map((img, i) => (
                      <div key={`${img}-${i}`} className="relative rounded-[24px]" style={softShadow}>
                        <EditableImage editing={editing} src={img} onCommit={(v) => updateBlock(idx, { images: block.images.map((x, xi) => xi === i ? v : x) })}
                          className="w-full h-[220px] object-cover rounded-[24px]" alt={`${s.title} ${i + 1}`}/>
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
                        className="rounded-[24px] border-2 border-dashed border-white/40 flex items-center justify-center h-[220px] text-white/70 text-sm font-semibold">
                        + Aggiungi immagine
                      </button>
                    )}
                    </div>
                  </div>
                </section>
              );
            } else if (block.type === "video") {
              content = (
                <section className="relative py-0" style={{ background: "#000" }}>
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
                </section>
              );
            }
            return (
              <div key={block.id}>
                {controls ? <BlockShell label={BLOCK_LABELS[block.type]} {...controls}>{content}</BlockShell> : content}
                {editing && <div className="flex justify-center py-1" style={{ background: [G.blue, G.yellow, G.rosa][(idx + 1) % 3] }}><InsertBlockButton onInsert={(t) => insertBlockAt(idx + 1, t)} /></div>}
              </div>
            );
          })}
        </div>
      )}

      {layoutMode === "default" && sectionOrder.map((sectionKey, sectionIdx) => {
        const orderControls = editing && (
          <SectionOrderControls
            label={SECTION_LABELS[sectionKey]}
            disabledUp={sectionIdx === 0} disabledDown={sectionIdx === sectionOrder.length - 1}
            onUp={() => moveSectionKey(sectionIdx, -1)} onDown={() => moveSectionKey(sectionIdx, 1)}
          />
        );
        switch (sectionKey) {
      case "overview": return (
      <div key={sectionKey} className="relative">{orderControls}
      {/* OVERVIEW + KPI — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-14">
              <div className="md:col-span-7">
                <Eyebrow><HeadingInner k="overview_eyebrow" fallbackText="Overview" defaultNode="Overview" outlineColor="#2E2784"/></Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4.1rem)", lineHeight: 0.98, fontWeight: 800 }}>
                  <HeadingInner k="overview_title" fallbackText="Campaign at a Glance" defaultNode={<>Campaign at<br /><em className="not-italic text-black">a Glance</em></>} outlineColor="#2E2784"/>
                </h2>
                <EditableText as="p" editing={editing} value={s.summary}
                  onCommit={(v) => editor.patch({ summary: v })}
                  multiline outlineColor="#2E2784"
                  className="text-[#2E2784] tracking-tight mt-6 max-w-3xl"
                  style={{ fontSize: "clamp(1rem, 1.35vw, 1.15rem)", lineHeight: 1.65 }}/>
              </div>

              <div className="md:col-span-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
                  {results.map((r: { k: string; v: string }, ri: number) => (
                    <article key={`${r.k}-${r.v}`} className="relative rounded-[24px] p-6 border-2 border-[#2E2784]/35 bg-[#F8AE01]/35" style={softShadow}>
                      {editing && (
                        <ReorderControls
                          disabledLeft={ri === 0} disabledRight={ri === results.length - 1}
                          onMoveLeft={() => editor.patch({ results: reorder(results, ri, -1) })}
                          onMoveRight={() => editor.patch({ results: reorder(results, ri, 1) })}
                        />
                      )}
                      <EditableText as="div" editing={editing} value={r.v} outlineColor="#2E2784"
                        onCommit={(v) => editor.patch({ results: results.map((x: any, i: number) => i === ri ? { ...x, v } : x) })}
                        className="text-[#2E2784]/55 tracking-[0.16em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}/>
                      <EditableText as="div" editing={editing} value={r.k} outlineColor="#2E2784"
                        onCommit={(v) => editor.patch({ results: results.map((x: any, i: number) => i === ri ? { ...x, k: v } : x) })}
                        className="text-[#2E2784] tracking-[-0.03em] mt-2" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", lineHeight: 1, fontWeight: 800 }}/>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {quickFacts.map((fact, i) => (
                <article
                  key={fact.labelKey}
                  className="rounded-[24px] p-6 border-2 border-[#2E2784]"
                  style={i % 2 === 0 ? { background: "#2E2784", ...softShadow } : { background: "rgba(248,174,1,0.35)", ...softShadow }}
                >
                  <EditableText as="div" editing={editing} value={fact.label} onCommit={(v) => patchHeading(fact.labelKey, v)}
                    outlineColor={i % 2 === 0 ? "#F8AE01" : "#2E2784"}
                    className={`${i % 2 === 0 ? "text-[#F8AE01]/90" : "text-[#2E2784]/45"} tracking-[0.16em] uppercase`} style={{ fontSize: "0.62rem", fontWeight: 700 }}/>
                  <EditableText as="div" editing={editing} value={fact.value}
                    onCommit={(v) => fact.patchKey ? editor.patch({ [fact.patchKey as string]: v } as any) : patchHeading((fact as any).headingKey, v)}
                    outlineColor={i % 2 === 0 ? "#F8AE01" : "#2E2784"}
                    className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-tight mt-3`}
                    style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.35 }}/>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      {openingVideoIdx[0] !== undefined && renderOpeningVideo(openingVideoIdx[0])}
      {editing && openingVideoIdx.length === 0 && (
        <div className="flex justify-center py-4" style={{ background: G.blue }}>
          <button type="button" onClick={addOpeningVideo}
            className="flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2">
            <Plus size={13}/> Aggiungi video di apertura
          </button>
        </div>
      )}
      </div>
      );
      case "campaign": return (
      <div key={sectionKey} className="relative">{orderControls}
      {/* CAMPAIGN CONTEXT — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-5">
                <Eyebrow onDark><HeadingInner k="campaign_eyebrow" fallbackText="Campaign" defaultNode="Campaign"/></Eyebrow>
                <h2 className="text-white tracking-[-0.03em] mt-5" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.1 }}>
                  {editing ? (
                    <EditableText as="span" editing value={details?.campaignTitle || "How The Campaign Was Designed"}
                      onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), campaignTitle: v } })}/>
                  ) : (details?.campaignTitle || "How The Campaign Was Designed")}
                </h2>
                <EditableText as="p" editing={editing} value={details?.challenge || s.summary}
                  onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), challenge: v } })}
                  multiline
                  className="text-white/75 tracking-tight mt-6" style={{ fontSize: "1rem", lineHeight: 1.7 }}/>
              </div>

              <div className="md:col-span-7">
                <Eyebrow onDark><HeadingInner k="information_eyebrow" fallbackText="Information Structure" defaultNode="Information Structure"/></Eyebrow>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.05 }}>
                  <HeadingInner k="information_title" fallbackText="What mattered most, and why it worked."
                    defaultNode={<>What mattered most,<br /><span className="text-[#F8AE01]">and why it worked.</span></>}/>
                </h3>

                <div className="mt-7 space-y-3">
                  {informationBlocks.map((block, bi) => (
                    <div key={block.label} className="rounded-[18px] p-5 border border-[#F8AE01]/30 bg-[#F8AE01]/12" style={softShadow}>
                      <EditableText as="div" editing={editing} value={heading(`info_label_${bi}`, block.label)}
                        onCommit={(v) => patchHeading(`info_label_${bi}`, v)}
                        className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}/>
                      <EditableText as="p" editing={editing} multiline value={heading(`info_text_${bi}`, block.text)}
                        onCommit={(v) => patchHeading(`info_text_${bi}`, v)}
                        className="text-white/90 tracking-tight mt-3" style={{ fontSize: "0.93rem", lineHeight: 1.6 }}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {openingVideoIdx[1] !== undefined && renderOpeningVideo(openingVideoIdx[1])}
      </div>
      );
      case "rewards": return (
      <div key={sectionKey} className="relative">{orderControls}
      {/* REWARDS — rosa */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <Eyebrow><HeadingInner k="rewards_eyebrow" fallbackText="Reward Collection" defaultNode="Reward Collection" outlineColor="#2E2784"/></Eyebrow>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98, fontWeight: 800 }}>
              <HeadingInner k="rewards_title" fallbackText="Premium rewards people actually want." outlineColor="#2E2784"
                defaultNode={<>Premium rewards<br /><span className="text-black">people actually want.</span></>}/>
            </h2>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewardGroups.map((group: any, i: number) => (
                <article
                  key={group.title}
                  className="rounded-[28px] p-6"
                  style={i % 2 === 0 ? { background: "#2E2784", border: "2px solid #2E2784", ...softShadow } : { background: "rgba(255,255,255,0.35)", border: "2px solid rgba(255,255,255,0.5)", ...softShadow }}
                >
                  <EditableText as="div" editing={editing} value={group.title}
                    onCommit={(v) => patchDetails({ rewardGroups: rewardGroups.map((g: any, gi: number) => gi === i ? { ...g, title: v } : g) })}
                    className={`${i % 2 === 0 ? "text-[#F8AE01]" : "text-[#2E2784]"} tracking-[-0.015em]`} style={{ fontSize: "1.08rem", fontWeight: 800, lineHeight: 1.25 }}/>
                  <EditableText as="p" editing={editing} multiline value={group.subtitle}
                    onCommit={(v) => patchDetails({ rewardGroups: rewardGroups.map((g: any, gi: number) => gi === i ? { ...g, subtitle: v } : g) })}
                    className={`${i % 2 === 0 ? "text-white/75" : "text-[#2E2784]/75"} tracking-tight mt-3`} style={{ fontSize: "0.86rem", lineHeight: 1.55 }}/>
                  <div className="mt-5 space-y-2">
                    {group.items?.map((item: string, ii: number) => (
                      <EditableText key={ii} as="div" editing={editing} value={item}
                        onCommit={(v) => patchDetails({ rewardGroups: rewardGroups.map((g: any, gi: number) => gi === i ? { ...g, items: g.items.map((x: string, xi: number) => xi === ii ? v : x) } : g) })}
                        className={`${i % 2 === 0 ? "text-white" : "text-[#2E2784]"} tracking-tight`} style={{ fontSize: "0.88rem", lineHeight: 1.45 }}/>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {(details?.collectionImage || editing) && (
              <div className={`mt-10 rounded-[28px] overflow-hidden ${!editing ? "cursor-zoom-in" : ""}`} style={softShadow}
                onClick={() => !editing && details?.collectionImage && openLightbox([details.collectionImage], 0)}>
                <EditableImage editing={editing} src={details?.collectionImage || ""} onCommit={(v) => patchDetails({ collectionImage: v })}
                  className="w-full h-[320px] md:h-[420px] object-cover" alt={`${s.title} reward collection`}/>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
      </div>
      );
      case "activation": return (
      <div key={sectionKey} className="relative">{orderControls}
      {/* ACTIVATIONS + MECHANICS — blue */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[#F8AE01]/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-12 gap-10 md:gap-12">
              <div className="md:col-span-6">
                <Eyebrow onDark><HeadingInner k="activation_eyebrow" fallbackText="In-Store Experience" defaultNode="In-Store Experience"/></Eyebrow>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.05 }}>
                  <HeadingInner k="activation_title" fallbackText="Activations that turn footfall into engagement."
                    defaultNode={<>Activations that turn<br />footfall into engagement.</>}/>
                </h3>
                <div className="mt-7 space-y-3">
                  {activations.length > 0 ? (
                    activations.map((item: string, ai: number) => (
                      <EditableText key={ai} as="div" editing={editing} value={item}
                        onCommit={(v) => patchDetails({ activations: activations.map((x: string, xi: number) => xi === ai ? v : x) })}
                        className="rounded-[18px] p-4 border border-[#F8AE01]/30 bg-[#F8AE01]/12 text-white/90 tracking-tight" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}/>
                    ))
                  ) : (
                    <EditableText as="div" editing={editing} value={heading("activation_fallback", "Campaign assets were activated in high-traffic locations to increase visibility, participation and conversion.")}
                      onCommit={(v) => patchHeading("activation_fallback", v)}
                      className="rounded-[18px] p-4 border border-[#F8AE01]/30 bg-[#F8AE01]/12 text-white/90 tracking-tight" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}/>
                  )}
                </div>
              </div>

              <div className="md:col-span-6">
                <Eyebrow onDark><HeadingInner k="mechanics_eyebrow" fallbackText="Mechanics" defaultNode="Mechanics"/></Eyebrow>
                <h3 className="text-white tracking-[-0.03em] mt-6" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.05 }}>
                  <HeadingInner k="mechanics_title" fallbackText="Clear mechanics, strong repeat behavior."
                    defaultNode={<>Clear mechanics,<br />strong repeat behavior.</>}/>
                </h3>
                <div className="mt-7 space-y-3">
                  {mechanics.map((item: string, mi: number) => (
                    <EditableText key={mi} as="div" editing={editing} value={item}
                      onCommit={(v) => patchDetails({ mechanics: mechanics.map((x: string, xi: number) => xi === mi ? v : x) })}
                      className="rounded-[18px] p-4 border border-[#F8AE01]/30 bg-[#F8AE01]/12 text-white/90 tracking-tight" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}/>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      </div>
      );
      case "gallery": return (
      <div key={sectionKey} className="relative">{orderControls}
      {/* GALLERY — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-white/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <Eyebrow><HeadingInner k="gallery_eyebrow" fallbackText="Gallery" defaultNode="Gallery" outlineColor="#2E2784"/></Eyebrow>
                <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98, fontWeight: 800 }}>
                  <HeadingInner k="gallery_title" fallbackText="In-store assets, POSM and campaign touchpoints." outlineColor="#2E2784"
                    defaultNode={<>In-store assets,<br /><span className="text-black">POSM and campaign touchpoints.</span></>}/>
                </h2>
              </div>
              {editing && gallery.length > 0 && (
                <button type="button" onClick={() => setGalleryPencilsVisible((v) => !v)}
                  className="flex-shrink-0 flex items-center gap-1.5 rounded-full bg-[#2E2784] text-white text-xs font-bold px-4 py-2">
                  <Pencil size={13}/> {galleryPencilsVisible ? "Fatto" : "Cambia immagini"}
                </button>
              )}
            </div>

            {galleryGroups.length > 0 && galleryGroups.map((group, gi) => {
              const patchGroup = (patch: Partial<GalleryGroup>) => editor.patch({ details: { ...(s.details ?? {}), galleryGroups: galleryGroups.map((g, x) => x === gi ? { ...g, ...patch } : g) } });
              const removeGroup = () => editor.patch({ details: { ...(s.details ?? {}), galleryGroups: galleryGroups.filter((_, x) => x !== gi) } });
              return (
                <div key={group.id} className="mt-14 first:mt-12">
                  <div className="flex items-center justify-between gap-3">
                    <EditableText as="div" editing={editing} value={group.title} onCommit={(v) => patchGroup({ title: v })}
                      outlineColor="#2E2784"
                      className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
                    {editing && (
                      <button type="button" onClick={removeGroup}
                        className="flex-shrink-0 flex items-center gap-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold px-3 py-1.5">
                        <Trash2 size={12}/> Elimina galleria
                      </button>
                    )}
                  </div>
                  <div className={`mt-6 grid gap-4 ${group.feature ? "sm:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
                    {group.images.map((img, i) => (
                      <div key={`${img}-${i}`} className={`relative rounded-[24px] ${!editing ? "cursor-zoom-in" : ""}`} style={softShadow}
                        onClick={() => !editing && openLightbox(group.images, i)}>
                        <EditableImage editing={editing} src={img} alt={`${s.title} ${group.title} ${i + 1}`}
                          className={`w-full object-cover rounded-[24px] border border-white/40 ${group.feature ? "h-[360px]" : "h-[220px]"}`}
                          onCommit={(v) => patchGroup({ images: group.images.map((x, xi) => xi === i ? v : x) })}/>
                        {editing && (
                          <>
                            <ReorderControls
                              disabledLeft={i === 0} disabledRight={i === group.images.length - 1}
                              onMoveLeft={() => patchGroup({ images: reorder(group.images, i, -1) })}
                              onMoveRight={() => patchGroup({ images: reorder(group.images, i, 1) })}
                            />
                            <button type="button" onClick={() => patchGroup({ images: group.images.filter((_, xi) => xi !== i) })}
                              className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                              aria-label="Elimina immagine">
                              <Trash2 size={13}/>
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    {editing && (
                      <button type="button" onClick={() => patchGroup({ images: [...group.images, ""] })}
                        className={`rounded-[24px] border-2 border-dashed border-[#2E2784]/40 flex items-center justify-center text-[#2E2784]/70 text-sm font-semibold ${group.feature ? "h-[360px]" : "h-[220px]"}`}>
                        + Aggiungi immagine
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {editing && (
              <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), galleryGroups: [...galleryGroups, { id: newBlockId(), title: "Nuova galleria", images: [] }] } })}
                className="mt-6 flex items-center gap-1.5 rounded-full bg-[#2E2784] text-white text-xs font-bold px-4 py-2">
                <Plus size={13}/> Aggiungi galleria etichettata
              </button>
            )}

            {(gallery.length > 0 || (editing && galleryGroups.length === 0)) && (
            <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {gallery.map((img: string, i: number) => (
                <div key={`${img}-${i}`} className={`relative rounded-[24px] ${!editing ? "cursor-zoom-in" : ""}`} style={softShadow}
                  onClick={() => !editing && openLightbox(gallery, i)}>
                  <EditableImage editing={editing} src={img} alt={`${s.title} gallery ${i + 1}`}
                    className="w-full h-[220px] object-cover rounded-[24px] border border-white/40"
                    alwaysShowPencil={galleryPencilsVisible}
                    onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), gallery: gallery.map((x: string, xi: number) => xi === i ? v : x) } })}/>
                  {editing && (
                    <>
                      <ReorderControls
                        disabledLeft={i === 0} disabledRight={i === gallery.length - 1}
                        onMoveLeft={() => editor.patch({ details: { ...(s.details ?? {}), gallery: reorder(gallery, i, -1) } })}
                        onMoveRight={() => editor.patch({ details: { ...(s.details ?? {}), gallery: reorder(gallery, i, 1) } })}
                      />
                      <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), gallery: gallery.filter((_: string, xi: number) => xi !== i) } })}
                        className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                        aria-label="Elimina immagine">
                        <Trash2 size={13}/>
                      </button>
                    </>
                  )}
                </div>
              ))}
              {editing && (
                <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), gallery: [...gallery, ""] } })}
                  className="rounded-[24px] border-2 border-dashed border-[#2E2784]/40 flex items-center justify-center h-[220px] text-[#2E2784]/70 text-sm font-semibold">
                  + Aggiungi immagine
                </button>
              )}
            </div>
            )}

            {(galleryVideoIdx.length > 0 || editing) && (
              <>
                <EditableText as="div" editing={editing} value={heading("video_label", "Video")} onCommit={(v) => patchHeading("video_label", v)}
                  outlineColor="#2E2784"
                  className="tracking-[0.3em] uppercase text-[#2E2784]/60 mt-14" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
                <div className="mt-6 grid gap-8 max-w-4xl mx-auto">
                  {galleryVideoIdx.map((i: number) => { const video = videos[i]; return (
                    <div key={`${video}-${i}`}>
                      <div className="relative rounded-[24px] overflow-hidden border border-white/40 bg-black aspect-video" style={softShadow}>
                        <VideoEmbed url={video} className="w-full h-full" style={{ border: 0 }} />
                        <EditableVideoUrl editing={editing} url={video}
                          onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), videos: videos.map((x: string, xi: number) => xi === i ? v : x) } })}/>
                        {editing && (
                          <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                            <button type="button" onClick={() => setVideoPosition(i, "opening")}
                              className="rounded-full bg-[#2E2784]/90 hover:bg-[#2E2784] text-white text-[10px] font-bold px-2.5 py-1">
                              In apertura
                            </button>
                            <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), videos: videos.filter((_: string, xi: number) => xi !== i), videoCaptions: videoCaptions.filter((_: string, xi: number) => xi !== i), videoPositions: videoPositions.filter((_: string, xi: number) => xi !== i) } })}
                              className="w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                              aria-label="Elimina video">
                              <Trash2 size={13}/>
                            </button>
                          </div>
                        )}
                      </div>
                      {(videoCaptions[i] || editing) && (
                        <EditableText as="p" editing={editing} value={videoCaptions[i] || ""}
                          onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), videoCaptions: videos.map((_: string, xi: number) => xi === i ? v : (videoCaptions[xi] || "")) } })}
                          className="text-[#2E2784]/70 tracking-tight mt-3 text-center" style={{ fontSize: "0.88rem" }}/>
                      )}
                    </div>
                  ); })}
                  {editing && (
                    <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), videos: [...videos, ""], videoCaptions: [...videoCaptions, ""], videoPositions: [...videoPositions, "gallery"] } })}
                      className="rounded-[24px] border-2 border-dashed border-[#2E2784]/40 flex items-center justify-center aspect-video text-[#2E2784]/70 text-sm font-semibold">
                      + Aggiungi video
                    </button>
                  )}
                </div>
              </>
            )}

            {(social.length > 0 || editing) && (
              <>
                <EditableText as="div" editing={editing} value={heading("social_label", "Social Media")} onCommit={(v) => patchHeading("social_label", v)}
                  outlineColor="#2E2784"
                  className="tracking-[0.3em] uppercase text-[#2E2784]/60 mt-14" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {social.map((img: string, i: number) => (
                    <div key={`${img}-${i}`} className={`relative rounded-[24px] ${!editing ? "cursor-zoom-in" : ""}`} style={softShadow}
                      onClick={() => !editing && openLightbox(social, i)}>
                      <EditableImage editing={editing} src={img} alt={`${s.title} social ${i + 1}`}
                        className="w-full h-[220px] object-cover rounded-[24px] border border-white/40"
                        onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), social: social.map((x: string, xi: number) => xi === i ? v : x) } })}/>
                      {editing && (
                        <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), social: social.filter((_: string, xi: number) => xi !== i) } })}
                          className="absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                          aria-label="Elimina immagine">
                          <Trash2 size={13}/>
                        </button>
                      )}
                    </div>
                  ))}
                  {editing && (
                    <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), social: [...social, ""] } })}
                      className="rounded-[24px] border-2 border-dashed border-[#2E2784]/40 flex items-center justify-center h-[220px] text-[#2E2784]/70 text-sm font-semibold">
                      + Aggiungi immagine
                    </button>
                  )}
                </div>
              </>
            )}

            {(socialEmbedIdx.length > 0 || editing) && (
              <>
                <EditableText as="div" editing={editing} value={heading("social_embed_label", "Social Posts")} onCommit={(v) => patchHeading("social_embed_label", v)}
                  outlineColor="#2E2784"
                  className="tracking-[0.3em] uppercase text-[#2E2784]/60 mt-14" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {socialEmbedIdx.map((i: number) => { const video = videos[i]; return (
                    <div key={`${video}-${i}`} className="relative rounded-[24px] overflow-hidden border border-white/40 bg-white" style={softShadow}>
                      <VideoEmbed url={video} className="w-full h-[600px]" style={{ border: 0 }} />
                      <EditableVideoUrl editing={editing} url={video}
                        onCommit={(v) => editor.patch({ details: { ...(s.details ?? {}), videos: videos.map((x: string, xi: number) => xi === i ? v : x) } })}/>
                      {editing && (
                        <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), videos: videos.filter((_: string, xi: number) => xi !== i), videoCaptions: videoCaptions.filter((_: string, xi: number) => xi !== i), videoPositions: videoPositions.filter((_: string, xi: number) => xi !== i) } })}
                          className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                          aria-label="Elimina post">
                          <Trash2 size={13}/>
                        </button>
                      )}
                    </div>
                  ); })}
                  {editing && (
                    <button type="button" onClick={() => editor.patch({ details: { ...(s.details ?? {}), videos: [...videos, ""], videoCaptions: [...videoCaptions, ""], videoPositions: [...videoPositions, "gallery"] } })}
                      className="rounded-[24px] border-2 border-dashed border-[#2E2784]/40 flex items-center justify-center h-[600px] text-[#2E2784]/70 text-sm font-semibold">
                      + Aggiungi post Instagram/Facebook
                    </button>
                  )}
                </div>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>
      </div>
      );
      case "brand": return (
      <div key={sectionKey} className="relative">{orderControls}
      {/* BRAND LINK — rosa */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.rosa }}>
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            {brand && (
              <div className="rounded-[24px] p-8 flex flex-wrap items-center justify-between gap-6" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.45)" }}>
                <div>
                  <EditableText as="div" editing={editing} value={heading("brand_label", "Featured Brand")} onCommit={(v) => patchHeading("brand_label", v)}
                    className="text-[#2E2784]/60 tracking-[0.2em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}/>
                  <div className="text-[#2E2784] tracking-tight mt-2" style={{ fontSize: "1.3rem", fontWeight: 800 }}>{brand.name}</div>
                </div>
                {editing ? (
                  <div className="inline-flex items-center gap-2.5 rounded-full text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white">
                    <EditableText as="span" editing value={heading("brand_cta", "Explore Brand")} onCommit={(v) => patchHeading("brand_cta", v)}/>
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => go({ page: "brand-detail", id: brand.id })}
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#2E2784] text-white hover:bg-black"
                  >
                    <span>{heading("brand_cta", "Explore Brand")}</span>
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                )}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
      </div>
      );
      default: return null;
        }
      })}

      {/* RELATED — yellow */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden" style={{ background: G.yellow }}>
        <div className="absolute -bottom-24 -left-20 w-[360px] h-[360px] rounded-full bg-white/15 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <EditableText as="div" editing={editing} value={heading("related_eyebrow", "Related")} onCommit={(v) => patchHeading("related_eyebrow", v)}
                  outlineColor="#2E2784"
              className="tracking-[0.3em] uppercase text-[#2E2784]/60" style={{ fontSize: "0.65rem", fontWeight: 600 }}/>
            <h2 className="text-[#2E2784] tracking-[-0.04em] mt-8" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 0.98, fontWeight: 800 }}>
              <HeadingInner k="related_title" fallbackText="More stories, same loyalty ambition." outlineColor="#2E2784"
                defaultNode={<>More stories,<br /><span className="text-black">same loyalty ambition.</span></>}/>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => go({ page: "study-detail", id: r.id })}
                  className="group rounded-[28px] overflow-hidden bg-[#2E2784] border border-white/15 text-left"
                  style={softShadow}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]" />
                  </div>
                  <div className="p-6">
                    <div className="text-[#F8AE01] tracking-[0.18em] uppercase" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                      {r.cat === "retail" ? "Grocery" : "Fuel"}
                    </div>
                    <div className="text-white tracking-[-0.02em] mt-3" style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.25 }}>{r.title}</div>
                    <div className="text-white/65 tracking-tight mt-3" style={{ fontSize: "0.85rem" }}>{r.client} · {r.location}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button
                onClick={() => prevStudy && go({ page: "study-detail", id: prevStudy.id })}
                disabled={!prevStudy}
                className={`group inline-flex items-center gap-3 px-1 py-1.5 transition-all ${prevStudy ? "text-[#2E2784] hover:opacity-75" : "text-[#2E2784]/45 cursor-not-allowed"}`}
              >
                <span className={`${prevStudy ? "text-[#2E2784]" : "text-[#2E2784]/45"}`}>
                  <ArrowLeft className="w-4 h-4" />
                </span>
                <span className="tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {prevStudy ? `Prev: ${prevStudy.title}` : "No previous"}
                </span>
              </button>

              <button
                onClick={() => nextStudy && go({ page: "study-detail", id: nextStudy.id })}
                disabled={!nextStudy}
                className={`group inline-flex items-center gap-3 px-1 py-1.5 transition-all ${nextStudy ? "text-[#2E2784] hover:opacity-75" : "text-[#2E2784]/45 cursor-not-allowed"}`}
              >
                <span className="tracking-tight" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {nextStudy ? `Next: ${nextStudy.title}` : "No next"}
                </span>
                <span className={`${nextStudy ? "text-[#2E2784]" : "text-[#2E2784]/45"}`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CLOSING CTA — blue */}
      <section className="relative pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden" style={{ background: G.blue }}>
        <div className="absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full bg-[#F8AE01]/20 blur-3xl" />
        <div className="max-w-6xl mx-auto px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-white tracking-[-0.035em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.8rem)", lineHeight: 1.05, fontWeight: 800 }}>
                  <HeadingInner k="closing_title" fallbackText="Let's Design Your Loyalty Campaign"
                    defaultNode={<>Let's Design<br /><span className="text-[#F8AE01]">Your Loyalty Campaign</span></>}/>
                </h2>
              </div>
              <div className="md:text-right">
                {editing ? (
                  <div className="inline-flex items-center gap-2.5 rounded-full text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black">
                    <EditableText as="span" editing value={heading("closing_cta", "Book an Appointment")} onCommit={(v) => patchHeading("closing_cta", v)}/>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => go({ page: "contact" })}
                    className="inline-flex items-center gap-2.5 rounded-full tracking-tight transition-all text-[0.9rem] pl-5 pr-2 py-2 bg-[#F8AE01] text-black hover:bg-[#ffd95a] hover:text-[#2E2784]"
                  >
                    <span>{heading("closing_cta", "Book an Appointment")}</span>
                    <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <EditToolbar active={editMode} ready={editor.ready} dirty={editor.dirty} saving={editor.saving} error={editor.error}
        onSave={editor.save} onDiscard={editor.discard} layoutControls={layoutToggle}/>
      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onNavigate={(i) => setLightbox((l) => l && { ...l, index: i })}/>
    </>
  );
}
