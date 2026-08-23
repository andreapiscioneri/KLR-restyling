"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Check, Link2, List, ListOrdered, Loader2, Pencil, Plus, Trash2, Upload, X } from "lucide-react";

// Swaps the item at `index` with its neighbour in `direction` and returns a
// new array — the building block for the "reorder this list" arrows below.
export function reorder<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const next = index + direction;
  if (next < 0 || next >= list.length) return list;
  const copy = list.slice();
  [copy[index], copy[next]] = [copy[next], copy[index]];
  return copy;
}

export function ReorderControls({ onMoveLeft, onMoveRight, disabledLeft, disabledRight }: {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  disabledLeft?: boolean;
  disabledRight?: boolean;
}) {
  return (
    <div className="absolute top-2 right-2 z-20 flex gap-1">
      <button type="button" onClick={onMoveLeft} disabled={disabledLeft}
        className="w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center disabled:opacity-30"
        aria-label="Sposta prima">
        <ArrowLeft size={12} />
      </button>
      <button type="button" onClick={onMoveRight} disabled={disabledRight}
        className="w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center disabled:opacity-30"
        aria-label="Sposta dopo">
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

/**
 * Inline "edit on the real page" toolkit.
 *
 * Admins open a case study / blog post with `?edit=1`: this hook loads the
 * full collection (studies/posts) via the existing admin content API,
 * EditableText/EditableImage below let them click text or images directly
 * on the live page to change them, and the floating toolbar saves the
 * whole collection back through the same PUT endpoint the admin dashboard
 * form uses. No drag/drop or layout restructuring — text and image
 * content only, matching what an approval reviewer actually needs to fix.
 */
export function useEditMode(): boolean {
  // Read straight from window.location instead of useSearchParams(), so this
  // stays a plain client-only concern with no Suspense-boundary requirement
  // on the (mostly static/prerendered) content pages that use it.
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setEditMode(new URLSearchParams(window.location.search).get("edit") === "1");
  }, []);
  return editMode;
}

