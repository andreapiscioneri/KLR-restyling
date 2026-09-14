#!/usr/bin/env node
/**
 * Converte in WebP le immagini pesanti della libreria media.
 *
 * I contenuti degli articoli sono resi con dangerouslySetInnerHTML,
 * quindi i loro <img> non passano dall'ottimizzatore di Next: il file
 * viene consegnato così com'è. Con PNG da diversi MB questo significa
 * pagine da 10 MB. Alleggerire la sorgente è l'unico intervento che
 * vale sia per quel percorso sia per gli altri.
 *
 * Restano fuori video e GIF animate (sharp le appiattirebbe) e gli SVG,
 * che non guadagnerebbero nulla.
 *
 * source_url non viene toccato: è la chiave su cui i vecchi URL di
 * WordPress vengono risolti.
 *
 * Gli originali non vengono cancellati ma spostati in una sottocartella
 * .originali: l'operazione è massiva e irreversibile sui file, e finché
 * quella cartella c'è si può tornare indietro. Si può svuotare a mano
 * una volta verificato l'esito.
 *
 * Uso: node scripts/optimize-media-library.mjs [--db f] [--media d] [--min-mb 1] [--quality 90] [--apply]
 */
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import sharp from "sharp";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const APPLY = args.includes("--apply");
const DB_PATH = arg("--db", "data/klr.db");
const MEDIA_DIR = arg("--media", "data/media");
const MIN_BYTES = Number(arg("--min-mb", 1)) * 1024 * 1024;
const QUALITY = Number(arg("--quality", 90));

const CONVERTIBILI = new Set(["image/png", "image/jpeg", "image/heic", "image/tiff"]);
const BACKUP_DIR = path.join(MEDIA_DIR, ".originali");

const db = new Database(DB_PATH);
const rows = db.prepare(
  "SELECT id, blob_key, filename, mime_type, filesize FROM media WHERE filesize > ? ORDER BY filesize DESC"
).all(MIN_BYTES);

const update = db.prepare(
  "UPDATE media SET blob_key = ?, mime_type = 'image/webp', filesize = ?, updated_at = ? WHERE id = ?"
);

let prima = 0, dopo = 0, fatti = 0, saltati = 0;
const errori = [];

for (const r of rows) {
  if (!CONVERTIBILI.has(r.mime_type)) { saltati++; continue; }

  const src = path.join(MEDIA_DIR, r.blob_key);
  if (!fs.existsSync(src)) { errori.push(`${r.id}: file assente (${r.blob_key})`); continue; }

  const nuovoKey = r.blob_key.replace(/\.[^.]+$/, "") + ".webp";
  if (nuovoKey === r.blob_key) { saltati++; continue; }

  try {
    const buf = await sharp(src).webp({ quality: QUALITY, effort: 5 }).toBuffer();
    // Se la conversione non guadagna nulla, si lascia l'originale.
    if (buf.length >= r.filesize) { saltati++; continue; }

    prima += r.filesize; dopo += buf.length; fatti++;

    if (APPLY) {
      fs.writeFileSync(path.join(MEDIA_DIR, nuovoKey), buf);
      update.run(nuovoKey, buf.length, new Date().toISOString(), r.id);
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      fs.renameSync(src, path.join(BACKUP_DIR, r.blob_key));
    }
  } catch (e) {
    errori.push(`${r.id}: ${String(e.message).slice(0, 60)}`);
  }
}

console.log(`  candidati oltre ${MIN_BYTES / 1048576} MB: ${rows.length}`);
console.log(`  convertibili:  ${fatti}`);
console.log(`  saltati:       ${saltati}  (video, GIF, o nessun guadagno)`);
console.log(`  errori:        ${errori.length}`);
for (const e of errori.slice(0, 5)) console.log(`    ${e}`);
if (fatti) {
  console.log(`\n  ${(prima / 1048576).toFixed(0)} MB -> ${(dopo / 1048576).toFixed(0)} MB  (-${Math.round((1 - dopo / prima) * 100)}%)`);
}
if (!APPLY) console.log("\n  (anteprima: nessuna modifica. Rilanciare con --apply)");
else if (fatti) console.log(`  originali spostati in ${BACKUP_DIR} — eliminabili una volta verificato`);
db.close();
