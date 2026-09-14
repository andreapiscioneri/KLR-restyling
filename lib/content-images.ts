import { getMediaBySourceUrl, getMediaRecord } from "@/lib/media-storage";

/**
 * Fa passare dall'ottimizzatore di Next le immagini dentro l'HTML degli
 * articoli.
 *
 * Il corpo degli articoli viene reso con dangerouslySetInnerHTML, quindi
 * i suoi <img> non attraversano ImageWithFallback e il file arriva al
 * browser così com'è, a piena risoluzione.
 *
 * Non basta puntare l'ottimizzatore ai vecchi indirizzi: su
 * /wp-content/uploads/... la nostra route risponde con un redirect, e
 * l'ottimizzatore non lo segue (risponde 500). Vanno quindi risolti
 * prima a /api/media/<id>, il che richiede una lettura dal database e
 * limita questa funzione al lato server.
 *
 * IMPORTANTE: il risultato è solo per la visualizzazione. In modifica va
 * mostrato l'HTML originale, altrimenti l'editor in linea risalverebbe
 * nel database gli indirizzi riscritti.
 */

const WIDTHS = [640, 828, 1080, 1920] as const;
const DEFAULT_SIZES = "(max-width: 768px) 100vw, 768px";

function optimizedSrc(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** Riporta un indirizzo dell'articolo alla route che serve quel media. */
function resolveToMediaPath(raw: string): string | null {
  let src = raw.trim();
  if (!src) return null;

  // Indirizzi assoluti sul nostro dominio: si lavora sul percorso.
  src = src.replace(/^https?:\/\/(www\.)?klr-europe\.com/i, "");
  if (!src.startsWith("/")) return null;

  const path = src.split("#")[0].split("?")[0];

  const media = path.match(/^\/api\/media\/([^/]+)$/);
  if (media) return getMediaRecord(decodeURIComponent(media[1])) ? path : null;

  if (path.startsWith("/wp-content/uploads/")) {
    let decoded = path;
    try { decoded = decodeURIComponent(path); } catch { /* percorso già letterale */ }
    const record = getMediaBySourceUrl(decoded) ?? getMediaBySourceUrl(path);
    return record ? `/api/media/${record.id}` : null;
  }

  return null;
}

function hasAttr(tag: string, name: string): boolean {
  return new RegExp(`\\s${name}\\s*=`, "i").test(tag);
}

export function optimizeContentImages(html: string | null | undefined): string {
  if (!html) return "";

  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const srcMatch = tag.match(/\ssrc\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) return tag;

    const target = resolveToMediaPath(srcMatch[1]);
    // Indirizzi esterni, SVG o media non in libreria restano come sono.
    if (!target) return tag;

    const srcset = WIDTHS.map((w) => `${optimizedSrc(target, w)} ${w}w`).join(", ");
    let out = tag.replace(srcMatch[0], ` src="${optimizedSrc(target, 1080)}"`);

    if (!hasAttr(out, "srcset")) out = out.replace(/<img\b/i, `<img srcset="${srcset}"`);
    if (!hasAttr(out, "sizes"))  out = out.replace(/<img\b/i, `<img sizes="${DEFAULT_SIZES}"`);
    // Quaranta foto in un articolo sono la norma: senza lazy loading
    // partirebbero tutte insieme.
    if (!hasAttr(out, "loading"))  out = out.replace(/<img\b/i, `<img loading="lazy"`);
    if (!hasAttr(out, "decoding")) out = out.replace(/<img\b/i, `<img decoding="async"`);

    return out;
  });
}
