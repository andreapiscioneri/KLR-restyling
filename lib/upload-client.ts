"use client";

/**
 * Caricamento file dal browser, condiviso da tutti i punti dell'admin
 * (editor in pagina, dashboard, libreria media).
 *
 * Due problemi che questo modulo esiste per evitare:
 * - una richiesta che non risponde mai lasciava la rotella a girare per
 *   sempre senza nessun messaggio: ora c'è un timeout e ogni esito,
 *   errore compreso, arriva all'utente come testo comprensibile;
 * - il reverse proxy (nginx) rifiuta i corpi oltre il suo
 *   client_max_body_size, spesso chiudendo la connessione a metà invio
 *   (il browser vede un errore di rete, non un 413): le immagini vengono
 *   quindi ridimensionate e compresse qui prima dell'invio, così una
 *   foto da fotocamera non arriva mai al server con decine di MB.
 */

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // stesso limite di /api/admin/upload
const DEFAULT_TIMEOUT_MS = 3 * 60 * 1000;

// Le immagini sopra questa soglia (o oltre MAX_IMAGE_DIM px) vengono
// ricompresse; i tentativi scendono di lato e qualità finché il file non
// sta sotto la soglia. 2560px WebP resta più che nitido per il sito.
const IMAGE_TARGET_BYTES = 900 * 1024;
const MAX_IMAGE_DIM = 2560;
const IMAGE_ATTEMPTS: Array<[number, number]> = [[2560, 0.85], [2048, 0.8], [1920, 0.72], [1600, 0.65]];
// GIF (animazioni) e SVG (vettoriali) non passano mai dal canvas.
const RECOMPRESSIBLE = /^image\/(jpeg|jpg|png|webp|heic|heif|avif|bmp)$/i;

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

async function decodeImage(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; close: () => void } | null> {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
    return { source: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() };
  } catch {
    // Fallback per i browser senza createImageBitmap(file) completo.
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return { source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) };
    } catch {
      URL.revokeObjectURL(url);
      return null; // es. HEIC su Chrome: si invia l'originale
    }
  }
}

/** Ridimensiona/comprime un'immagine raster pesante; altrimenti restituisce il file com'è. */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (typeof document === "undefined" || !RECOMPRESSIBLE.test(file.type)) return file;
  const decoded = await decodeImage(file);
  if (!decoded) return file;
  try {
    const { source, width, height } = decoded;
    if (file.size <= IMAGE_TARGET_BYTES && Math.max(width, height) <= MAX_IMAGE_DIM) return file;

    let best: Blob | null = null;
    for (const [maxDim, quality] of IMAGE_ATTEMPTS) {
      const scale = Math.min(1, maxDim / Math.max(width, height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return file;
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
      // WebP conserva la trasparenza dei PNG; se il browser non sa
      // codificarlo (toBlob ricade su PNG), si usa JPEG per le foto.
      let blob = await canvasToBlob(canvas, "image/webp", quality);
      if (!blob || blob.type !== "image/webp") {
        blob = file.type === "image/png" ? await canvasToBlob(canvas, "image/png", 1) : await canvasToBlob(canvas, "image/jpeg", quality);
      }
      if (blob && (!best || blob.size < best.size)) best = blob;
      if (best && best.size <= IMAGE_TARGET_BYTES) break;
    }
    if (!best || best.size >= file.size) return file;
    const ext = best.type === "image/webp" ? "webp" : best.type === "image/png" ? "png" : "jpg";
    const name = file.name.replace(/\.[^.]+$/, "") + "." + ext;
    return new File([best], name, { type: best.type, lastModified: Date.now() });
  } catch {
    return file;
  } finally {
    decoded.close();
  }
}

function formatMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

export type UploadOptions = {
  endpoint?: string;
  method?: "POST" | "PUT";
  extraFields?: Record<string, string>;
  timeoutMs?: number;
};

/**
 * Invia un file all'endpoint admin e restituisce il JSON di risposta.
 * Lancia sempre un Error con un messaggio già pronto da mostrare.
 */
export async function uploadAdminFile(file: File, opts: UploadOptions = {}): Promise<{ url?: string; [k: string]: unknown }> {
  const { endpoint = "/api/admin/upload", method = "POST", extraFields, timeoutMs = DEFAULT_TIMEOUT_MS } = opts;
  const prepared = file.type.startsWith("image/") ? await prepareImageForUpload(file) : file;

  if (prepared.size > MAX_UPLOAD_BYTES) {
    throw new Error(`Il file pesa ${formatMB(prepared.size)}: il massimo è ${formatMB(MAX_UPLOAD_BYTES)}. Comprimilo e riprova.`);
  }

  const fd = new FormData();
  fd.append("file", prepared);
  for (const [k, v] of Object.entries(extraFields ?? {})) fd.append(k, v);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(endpoint, { method, body: fd, credentials: "include", signal: controller.signal });
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error(`Il caricamento non ha risposto entro ${Math.round(timeoutMs / 1000)} secondi. Controlla la connessione e riprova.`);
    }
    // nginx che rifiuta un corpo troppo grande spesso chiude la
    // connessione a metà invio: il browser lo riporta come errore di rete.
    throw new Error(`Connessione interrotta durante il caricamento (${formatMB(prepared.size)}). Se il file è grande, prova con uno più leggero; altrimenti riprova.`);
  } finally {
    clearTimeout(timer);
  }

  const json = (await res.json().catch(() => null)) as { url?: string; error?: string; details?: string } | null;
  if (res.ok && json) return json;
  if (res.status === 413) throw new Error(`File troppo grande per il server (${formatMB(prepared.size)}). Prova con un file più leggero.`);
  if (res.status === 401) throw new Error("Sessione scaduta: ricarica la pagina, accedi di nuovo e riprova.");
  throw new Error(json?.error || json?.details || `Caricamento fallito (errore ${res.status}). Riprova.`);
}
