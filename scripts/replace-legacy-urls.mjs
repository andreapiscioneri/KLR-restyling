// Replaces every occurrence of a migrated WordPress media URL (sourceUrl in
// content/mediaLibrary.json) with the new local /api/media/<id> URL, across
// all content/*.json files. Run after migrate-media.mjs has finished.
//
// Usage: node scripts/replace-legacy-urls.mjs [--dry-run]

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const DRY_RUN = process.argv.includes("--dry-run");

const manifest = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "mediaLibrary.json"), "utf-8"));

// Map both the exact sourceUrl and its URL-encoded/space variants to the new id.
const urlToId = new Map();
for (const m of manifest) {
  if (m.sourceUrl) {
    urlToId.set(m.sourceUrl, m.id);
    try {
      urlToId.set(decodeURI(m.sourceUrl), m.id);
    } catch {}
  }
}

// Sort by URL length descending so longer URLs are replaced before any
// shorter URL that might be a substring/prefix of another (defensive).
const sortedUrls = [...urlToId.keys()].sort((a, b) => b.length - a.length);

function replaceInString(str) {
  let result = str;
  let count = 0;
  for (const url of sortedUrls) {
    if (result.includes(url)) {
      const id = urlToId.get(url);
      const occurrences = result.split(url).length - 1;
      result = result.split(url).join(`/api/media/${id}`);
      count += occurrences;
    }
  }
  return { result, count };
}

function walk(value) {
  let count = 0;
  if (typeof value === "string") {
    const { result, count: c } = replaceInString(value);
    count += c;
    return { value: result, count };
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      const r = walk(item);
      out.push(r.value);
      count += r.count;
    }
    return { value: out, count };
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const r = walk(v);
      out[k] = r.value;
      count += r.count;
    }
    return { value: out, count };
  }
  return { value, count: 0 };
}

const TARGET_FILES = ["posts.json", "studies.json", "brands.json", "leadership.json", "pages.json", "customPages.json", "colors.json", "settings.json", "positions.json", "cookieBanner.json"];

let grandTotal = 0;
const report = [];

for (const file of TARGET_FILES) {
  const filePath = path.join(CONTENT_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const { value, count } = walk(data);
  if (count > 0) {
    report.push({ file, replacements: count });
    grandTotal += count;
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf-8");
    }
  }
}

console.log(DRY_RUN ? "[DRY RUN] Nessun file scritto." : "File aggiornati.");
for (const r of report) console.log(`  ${r.file}: ${r.replacements} sostituzioni`);
console.log(`\nTotale sostituzioni: ${grandTotal}`);
console.log(`Manifest asset disponibili per il mapping: ${manifest.length}`);
