#!/usr/bin/env node
/**
 * Importa nella libreria media i file recuperati dal vecchio sito.
 *
 * Alcuni contenuti migrati citano immagini che non erano mai finite
 * nella libreria: gli URL /wp-content/uploads/... esistevano solo su
 * WordPress. Finché il vecchio server risponde si possono recuperare, e
 * questo script li registra come media veri, con il percorso originale
 * salvato in source_url — è quello su cui
 * app/wp-content/uploads/[...path] fa la risoluzione.
 *
 * Uso: node scripts/import-legacy-media.mjs <cartella> [--db <file>] [--media <dir>] [--apply]
 *
 * I file nella cartella vanno nominati con il percorso originale in cui
 * le barre sono sostituite da "__", come li produce lo scaricamento.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import Database from "better-sqlite3";
import sharp from "sharp";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const APPLY = args.includes("--apply");
const SRC_DIR = args[0];
const DB_PATH = arg("--db", "data/klr.db");
const MEDIA_DIR = arg("--media", "data/media");

if (!SRC_DIR || !fs.existsSync(SRC_DIR)) {
  console.error("Indicare la cartella con i file recuperati.");
  process.exit(1);
}

const MIME = { ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".gif":"image/gif",
               ".webp":"image/webp", ".svg":"image/svg+xml", ".mp4":"video/mp4", ".pdf":"application/pdf" };

const db = new Database(DB_PATH);
const exists = db.prepare("SELECT id FROM media WHERE source_url = ?");
const insert = db.prepare(`INSERT INTO media
  (id, blob_key, filename, title, alt, caption, description, mime_type, width, height, filesize, source_url, uploaded_at, updated_at)
  VALUES (@id, @blob_key, @filename, @title, '', '', '', @mime_type, @width, @height, @filesize, @source_url, @now, @now)`);

const files = fs.readdirSync(SRC_DIR).filter(f => !f.startsWith("."));
let importati = 0, saltati = 0, byte = 0;
const righe = [];

for (const f of files) {
  const full = path.join(SRC_DIR, f);
  const originale = "/" + f.replaceAll("__", "/");
  const sourceUrl = `https://klr-europe.com${originale}`;

  if (exists.get(sourceUrl)) { saltati++; continue; }

  const ext = path.extname(originale).toLowerCase();
  const id = crypto.randomUUID();
  const blobKey = `${id}${ext}`;
  const size = fs.statSync(full).size;

  let width = null, height = null;
  try {
    const meta = await sharp(full).metadata();
    width = meta.width ?? null; height = meta.height ?? null;
  } catch { /* non è un'immagine leggibile: si registra comunque */ }

  righe.push({
    id, blob_key: blobKey, filename: path.basename(originale),
    title: path.basename(originale), mime_type: MIME[ext] ?? "application/octet-stream",
    width, height, filesize: size, source_url: sourceUrl, now: new Date().toISOString(),
    _src: full,
  });
  importati++; byte += size;
}

console.log(`  da importare: ${importati}   già presenti: ${saltati}   ${(byte/1024/1024).toFixed(1)} MB`);

if (!APPLY) {
  console.log("\n  (anteprima: nessuna modifica. Rilanciare con --apply)");
  process.exit(0);
}

fs.mkdirSync(MEDIA_DIR, { recursive: true });
db.transaction(() => {
  for (const r of righe) {
    fs.copyFileSync(r._src, path.join(MEDIA_DIR, r.blob_key));
    const { _src, ...row } = r;
    insert.run(row);
  }
})();

console.log(`  importati ${importati} file in ${MEDIA_DIR} e registrati nella libreria`);
db.close();
