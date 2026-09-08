import fs from "fs";
import path from "path";
import { getDb, MEDIA_DIR } from "./db";

/**
 * Media: metadati su SQLite, binari su filesystem.
 *
 * Prima erano entrambi su Netlify Blobs, e ogni richiesta di immagine
 * deserializzava il manifest completo (545 KB, 1121 record) per
 * risolvere un singolo id. Ora è una SELECT su chiave primaria.
 *
 * I file vivono in MEDIA_DIR, fuori dal repo, così un deploy non li
 * tocca. In produzione nginx li serve direttamente senza passare da
 * Node; le funzioni qui restano per l'admin e per il fallback.
 */

export type MediaRecord = {
  id: string;
  blobKey: string;
  filename: string;
  title: string;
  alt: string;
  caption: string;
  description: string;
  mimeType: string;
  width?: number;
  height?: number;
  filesize?: number;
  sourceUrl?: string;
  uploadedAt: string;
  updatedAt: string;
};

type Row = {
  id: string; blob_key: string; filename: string; title: string; alt: string;
  caption: string; description: string; mime_type: string;
  width: number | null; height: number | null; filesize: number | null;
  source_url: string | null; uploaded_at: string; updated_at: string;
};

function fromRow(r: Row): MediaRecord {
  const rec: MediaRecord = {
    id: r.id, blobKey: r.blob_key, filename: r.filename, title: r.title, alt: r.alt,
    caption: r.caption, description: r.description, mimeType: r.mime_type,
    uploadedAt: r.uploaded_at, updatedAt: r.updated_at,
  };
  if (r.width !== null) rec.width = r.width;
  if (r.height !== null) rec.height = r.height;
  if (r.filesize !== null) rec.filesize = r.filesize;
  if (r.source_url) rec.sourceUrl = r.source_url;
  return rec;
}

/**
 * Con Netlify Blobs blobKey era solo una chiave opaca; su filesystem
 * diventa un percorso, quindi un'estensione derivata dal nome file
 * caricato dall'utente potrebbe contenere separatori o "..".
 * Qui si accettano solo nomi piatti, e si verifica comunque che il
 * percorso risolto resti dentro MEDIA_DIR.
 */
const SAFE_KEY = /^[A-Za-z0-9][A-Za-z0-9._-]{0,254}$/;

export function assertSafeBlobKey(blobKey: string): string {
  if (!SAFE_KEY.test(blobKey) || blobKey.includes("..")) {
    throw new Error(`blobKey non valida: ${JSON.stringify(blobKey)}`);
  }
  return blobKey;
}

export function sanitizeExtension(filename: string): string {
  const ext = filename.includes(".") ? filename.split(".").pop() ?? "" : "";
  const clean = ext.replace(/[^A-Za-z0-9]/g, "").slice(0, 16).toLowerCase();
  return clean;
}

export function buildBlobKey(id: string, filename: string): string {
  const ext = sanitizeExtension(filename);
  return assertSafeBlobKey(`${id}${ext ? `.${ext}` : ""}`);
}

export function getMediaFilePath(blobKey: string): string {
  const full = path.resolve(MEDIA_DIR, assertSafeBlobKey(blobKey));
  const root = path.resolve(MEDIA_DIR);
  if (full !== root && !full.startsWith(root + path.sep)) {
    throw new Error("percorso media fuori da MEDIA_DIR");
  }
  return full;
}

// ── Metadati ──────────────────────────────────────────────────

/** Lookup singolo: sostituisce la lettura dell'intero manifest. */
export function getMediaRecord(id: string): MediaRecord | null {
  const row = getDb().prepare("SELECT * FROM media WHERE id = ?").get(id) as Row | undefined;
  return row ? fromRow(row) : null;
}

export async function readMediaManifest(): Promise<MediaRecord[]> {
  const rows = getDb().prepare("SELECT * FROM media ORDER BY uploaded_at ASC").all() as Row[];
  return rows.map(fromRow);
}

