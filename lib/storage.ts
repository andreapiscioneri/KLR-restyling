import type BetterSqlite3 from "better-sqlite3";
import { getDb, json, bool } from "./db";

/**
 * Layer di persistenza dei contenuti, su SQLite.
 *
 * Mantiene deliberatamente la firma di readContent/writeContent che
 * aveva la versione su Netlify Blobs, così lib/content.ts e tutti i
 * suoi consumatori restano invariati: cambia il backend, non l'API.
 *
 * Le COLLEZIONI (array di record) sono tabelle vere; i SINGOLETTI
 * (documenti annidati) restano JSON nella tabella `documents`.
 *
 * `position` conserva l'ordine dell'array originale: senza ORDER BY
 * esplicito una tabella non garantisce l'ordine di inserimento, e
 * alcune viste del sito ci fanno affidamento.
 */

export const SINGLETON_KEYS = ["pages", "settings", "colors", "stats", "cookieBanner", "customPages"] as const;
export const COLLECTION_KEYS = ["posts", "studies", "brands", "leadership", "positions", "users", "mediaLibrary"] as const;

type AnyRecord = Record<string, any>;

type Mapper = {
  table: string;
  order: string;
  columns: string[];
  toRow: (rec: AnyRecord, index: number, now: string) => AnyRecord;
  fromRow: (row: AnyRecord) => AnyRecord;
};

/** Omette le chiavi con valore null/undefined, per non introdurre campi
 *  assenti nel JSON originale. */
function compact(obj: AnyRecord): AnyRecord {
  const out: AnyRecord = {};
  for (const [k, v] of Object.entries(obj)) if (v !== null && v !== undefined) out[k] = v;
  return out;
}

const MAPPERS: Record<string, Mapper> = {
  posts: {
    table: "posts",
    order: "position ASC",
    columns: ["id","slug","title","date","excerpt","img","link","category","content_html","public_preview","cornerstone","author_name","author_avatar","status","position","updated_at"],
    toRow: (p, i, now) => ({
      id: p.id, slug: p.slug, title: p.title, date: p.date,
      excerpt: p.excerpt ?? "", img: p.img ?? "", link: p.link ?? "", category: p.category ?? "",
      content_html: p.contentHtml ?? "", public_preview: bool.toDb(p.publicPreview), cornerstone: bool.toDb(p.cornerstone),
      author_name: p.authorName ?? "", author_avatar: p.authorAvatar ?? "",
      status: p.status ?? "published", position: i, updated_at: now,
    }),
    fromRow: (r) => ({
      id: r.id, slug: r.slug, title: r.title, date: r.date, excerpt: r.excerpt,
      img: r.img, link: r.link, category: r.category, contentHtml: r.content_html,
      publicPreview: bool.fromDb(r.public_preview), cornerstone: bool.fromDb(r.cornerstone),
      authorName: r.author_name, authorAvatar: r.author_avatar, status: r.status,
    }),
  },

  studies: {
    table: "studies",
    order: "position ASC",
    columns: ["id","cat","client","title","location","year","img","summary","results","brand","details","public_preview","cornerstone","status","position","updated_at"],
    toRow: (s, i, now) => ({
      id: s.id, cat: s.cat ?? "", client: s.client ?? "", title: s.title, location: s.location ?? "",
      year: s.year ?? "", img: s.img ?? "", summary: s.summary ?? "",
      results: json.stringify(s.results ?? []), brand: s.brand ?? "", details: json.stringify(s.details ?? {}),
      public_preview: bool.toDb(s.publicPreview), cornerstone: bool.toDb(s.cornerstone),
      status: s.status ?? "published", position: i, updated_at: now,
    }),
    fromRow: (r) => ({
      id: r.id, cat: r.cat, client: r.client, title: r.title, location: r.location, year: r.year,
      img: r.img, summary: r.summary, results: json.parse(r.results, []), brand: r.brand,
      details: json.parse(r.details, {}),
      publicPreview: bool.fromDb(r.public_preview), cornerstone: bool.fromDb(r.cornerstone), status: r.status,
    }),
  },

  brands: {
    table: "brands",
    order: "position ASC",
    columns: ["id","name","tag","img","logo","since","campaigns","countries","desc_text","position","updated_at"],
    toRow: (b, i, now) => ({
      id: b.id, name: b.name, tag: b.tag ?? null, img: b.img ?? null, logo: b.logo ?? null,
      since: b.since ?? null, campaigns: b.campaigns ?? null, countries: b.countries ?? null,
      desc_text: b.desc ?? null, position: i, updated_at: now,
    }),
    // I brand hanno molti campi opzionali (9 su 13 record li valorizzano):
    // compact() evita di introdurre chiavi null dove prima erano assenti.
    fromRow: (r) => compact({
      id: r.id, name: r.name, tag: r.tag, img: r.img, logo: r.logo,
      since: r.since, campaigns: r.campaigns, countries: r.countries, desc: r.desc_text,
    }),
  },

  leadership: {
    table: "leadership",
    order: "position ASC",
    columns: ["id","name","role","img","bio","quote","linkedin","position","updated_at"],
    toRow: (l, i, now) => ({
      id: l.id, name: l.name, role: l.role ?? "", img: l.img ?? "", bio: l.bio ?? "",
      quote: l.quote ?? "", linkedin: l.linkedin ?? null, position: i, updated_at: now,
    }),
    fromRow: (r) => compact({
      id: r.id, name: r.name, role: r.role, img: r.img, bio: r.bio, quote: r.quote, linkedin: r.linkedin,
    }),
  },

  positions: {
    table: "positions",
    order: "position ASC",
    columns: ["id","role","loc","description","position","updated_at"],
    toRow: (p, i, now) => ({
      id: p.id, role: p.role, loc: p.loc ?? "", description: p.description ?? "", position: i, updated_at: now,
    }),
    fromRow: (r) => ({ id: r.id, role: r.role, loc: r.loc, description: r.description }),
  },

  users: {
    table: "users",
    order: "rowid ASC",
    columns: ["id","name","email","role","password_hash","password_salt","password_iterations","legacy_password","updated_at"],
    toRow: (u, _i, now) => ({
      id: u.id, name: u.name, email: u.email, role: u.role,
      password_hash: u.passwordHash ?? null, password_salt: u.passwordSalt ?? null,
      password_iterations: u.passwordIterations ?? 10000,
      legacy_password: u.password ?? null, updated_at: now,
    }),
    fromRow: (r) => compact({
      id: r.id, name: r.name, email: r.email, role: r.role,
      passwordHash: r.password_hash, passwordSalt: r.password_salt,
      passwordIterations: r.password_iterations, password: r.legacy_password,
    }),
  },

  mediaLibrary: {
    table: "media",
    order: "uploaded_at ASC",
    columns: ["id","blob_key","filename","title","alt","caption","description","mime_type","width","height","filesize","source_url","uploaded_at","updated_at"],
    toRow: (m, _i, now) => ({
      id: m.id, blob_key: m.blobKey, filename: m.filename, title: m.title ?? "", alt: m.alt ?? "",
      caption: m.caption ?? "", description: m.description ?? "", mime_type: m.mimeType,
      width: m.width ?? null, height: m.height ?? null, filesize: m.filesize ?? null,
      source_url: m.sourceUrl ?? null, uploaded_at: m.uploadedAt ?? now, updated_at: m.updatedAt ?? now,
    }),
    fromRow: (r) => compact({
      id: r.id, blobKey: r.blob_key, filename: r.filename, title: r.title, alt: r.alt,
      caption: r.caption, description: r.description, mimeType: r.mime_type,
      width: r.width, height: r.height, filesize: r.filesize, sourceUrl: r.source_url,
      uploadedAt: r.uploaded_at, updatedAt: r.updated_at,
    }),
  },
};

