import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

/**
 * Connessione SQLite condivisa.
 *
 * Sostituisce lo store Netlify Blobs. Il DB vive FUORI dal repo
 * (DATABASE_PATH), altrimenti un `git pull` in fase di deploy
 * sovrascriverebbe i contenuti modificati dal CMS.
 *
 * better-sqlite3 è sincrono: le funzioni che lo usano mantengono
 * comunque una firma async per non toccare i call site esistenti.
 */

const DEFAULT_DB = path.join(process.cwd(), "data", "klr.db");
const SCHEMA_PATH = path.join(process.cwd(), "db", "schema.sql");

export const DB_PATH = process.env.DATABASE_PATH || DEFAULT_DB;
export const MEDIA_DIR = process.env.MEDIA_DIR || path.join(path.dirname(DB_PATH), "media");
const CONTENT_SEED_DIR = path.join(process.cwd(), "content");

// In dev l'hot reload rivaluta i moduli a ogni modifica: senza cache
// globale si accumulerebbero connessioni al file finché non esaurisce
// i descrittori.
const globalForDb = globalThis as unknown as { __klrDb?: Database.Database };

/**
 * Migrazioni incrementali.
 *
 * db/schema.sql descrive sempre lo stato più recente, quindi un DB
 * creato da zero nasce già aggiornato; queste servono ai database
 * esistenti — in primis quello di produzione, creato prima che lo
 * schema cambiasse. Ogni migrazione deve essere idempotente, così
 * riapplicarla su un DB già a posto non fa danni.
 */
type Migration = { version: number; describe: string; apply: (db: Database.Database) => void };

function columnExists(db: Database.Database, table: string, column: string): boolean {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  return cols.some((c) => c.name === column);
}

function addColumnIfMissing(db: Database.Database, table: string, column: string, definition: string): void {
  if (columnExists(db, table, column)) return;
  db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  console.log(`migrazione: aggiunta ${table}.${column}`);
}

const MIGRATIONS: Migration[] = [
  {
    version: 2,
    describe: "users: numero di iterazioni PBKDF2 e password legacy",
    apply(db) {
      addColumnIfMissing(db, "users", "password_iterations", "INTEGER NOT NULL DEFAULT 10000");
      addColumnIfMissing(db, "users", "legacy_password", "TEXT");
    },
  },
  {
    version: 3,
    describe: "pages: testi delle sezioni a elenco resi modificabili dal CMS",
    apply: seedCmsItems,
  },
  {
    version: 4,
    describe: "riferimenti alle immagini convertite in WebP",
    apply(db) {
      // Le immagini pesanti di public/ sono state convertite da PNG a
      // WebP (78,7 MB -> 4,5 MB). I riferimenti nel codice sono stati
      // aggiornati direttamente; questo sistema quelli salvati nel
      // database dal CMS.
      const renamed: Record<string, string> = {
        "/team/KLR-Antonio-fondo-giallo.png": "/team/KLR-Antonio-fondo-giallo.webp",
      };
      const columns: [string, string][] = [
        ["leadership", "img"],
        ["brands", "img"], ["brands", "logo"],
        ["posts", "img"], ["posts", "author_avatar"], ["posts", "content_html"],
        ["studies", "img"], ["studies", "details"],
        ["documents", "data"],
      ];
      for (const [from, to] of Object.entries(renamed)) {
        for (const [table, column] of columns) {
          const info = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
          if (!info.some((c) => c.name === column)) continue;
          db.prepare(
            `UPDATE ${table} SET ${column} = replace(${column}, ?, ?) WHERE ${column} LIKE ?`
          ).run(from, to, `%${from}%`);
        }
      }
    },
  },
];

/**
 * Porta nel CMS i testi che erano leggibili sul sito ma scritti solo nel
 * codice: settori, tappe del percorso, "cosa consegniamo" e "l'impatto".
 * L'editor generico dell'admin mostra i campi che trova nel JSON, quindi
 * finché queste chiavi non esistono i testi restano non modificabili.
 *
 * I valori di partenza sono quelli già in pagina, presi da src/app/data.ts
 * invece che ricopiati, così non possono divergere.
 */
