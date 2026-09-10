#!/usr/bin/env node
/**
 * Converte in WebP le immagini pesanti di public/.
 *
 * Le foto delle sedi e degli sfondi erano PNG da 4-6 MB: il PNG è
 * senza perdita, quindi per contenuti fotografici produce file enormi.
 * next/image le riconverte comunque alla consegna, ma i sorgenti
 * pesavano 79 MB nel repository e viaggiavano a ogni deploy.
 *
 * Uso: node scripts/optimize-images.mjs [--min-mb 1] [--quality 82] [--apply]
 * Senza --apply mostra solo cosa farebbe.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const APPLY = args.includes("--apply");
const MIN_BYTES = Number(arg("--min-mb", 1)) * 1024 * 1024;
const QUALITY = Number(arg("--quality", 82));
const ROOT = path.join(process.cwd(), "public");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g)$/i.test(e.name) && fs.statSync(full).size > MIN_BYTES) out.push(full);
  }
  return out;
}

const files = walk(ROOT).sort();
if (!files.length) { console.log("Nessuna immagine oltre la soglia."); process.exit(0); }

let before = 0, after = 0;
const mapping = [];

for (const file of files) {
  const rel = file.slice(ROOT.length);
  const dest = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const sizeBefore = fs.statSync(file).size;

  const buffer = await sharp(file).webp({ quality: QUALITY, effort: 5 }).toBuffer();
  if (APPLY) {
    fs.writeFileSync(dest, buffer);
    fs.unlinkSync(file);
  }

  before += sizeBefore; after += buffer.length;
  mapping.push({ from: rel, to: dest.slice(ROOT.length) });
  console.log(
    `  ${rel.padEnd(38)} ${String(Math.round(sizeBefore / 1024)).padStart(6)} KB -> ` +
    `${String(Math.round(buffer.length / 1024)).padStart(5)} KB  (-${Math.round((1 - buffer.length / sizeBefore) * 100)}%)`
  );
}

console.log(`\n  ${files.length} file: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB  (-${Math.round((1 - after / before) * 100)}%)`);
if (APPLY) {
  fs.writeFileSync(path.join(process.cwd(), "scripts", ".image-mapping.json"), JSON.stringify(mapping, null, 2));
  console.log("  mapping salvato in scripts/.image-mapping.json — aggiornare i riferimenti");
} else {
  console.log("\n  (anteprima: nessun file modificato. Rilanciare con --apply)");
}