const isSingleton = (key: string) => (SINGLETON_KEYS as readonly string[]).includes(key);

// ── Lettura ───────────────────────────────────────────────────

function readContentSync<T>(key: string, fallback: T, database?: BetterSqlite3.Database): T {
  const db = database ?? getDb();

  if (isSingleton(key)) {
    const row = db.prepare("SELECT data FROM documents WHERE key = ?").get(key) as { data: string } | undefined;
    return row ? json.parse<T>(row.data, fallback) : fallback;
  }

  const mapper = MAPPERS[key];
  if (!mapper) {
    console.error(`readContent: chiave sconosciuta "${key}"`);
    return fallback;
  }

  const rows = db.prepare(`SELECT * FROM ${mapper.table} ORDER BY ${mapper.order}`).all() as AnyRecord[];
  return rows.map(mapper.fromRow) as unknown as T;
}

export async function readContent<T>(key: string, fallback: T): Promise<T> {
  try {
    return readContentSync(key, fallback);
  } catch (err) {
    console.error(`readContent("${key}") fallita:`, err);
    return fallback;
  }
}

// ── Scrittura ─────────────────────────────────────────────────

/**
 * Sostituisce l'intero contenuto della chiave.
 *
 * Per le collezioni è un replace completo dentro una transazione:
 * mantiene la semantica dell'API admin (che invia sempre l'array
 * intero) ma diventa atomico — o passa tutto, o non passa niente.
 * Sparisce così la finestra in cui la vecchia versione su Blobs
 * poteva lasciare i dati a metà.
 */
export function writeContentSync(key: string, data: unknown, database?: BetterSqlite3.Database): void {
  const db = database ?? getDb();
  const now = new Date().toISOString();

  if (isSingleton(key)) {
    db.prepare("INSERT INTO documents (key, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at")
      .run(key, json.stringify(data), now);
    return;
  }

  const mapper = MAPPERS[key];
  if (!mapper) throw new Error(`writeContent: chiave sconosciuta "${key}"`);
  if (!Array.isArray(data)) throw new Error(`writeContent("${key}"): atteso un array, ricevuto ${typeof data}`);

  const placeholders = mapper.columns.map((c) => `@${c}`).join(", ");
  const insert = db.prepare(`INSERT INTO ${mapper.table} (${mapper.columns.join(", ")}) VALUES (${placeholders})`);
  const clear = db.prepare(`DELETE FROM ${mapper.table}`);

  db.transaction((records: AnyRecord[]) => {
    clear.run();
    records.forEach((rec, i) => insert.run(mapper.toRow(rec, i, now)));
  })(data as AnyRecord[]);
}

export async function writeContent(key: string, data: unknown): Promise<void> {
  writeContentSync(key, data);
}