/** Filtro lato SQL per la libreria media dell'admin. */
export function queryMedia(opts: { q?: string; type?: string } = {}): MediaRecord[] {
  const where: string[] = [];
  const params: Record<string, string> = {};
  if (opts.type && opts.type !== "all") {
    where.push("mime_type LIKE @type");
    params.type = `${opts.type}%`;
  }
  if (opts.q) {
    where.push("(filename LIKE @q OR title LIKE @q OR alt LIKE @q OR caption LIKE @q OR description LIKE @q)");
    params.q = `%${opts.q}%`;
  }
  const sql = `SELECT * FROM media ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY updated_at DESC`;
  return (getDb().prepare(sql).all(params) as Row[]).map(fromRow);
}

export function countMedia(): number {
  return (getDb().prepare("SELECT COUNT(*) AS c FROM media").get() as { c: number }).c;
}

const UPSERT = `INSERT INTO media
  (id, blob_key, filename, title, alt, caption, description, mime_type, width, height, filesize, source_url, uploaded_at, updated_at)
  VALUES (@id, @blob_key, @filename, @title, @alt, @caption, @description, @mime_type, @width, @height, @filesize, @source_url, @uploaded_at, @updated_at)
  ON CONFLICT(id) DO UPDATE SET
    blob_key = excluded.blob_key, filename = excluded.filename, title = excluded.title,
    alt = excluded.alt, caption = excluded.caption, description = excluded.description,
    mime_type = excluded.mime_type, width = excluded.width, height = excluded.height,
    filesize = excluded.filesize, source_url = excluded.source_url, updated_at = excluded.updated_at`;

function toParams(m: MediaRecord) {
  return {
    id: m.id, blob_key: m.blobKey, filename: m.filename, title: m.title ?? "", alt: m.alt ?? "",
    caption: m.caption ?? "", description: m.description ?? "", mime_type: m.mimeType,
    width: m.width ?? null, height: m.height ?? null, filesize: m.filesize ?? null,
    source_url: m.sourceUrl ?? null, uploaded_at: m.uploadedAt, updated_at: m.updatedAt,
  };
}

export function upsertMediaRecord(record: MediaRecord): void {
  getDb().prepare(UPSERT).run(toParams(record));
}

export function deleteMediaRecord(id: string): void {
  getDb().prepare("DELETE FROM media WHERE id = ?").run(id);
}

/** Compatibilità: sostituisce l'intera libreria in una transazione.
 *  Preferire le funzioni granulari sopra nei percorsi caldi. */
export async function writeMediaManifest(records: MediaRecord[]): Promise<void> {
  const db = getDb();
  const upsert = db.prepare(UPSERT);
  db.transaction((list: MediaRecord[]) => {
    db.prepare("DELETE FROM media").run();
    for (const m of list) upsert.run(toParams(m));
  })(records);
}

// ── Binari ────────────────────────────────────────────────────

export async function putMediaBlob(key: string, data: ArrayBuffer, _mimeType?: string): Promise<void> {
  const dest = getMediaFilePath(key);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  // Scrittura atomica: un rename non lascia mai un file mezzo caricato
  // visibile a una richiesta concorrente.
  const tmp = `${dest}.${process.pid}.part`;
  fs.writeFileSync(tmp, Buffer.from(data));
  fs.renameSync(tmp, dest);
}

export async function getMediaBlob(key: string): Promise<{ data: Buffer; metadata: Record<string, unknown> } | null> {
  let full: string;
  try {
    full = getMediaFilePath(key);
  } catch {
    return null;
  }
  if (!fs.existsSync(full)) return null;
  const stat = fs.statSync(full);
  return {
    data: fs.readFileSync(full),
    metadata: { etag: `"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`, size: stat.size },
  };
}

export async function deleteMediaBlob(key: string): Promise<void> {
  try {
    const full = getMediaFilePath(key);
    if (fs.existsSync(full)) fs.unlinkSync(full);
  } catch (err) {
    console.error(`deleteMediaBlob(${key}):`, err);
  }
}

export function mediaUrl(id: string): string {
  return `/api/media/${id}`;
}