export function useCollectionEditor<T extends Record<string, any>>(
  type: string,
  idKey: keyof T,
  idValue: string,
  enabled: boolean
) {
  const [items, setItems] = useState<T[] | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const serverSnapshot = useRef<T[] | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/content?type=${type}`, { credentials: "include" });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) {
          setItems(json.data ?? null);
          serverSnapshot.current = json.data ? JSON.parse(JSON.stringify(json.data)) : null;
          setReady(true);
        }
      } catch {
        // not authenticated or offline — inline editing simply stays inactive
      }
    })();
    return () => { cancelled = true; };
  }, [enabled, type]);

  const current = items?.find((i) => i[idKey] === idValue) ?? null;

  const patch = useCallback((fields: Partial<T>) => {
    setItems((prev) => prev?.map((i) => (i[idKey] === idValue ? { ...i, ...fields } : i)) ?? prev);
    setDirty(true);
  }, [idKey, idValue]);

  const save = useCallback(async () => {
    if (!items) return;
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/admin/content?type=${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(items),
      });
      if (!res.ok) throw new Error("save failed");
      setDirty(false);
    } catch {
      setError("Salvataggio non riuscito. Riprova.");
    }
    setSaving(false);
  }, [items, type]);

  const discard = useCallback(() => {
    if (serverSnapshot.current) setItems(JSON.parse(JSON.stringify(serverSnapshot.current)));
    setDirty(false);
  }, []);

  return { current, ready, saving, dirty, error, patch, save, discard };
}

const editableBase = "outline-dashed outline-2 outline-offset-4 outline-[color:var(--edit-outline)]/0 hover:outline-[color:var(--edit-outline)]/70 focus:outline-[color:var(--edit-outline)] rounded-md transition-[outline-color] cursor-text";

// Reorders whole page sections (not just items inside one), so an admin can
// e.g. move "Gallery" above "Rewards". Only sections registered in a page's
// `sectionOrder` participate — hero and the closing/related blocks stay
// fixed since they're generic site chrome, not per-item content.
export function SectionOrderControls({ label, onUp, onDown, disabledUp, disabledDown }: {
  label: string;
  onUp: () => void;
  onDown: () => void;
  disabledUp?: boolean;
  disabledDown?: boolean;
}) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-black/70 text-white pl-3 pr-1.5 py-1.5 shadow-lg backdrop-blur">
      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
      <button type="button" onClick={onUp} disabled={disabledUp}
        className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30" aria-label="Sposta sezione su">
        <ArrowUp size={12} />
      </button>
      <button type="button" onClick={onDown} disabled={disabledDown}
        className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30" aria-label="Sposta sezione giù">
        <ArrowDown size={12} />
      </button>
    </div>
  );
}

export function EditableText({
  value, onCommit, editing, as: As = "span", multiline, className, style, outlineColor = "#F8AE01",
}: {
  value: string;
  onCommit: (v: string) => void;
  editing: boolean;
  as?: any;
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  // The dashed hover/focus outline defaults to brand yellow, which
  // disappears on yellow-background sections — pass e.g. "#2E2784" (brand
  // blue) there so the "this is editable" affordance stays visible.
  outlineColor?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  // Tracks the text this component itself last emitted (via typing or
  // blur). While `lastEmitted` matches the incoming `value` prop, the DOM
  // is left alone — that prop change is an echo of our own edit. Only a
  // *different* value (e.g. after "Annulla" resets state, or on first
  // mount) re-seeds the DOM text. This keeps the element effectively
  // uncontrolled while typing, so React never rewrites the text node under
  // the user's cursor and resets the caret to the start on every keystroke.
  const lastEmitted = useRef<string | null>(null);

  useEffect(() => {
    if (!editing || !ref.current) return;
    if (lastEmitted.current === null || value !== lastEmitted.current) {
      if (ref.current.textContent !== value) ref.current.textContent = value;
      lastEmitted.current = value;
    }
  }, [value, editing]);

  if (!editing) return <As className={className} style={style}>{value}</As>;

  return (
    <As
      ref={ref}
      className={`${className ?? ""} ${editableBase}`}
      style={{
        ...style,
        whiteSpace: multiline ? "pre-wrap" : style?.whiteSpace,
        ["--edit-outline" as any]: outlineColor,
      }}
      contentEditable
      suppressContentEditableWarning
      onInput={(e: React.FormEvent<HTMLElement>) => {
        // Commit on every keystroke (not just on blur) so the "Salva"
        // button lights up immediately while typing, not only once you
        // click away from the field.
        const next = e.currentTarget.textContent ?? "";
        lastEmitted.current = next;
        if (next !== value) onCommit(next);
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = e.currentTarget.textContent ?? "";
        lastEmitted.current = next;
        if (next !== value) onCommit(next);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") { e.preventDefault(); (e.currentTarget as HTMLElement).blur(); }
      }}
    />
  );
}

export function EditableImage({
  src, onCommit, editing, className, style, alt, variant = "cover", label = "Cambia immagine", cornerTopRem = 8,
  openControlled, onOpenChange, alwaysShowPencil,
}: {
  src: string;
  onCommit: (url: string) => void;
  editing: boolean;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  // "cover": edit button fills the whole image (fine for isolated cards).
  // "corner": edit button is a small pill in the top-right corner instead —
  // use this when the image sits *behind* other clickable/editable content
  // (e.g. a hero background), so the button doesn't steal clicks from it.
  variant?: "cover" | "corner";
  label?: string;
  // Vertical offset (in rem, from the top) for "corner" buttons — lets
  // multiple corner controls (e.g. hero image + author avatar) stack
  // without overlapping each other.
  cornerTopRem?: number;
  // Optional external open-state control, so a parent can keep several
  // corner image editors mutually exclusive (only one popover open at a
  // time) instead of each managing its own independent local state.
  openControlled?: boolean;
  onOpenChange?: (open: boolean) => void;
  // For "cover": keep the pencil badge always visible instead of only on
  // hover — used when a "Cambia immagini" toggle makes a whole grid's edit
  // affordances discoverable at once.
  alwaysShowPencil?: boolean;
}) {
  const [openLocal, setOpenLocal] = useState(false);
  const open = openControlled ?? openLocal;
  const setOpen = (next: boolean) => { onOpenChange ? onOpenChange(next) : setOpenLocal(next); };
  const [url, setUrl] = useState(src);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!editing) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt || ""} className={className} style={style} />;
  }

  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      const json = await res.json() as { url?: string };
      if (json.url) { setUrl(json.url); onCommit(json.url); setOpen(false); }
    } catch { /* ignore */ }
    setUploading(false);
  }

  return (
    <div className="relative inline-block" style={{ display: "contents" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || ""} className={className} style={style} />
      {variant === "cover" ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`absolute z-20 inset-0 flex items-center justify-center transition-colors group ${alwaysShowPencil ? "bg-black/25 hover:bg-black/40" : "bg-black/0 hover:bg-black/40"}`}
          style={{ borderRadius: (style as any)?.borderRadius }}
          aria-label="Modifica immagine"
        >
          <Pencil size={18} className={`text-white drop-shadow ${alwaysShowPencil ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{ top: `${cornerTopRem}rem` }}
          className="absolute z-20 right-6 flex items-center gap-1.5 rounded-full bg-black/70 hover:bg-black/85 text-white text-[11px] font-bold px-3 py-1.5 shadow-lg"
          aria-label={label}
        >
          <Pencil size={12} /> {label}
        </button>
      )}
      {open && (
        <div
          style={variant === "corner" ? { top: `${cornerTopRem + 2.75}rem` } : undefined}
          className={`z-50 w-72 rounded-xl bg-white p-3 shadow-2xl border border-black/10 ${variant === "corner" ? "absolute right-6" : "absolute top-full left-0 mt-2"}`}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">{label}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi"
              className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500">
              <X size={12} />
            </button>
          </div>
          {url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="w-full h-28 object-cover rounded-lg mb-2 bg-gray-100" draggable={false}
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}/>
          )}
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL immagine"
            className="w-full text-xs rounded-lg border border-gray-200 px-2 py-2 mb-2"
          />
          <div className="flex gap-2">
            <button type="button" onClick={() => { onCommit(url); setOpen(false); }}
              className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#2E2784] text-white text-xs font-semibold py-2">
              <Check size={12} /> Usa URL
            </button>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#F8AE01] text-[#2E2784] text-xs font-semibold py-2">
              {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />} Carica
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
        </div>
      )}
    </div>
  );
}