function seedCmsItems(db: Database.Database): void {
  const {
    sectors, journey, whatWeDeliver, aboutImpact,
  } = require("@/src/app/data") as typeof import("@/src/app/data");

  const row = db.prepare("SELECT data FROM documents WHERE key = 'pages'").get() as { data: string } | undefined;
  if (!row) return;

  let pages: Record<string, Record<string, Record<string, unknown>>>;
  try {
    pages = JSON.parse(row.data);
  } catch {
    console.error("migrazione: 'pages' non è JSON valido, saltata");
    return;
  }

  // Scrive item1..itemN solo se assenti: non sovrascrive testi già
  // modificati da un redattore.
  const addItems = (page: string, section: string, items: readonly Record<string, unknown>[]) => {
    const target = pages[page]?.[section];
    if (!target || typeof target !== "object") return;
    items.forEach((item, i) => {
      const key = `item${i + 1}`;
      if (target[key] === undefined) target[key] = { ...item };
    });
  };

  addItems("home", "sectors", sectors);
  addItems("about", "journey", journey);
  addItems("about", "ourSolution", whatWeDeliver);
  addItems("about", "impact", aboutImpact);

  // services.ecosystem non esisteva affatto: la sezione "Born for Grocery
  // & Petrol" aveva eyebrow e titolo scritti nel JSX. Il titolo resta
  // vuoto di proposito, così la pagina continua a usare la versione con
  // l'andata a capo finché qualcuno non lo compila.
  if (pages.services && !pages.services.ecosystem) {
    pages.services.ecosystem = { _visible: true, eyebrow: "Our Ecosystem", title: "" };
  }
  addItems("services", "ecosystem", sectors);

  db.prepare("UPDATE documents SET data = ?, updated_at = ? WHERE key = 'pages'")
    .run(JSON.stringify(pages), new Date().toISOString());
}

const LATEST_VERSION = MIGRATIONS.reduce((max, m) => Math.max(max, m.version), 1);

function hasSchema(db: Database.Database): boolean {
  return Boolean(
    db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations'").get()
  );
}

function appliedVersions(db: Database.Database): Set<number> {
  const rows = db.prepare("SELECT version FROM schema_migrations").all() as { version: number }[];
  return new Set(rows.map((r) => r.version));
}

function recordVersion(db: Database.Database, version: number): void {
  db.prepare("INSERT OR IGNORE INTO schema_migrations (version, applied_at) VALUES (?, ?)")
    .run(version, new Date().toISOString());
}

function runMigrations(db: Database.Database): void {
  const applied = appliedVersions(db);
  for (const migration of MIGRATIONS) {
    if (applied.has(migration.version)) continue;
    db.transaction(() => {
      migration.apply(db);
      recordVersion(db, migration.version);
    })();
    console.log(`migrazione ${migration.version} applicata: ${migration.describe}`);
  }
}

/**
 * Popola un DB vuoto dai content/*.json versionati nel repo.
 *
 * Serve solo al primo avvio di un'installazione nuova (dev locale,
 * ambiente di staging). In produzione il DB arriva già popolato da
 * scripts/import-to-sqlite.mjs, e questa funzione non fa nulla perché
 * le tabelle non sono vuote.
 */
function seedFromContentFiles(db: Database.Database): void {
  if (!fs.existsSync(CONTENT_SEED_DIR)) return;
  const readSeed = (key: string): unknown => {
    const p = path.join(CONTENT_SEED_DIR, `${key}.json`);
    if (!fs.existsSync(p)) return null;
    try {
      return JSON.parse(fs.readFileSync(p, "utf-8"));
    } catch {
      console.error(`Seed ${key}: JSON non valido, ignorato`);
      return null;
    }
  };

  // import differito: storage.ts importa db.ts, quindi l'import in cima
  // creerebbe un ciclo.
  const { writeContentSync, COLLECTION_KEYS, SINGLETON_KEYS } = require("./storage") as typeof import("./storage");

  for (const key of [...SINGLETON_KEYS, ...COLLECTION_KEYS]) {
    const data = readSeed(key);
    if (data === null) continue;
    try {
      writeContentSync(key, data, db);
    } catch (err) {
      console.error(`Seed ${key} fallito:`, err);
    }
  }
  console.log("DB inizializzato dai content/*.json del repo");
}

function bootstrap(db: Database.Database): void {
  if (hasSchema(db)) {
    // DB già esistente: si applicano solo le migrazioni mancanti.
    runMigrations(db);
    return;
  }

  if (!fs.existsSync(SCHEMA_PATH)) {
    throw new Error(`Schema non trovato in ${SCHEMA_PATH}`);
  }
  // db/schema.sql descrive già lo stato più recente: si registrano tutte
  // le versioni come applicate invece di rieseguirle come ALTER.
  db.exec(fs.readFileSync(SCHEMA_PATH, "utf-8"));
  for (let v = 1; v <= LATEST_VERSION; v++) recordVersion(db, v);
  seedFromContentFiles(db);
}

export function getDb(): Database.Database {
  if (globalForDb.__klrDb) return globalForDb.__klrDb;

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.mkdirSync(MEDIA_DIR, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");   // letture concorrenti durante una scrittura
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");  // attende invece di fallire su lock contesi
  bootstrap(db);

  globalForDb.__klrDb = db;
  return db;
}

export const json = {
  parse<T>(value: string | null | undefined, fallback: T): T {
    if (!value) return fallback;
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  },
  stringify(value: unknown): string {
    return JSON.stringify(value ?? null);
  },
};

export const bool = {
  toDb(v: unknown): 0 | 1 {
    return v ? 1 : 0;
  },
  fromDb(v: unknown): boolean {
    return v === 1 || v === true;
  },
};