export function EditToolbar({
  active, dirty, saving, error, onSave, onDiscard, ready, layoutControls,
}: {
  active: boolean;
  dirty: boolean;
  saving: boolean;
  error: string;
  onSave: () => void;
  onDiscard?: () => void;
  ready: boolean;
  layoutControls?: React.ReactNode;
}) {
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  if (!active) return null;
  function exitEditMode() {
    const url = new URL(window.location.href);
    url.searchParams.delete("edit");
    window.location.href = url.toString();
  }
  return (
    <>
      {layoutControls}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-full bg-[#1a1752] text-white px-5 py-3 shadow-2xl border border-white/10">
        <button type="button" onClick={exitEditMode} title="Esci dalla modifica" aria-label="Esci dalla modifica"
          className="flex items-center justify-center">
          <Pencil size={14} className="text-[#F8AE01]" />
        </button>
        <span className="text-xs font-semibold">
          {!ready ? "Verifica accesso admin…" : saving ? "Salvataggio…" : dirty ? "Modifiche non salvate" : "Tutto salvato"}
        </span>
        {error && <span className="text-xs text-red-300">{error}</span>}
        {onDiscard && (
          <button
            type="button"
            onClick={() => setConfirmDiscard(true)}
            disabled={!ready || !dirty || saving}
            className="flex items-center gap-1.5 rounded-full bg-white/10 text-white text-xs font-bold px-4 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <X size={12} /> Annulla
          </button>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={!ready || !dirty || saving}
          className="flex items-center gap-1.5 rounded-full bg-[#F8AE01] text-[#2E2784] text-xs font-bold px-4 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Salva
        </button>
      </div>

      {confirmDiscard && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4" onClick={() => setConfirmDiscard(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold text-[#1a1752]">Annullare le modifiche?</h3>
            <p className="mt-2 text-sm text-gray-600">Tutte le modifiche non salvate su questa pagina verranno perse e tornerai all'ultima versione salvata. Sei sicuro?</p>
            <div className="mt-5 flex gap-2 justify-end">
              <button type="button" onClick={() => setConfirmDiscard(false)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100">
                Torna indietro
              </button>
              <button type="button" onClick={() => { onDiscard?.(); setConfirmDiscard(false); }}
                className="rounded-full bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700">
                Sì, annulla modifiche
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Custom block canvas (used when a study/post opts into free layout) ───

// "cover" (default, unchanged): crops to fill a fixed-height box.
// "contain": no crop, letterboxed inside the same fixed-height box.
// "original": no crop, no letterbox — the box itself takes the image's
// native aspect ratio instead of a fixed height.
export type ImageFit = "cover" | "contain" | "original";

// A gallery image is either a plain URL string (legacy content, and the
// common case — inherits the gallery block's own `fit`) or an object that
// pins an independent `fit` for that one photo. Both forms coexist in the
// same `images` array so old content needs no migration.
export type GalleryImage = string | { url: string; fit?: ImageFit };

export type CustomBlock =
  | { id: string; type: "text"; text: string }
  | { id: string; type: "image"; imageUrl: string; caption?: string; fit?: ImageFit }
  | { id: string; type: "gallery"; images: GalleryImage[]; title?: string; columns?: number; fit?: ImageFit }
  | { id: string; type: "video"; videoUrl: string; caption?: string; poster?: string };

export function galleryImageUrl(img: GalleryImage): string {
  return typeof img === "string" ? img : img.url;
}
export function galleryImageFit(img: GalleryImage, blockFit: ImageFit | undefined): ImageFit {
  const own = typeof img === "string" ? undefined : img.fit;
  return own ?? blockFit ?? "cover";
}
export function setGalleryImageUrl(img: GalleryImage, url: string): GalleryImage {
  return typeof img === "string" ? url : { ...img, url };
}
export function setGalleryImageFit(img: GalleryImage, fit: ImageFit): GalleryImage {
  return { url: galleryImageUrl(img), fit };
}

// Shared frame classes for an image or gallery tile: "cover"/"contain" keep
// the fixed-height box (only the object-fit + optional letterbox tint
// change); "original" drops the fixed height entirely so the box takes the
// image's own aspect ratio — no crop, no bars.
export function mediaFrameClasses(fit: ImageFit | undefined, heightClass: string): { boxClass: string; imgClass: string; boxStyle?: React.CSSProperties } {
  if (fit === "original") return { boxClass: "", imgClass: "w-full h-auto" };
  if (fit === "contain") return { boxClass: heightClass, imgClass: `w-full ${heightClass} object-contain` };
  return { boxClass: heightClass, imgClass: `w-full ${heightClass} object-cover` };
}

// ─── Lightweight rich text for block "text" content ───
// No rich-text editor library is installed. Instead the stored string can
// carry a tiny, safe markup subset — **bold**, *italic*, [label](url) links
// (absolute or site-relative, with an optional explicit "_blank"/"_self"
// target hint), and line prefixes for headings/lists — parsed here into
// React nodes. This is never rendered via dangerouslySetInnerHTML, so
// there's no HTML/XSS surface: the stored value is always plain text, just
// with a couple of recognized patterns inside it.
const INLINE_MARKUP_RE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)"]+)(?:\s+"(_blank|_self)")?\)/g;

export function renderInlineMarkup(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  INLINE_MARKUP_RE.lastIndex = 0;
  while ((match = INLINE_MARKUP_RE.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i++}`}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i${i++}`}>{match[2]}</em>);
    } else {
      const url = match[4];
      const target = match[5] ?? (url.startsWith("http") ? "_blank" : "_self");
      nodes.push(
        <a key={`${keyPrefix}-a${i++}`} href={url} {...(target === "_blank" ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="underline underline-offset-2">
          {match[3]}
        </a>
      );
    }
    lastIndex = INLINE_MARKUP_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

// Groups trimmed, non-empty lines into heading/list/paragraph segments —
// "## "/"### "/"#### " marks a heading level, consecutive "- " lines become
// one bullet list, consecutive "<digit>. " lines become one numbered list
// (the actual typed digits don't matter — rendering uses a native <ol>
// which renumbers on its own), everything else stays one paragraph per line
// (matching this content's existing convention).
export type RichSegment =
  | { type: "list"; items: string[] }
  | { type: "olist"; items: string[] }
  | { type: "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string };

const NUMBERED_LINE_RE = /^\d+\.\s+/;

export function segmentRichLines(lines: string[]): RichSegment[] {
  const segments: RichSegment[] = [];
  for (const line of lines) {
    const headingMatch = /^(#{2,4})\s+(.*)$/.exec(line);
    if (headingMatch) {
      const level = (headingMatch[1].length === 2 ? "h2" : headingMatch[1].length === 3 ? "h3" : "h4") as "h2" | "h3" | "h4";
      segments.push({ type: level, text: headingMatch[2].trim() });
    } else if (line.startsWith("- ")) {
      const item = line.slice(2).trim();
      const last = segments[segments.length - 1];
      if (last && last.type === "list") last.items.push(item);
      else segments.push({ type: "list", items: [item] });
    } else if (NUMBERED_LINE_RE.test(line)) {
      const item = line.replace(NUMBERED_LINE_RE, "").trim();
      const last = segments[segments.length - 1];
      if (last && last.type === "olist") last.items.push(item);
      else segments.push({ type: "olist", items: [item] });
    } else {
      segments.push({ type: "p", text: line });
    }
  }
  return segments;
}

// Textarea-based editor for CustomBlock "text" content, with a small
// toolbar that inserts the markup renderInlineMarkup/segmentRichLines
// understand — bold, links, bullet lists. A plain <textarea> (rather than
// contentEditable) is used deliberately: selectionStart/selectionEnd make
// "wrap the current selection" and "bullet these lines" trivial and
// reliable, which contentEditable's DOM selection API is not.
export function EditableBlockText({ value, onCommit, placeholder = "Scrivi qui…" }: {
  value: string;
  onCommit: (v: string) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [local, setLocal] = useState(value);
  useEffect(() => { setLocal(value); }, [value]);

  function commit(next: string) {
    setLocal(next);
    onCommit(next);
  }

  function wrapSelection(prefix: string, suffix: string) {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? local.length;
    const e = el.selectionEnd ?? local.length;
    const selected = local.slice(s, e) || "testo";
    const next = local.slice(0, s) + prefix + selected + suffix + local.slice(e);
    commit(next);
    requestAnimationFrame(() => { el.focus(); el.selectionStart = s + prefix.length; el.selectionEnd = s + prefix.length + selected.length; });
  }

  // Shared by every "mark the selected lines as X" toolbar button (bullet,
  // numbered, H2/H3/H4): strips whichever recognized prefix a line already
  // has, then — unless every non-blank line in the selection is already
  // `kind` (in which case the click means "turn it off") — adds `kind`'s
  // prefix instead. Mirrors segmentRichLines' own line classification so
  // the toolbar and the renderer never disagree about what a line is.
  type LineKind = "bullet" | "numbered" | "h2" | "h3" | "h4";
  const LINE_PREFIX_STRIP_RE = /^(#{2,4}\s+|-\s+|\d+\.\s+)/;
  function headingLevelOf(line: string): 2 | 3 | 4 | null {
    const m = /^(#{2,4})\s/.exec(line);
    return m ? (m[1].length as 2 | 3 | 4) : null;
  }
  function lineIsKind(line: string, kind: LineKind): boolean {
    if (kind === "bullet") return line.startsWith("- ");
    if (kind === "numbered") return /^\d+\.\s+/.test(line);
    return headingLevelOf(line) === Number(kind[1]);
  }
  function prefixFor(kind: LineKind): string {
    if (kind === "bullet") return "- ";
    if (kind === "numbered") return "1. ";
    return `${"#".repeat(Number(kind[1]))} `;
  }
  function applyLineStyle(kind: LineKind) {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd ?? 0;
    const lineStart = local.lastIndexOf("\n", s - 1) + 1;
    const nextBreak = local.indexOf("\n", e);
    const lineEnd = nextBreak === -1 ? local.length : nextBreak;
    const lines = local.slice(lineStart, lineEnd).split("\n");
    const allMarked = lines.every((l) => l.trim() === "" || lineIsKind(l, kind));
    const nextLines = lines.map((l) => {
      if (l.trim() === "") return l;
      const bare = l.replace(LINE_PREFIX_STRIP_RE, "");
      return allMarked ? bare : prefixFor(kind) + bare;
    });
    const next = local.slice(0, lineStart) + nextLines.join("\n") + local.slice(lineEnd);
    commit(next);
    requestAnimationFrame(() => el.focus());
  }
  function forceParagraph() {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd ?? 0;
    const lineStart = local.lastIndexOf("\n", s - 1) + 1;
    const nextBreak = local.indexOf("\n", e);
    const lineEnd = nextBreak === -1 ? local.length : nextBreak;
    const lines = local.slice(lineStart, lineEnd).split("\n");
    const nextLines = lines.map((l) => (l.trim() === "" ? l : l.replace(LINE_PREFIX_STRIP_RE, "")));
    const next = local.slice(0, lineStart) + nextLines.join("\n") + local.slice(lineEnd);
    commit(next);
    requestAnimationFrame(() => el.focus());
  }

  function insertLink() {
    const el = ref.current;
    if (!el) return;
    const s = el.selectionStart ?? local.length;
    const e = el.selectionEnd ?? local.length;
    const selected = local.slice(s, e) || "testo del link";
    const url = window.prompt("URL del link (https://… oppure /pagina-interna)", "https://");
    if (!url) return;
    const newTab = window.confirm("Aprire il link in una nuova scheda?");
    commit(local.slice(0, s) + `[${selected}](${url} "${newTab ? "_blank" : "_self"}")` + local.slice(e));
  }

  const toolBtn = "w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center justify-center flex-shrink-0";

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        <button type="button" onClick={() => wrapSelection("**", "**")} title="Grassetto" className={`${toolBtn} text-sm`}>B</button>
        <button type="button" onClick={() => wrapSelection("*", "*")} title="Corsivo" className={`${toolBtn} italic text-sm`}>I</button>
        <button type="button" onClick={insertLink} title="Inserisci link" className={toolBtn}><Link2 size={14} /></button>
        <span className="w-px h-5 bg-white/20 mx-0.5" />
        <button type="button" onClick={() => applyLineStyle("h2")} title="Titolo H2" className={toolBtn}>H2</button>
        <button type="button" onClick={() => applyLineStyle("h3")} title="Titolo H3" className={toolBtn}>H3</button>
        <button type="button" onClick={() => applyLineStyle("h4")} title="Titolo H4" className={toolBtn}>H4</button>
        <button type="button" onClick={forceParagraph} title="Paragrafo normale" className={toolBtn}>P</button>
        <span className="w-px h-5 bg-white/20 mx-0.5" />
        <button type="button" onClick={() => applyLineStyle("bullet")} title="Elenco puntato" className={toolBtn}><List size={14} /></button>
        <button type="button" onClick={() => applyLineStyle("numbered")} title="Elenco numerato" className={toolBtn}><ListOrdered size={14} /></button>
      </div>
      <textarea
        ref={ref}
        value={local}
        onChange={(e) => commit(e.target.value)}
        placeholder={placeholder}
        rows={Math.max(3, local.split("\n").length)}
        className="w-full bg-white/10 focus:bg-white/15 rounded-xl p-4 text-white outline-none resize-y tracking-tight placeholder:text-white/40"
        style={{ fontSize: "1rem", lineHeight: 1.6 }}
      />
    </div>
  );
}

const FIT_LABELS: Record<ImageFit, string> = { cover: "Riempi (taglia)", contain: "Adatta (intera)", original: "Proporzioni originali" };

// Segmented cover/contain/original toggle for an image or gallery block.
// "cover" (default) fills the frame and crops to it; "contain" shows the
// whole image un-cropped, letterboxed on a tinted backdrop; "original"
// drops the fixed-height frame entirely so the box takes the image's own
// aspect ratio — no crop, no letterbox bars.
export function ImageFitControl({ fit, onChange }: { fit?: ImageFit; onChange: (f: ImageFit) => void }) {
  const current: ImageFit = fit === "contain" || fit === "original" ? fit : "cover";
  return (
    <div className="inline-flex rounded-full bg-black/70 p-1 shadow-lg">
      {(["cover", "contain", "original"] as const).map((f) => (
        <button key={f} type="button" onClick={() => onChange(f)}
          className="rounded-full text-[11px] font-bold px-3 py-1.5 whitespace-nowrap"
          style={{ background: current === f ? "#F8AE01" : "transparent", color: current === f ? "#2E2784" : "#fff" }}>
          {FIT_LABELS[f]}
        </button>
      ))}
    </div>
  );
}

// Compact per-image crop control for gallery tiles: a single badge that
// cycles cover → contain → original on click, so it fits on a small
// thumbnail without crowding out the existing delete/reorder buttons.
export function GalleryItemFitControl({ fit, onChange }: { fit: ImageFit; onChange: (f: ImageFit) => void }) {
  const NEXT: Record<ImageFit, ImageFit> = { cover: "contain", contain: "original", original: "cover" };
  const SHORT: Record<ImageFit, string> = { cover: "Taglia", contain: "Adatta", original: "Originale" };
  return (
    <button type="button" onClick={() => onChange(NEXT[fit])}
      title={`Ritaglio: ${FIT_LABELS[fit]} — clicca per cambiare`}
      className="rounded-full bg-black/70 hover:bg-black/85 text-white text-[10px] font-bold px-2.5 py-1 shadow-lg whitespace-nowrap">
      {SHORT[fit]}
    </button>
  );
}

// Tailwind needs literal class strings (no dynamic "grid-cols-N"), hence
// the lookup table rather than string interpolation.
const GALLERY_COL_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};
// A gallery with 2 or 3 images defaults to that many columns (so the row
// fills and centers instead of leaving an empty cell in a fixed 4-column
// grid); 4+ images keep wrapping at 4 per row as before. `columns` on the
// block overrides this when an admin wants something different.
export function autoGalleryColumns(imageCount: number): number {
  return Math.min(Math.max(imageCount, 1), 4);
}
export function galleryColsClass(columns: number | undefined, imageCount: number): string {
  const n = columns && columns >= 1 && columns <= 4 ? columns : autoGalleryColumns(imageCount);
  return GALLERY_COL_CLASSES[n] ?? GALLERY_COL_CLASSES[4];
}

export function GalleryColumnsControl({ columns, imageCount, onChange }: {
  columns?: number;
  imageCount: number;
  onChange: (n: number | undefined) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-black/70 p-1 shadow-lg">
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 pl-2">Colonne</span>
      <button type="button" onClick={() => onChange(undefined)} title={`Automatico (${autoGalleryColumns(imageCount)})`}
        className="rounded-full text-[11px] font-bold px-2.5 py-1.5"
        style={{ background: columns === undefined ? "#F8AE01" : "transparent", color: columns === undefined ? "#2E2784" : "#fff" }}>
        Auto
      </button>
      {[2, 3, 4].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}
          className="rounded-full text-[11px] font-bold w-7 h-7 flex items-center justify-center"
          style={{ background: columns === n ? "#F8AE01" : "transparent", color: columns === n ? "#2E2784" : "#fff" }}>
          {n}
        </button>
      ))}
    </div>
  );
}

export function newBlockId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function blankBlock(type: CustomBlock["type"]): CustomBlock {
  switch (type) {
    case "text": return { id: newBlockId(), type, text: "Nuovo testo — clicca per modificare." };
    case "image": return { id: newBlockId(), type, imageUrl: "" };
    case "gallery": return { id: newBlockId(), type, images: [] };
    case "video": return { id: newBlockId(), type, videoUrl: "" };
  }
}

const BLOCK_TYPE_LABELS: Record<CustomBlock["type"], string> = {
  text: "Testo", image: "Immagine", gallery: "Galleria", video: "Video",
};

export function InsertBlockButton({ onInsert }: { onInsert: (type: CustomBlock["type"]) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-center py-3 group">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[#F8AE01]/0 group-hover:bg-[#F8AE01]/40 transition-colors" />
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="relative z-10 flex items-center gap-1.5 rounded-full bg-[#1a1752] text-white text-[11px] font-bold px-3 py-1.5 opacity-60 hover:opacity-100 transition-opacity shadow-lg">
        <Plus size={12} /> Aggiungi blocco qui
      </button>
      {open && (
        <div className="absolute z-40 top-full mt-2 flex gap-1.5 rounded-xl bg-white p-2 shadow-2xl border border-black/10">
          {(Object.keys(BLOCK_TYPE_LABELS) as CustomBlock["type"][]).map((t) => (
            <button key={t} type="button" onClick={() => { onInsert(t); setOpen(false); }}
              className="rounded-lg bg-[#EEF0FB] text-[#2E2784] text-xs font-semibold px-3 py-2 hover:bg-[#2E2784] hover:text-white transition-colors">
              {BLOCK_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BlockShell({ label, onUp, onDown, onDelete, disabledUp, disabledDown, children }: {
  label: string;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  disabledUp?: boolean;
  disabledDown?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full bg-black/70 text-white pl-3 pr-1.5 py-1.5 shadow-lg backdrop-blur">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
        <button type="button" onClick={onUp} disabled={disabledUp} className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30" aria-label="Sposta su"><ArrowUp size={12} /></button>
        <button type="button" onClick={onDown} disabled={disabledDown} className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center disabled:opacity-30" aria-label="Sposta giù"><ArrowDown size={12} /></button>
        <button type="button" onClick={onDelete} className="w-6 h-6 rounded-full bg-red-600/80 flex items-center justify-center" aria-label="Elimina blocco"><Trash2 size={12} /></button>
      </div>
      {children}
    </div>
  );
}

export function EditableVideoUrl({ url, onCommit, editing }: { url: string; onCommit: (v: string) => void; editing: boolean }) {
  const [open, setOpen] = useState(!url && editing);
  const [value, setValue] = useState(url);
  if (!editing) return null;
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
      {open ? (
        <div className="flex items-center gap-2 rounded-full bg-white shadow-2xl p-1.5 pl-4">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="URL YouTube, Vimeo o file video…"
            className="text-xs w-72 outline-none" />
          <button type="button" onClick={() => { onCommit(value); setOpen(false); }}
            className="rounded-full bg-[#2E2784] text-white text-xs font-bold px-3 py-1.5">Usa</button>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-black/70 text-white text-[11px] font-bold px-3 py-1.5">
          <Pencil size={11} /> Cambia video
        </button>
      )}
    </div>
  );
}
