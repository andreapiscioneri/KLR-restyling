// Rewrites leftover old-WordPress image URLs embedded in posts.json's
// contentHtml (Elementor markup) to the migrated /api/media/<id> URLs.
//
// These are WP-generated thumbnail variants (e.g. "-300x300.jpg") of files
// that ARE present in content/mediaLibrary.json under their full-size
// ("-scaled.ext" or bare) sourceUrl, so a plain string match against
// mediaLibrary (as done by replace-legacy-urls.mjs) misses them.
//
// Usage: node scripts/fix-post-content-legacy-images.mjs [--dry-run]

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const DRY_RUN = process.argv.includes("--dry-run");

const manifest = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, "mediaLibrary.json"), "utf-8"));
const bySource = new Map(manifest.map((m) => [m.sourceUrl, m.id]));

function resolveId(url) {
  if (bySource.has(url)) return bySource.get(url);
  const stripped = url.replace(/-\d+x\d+(\.\w+)$/, "$1");
  if (bySource.has(stripped)) return bySource.get(stripped);
  const scaled = url.replace(/-\d+x\d+(\.\w+)$/, "-scaled$1");
  if (bySource.has(scaled)) return bySource.get(scaled);
  return null;
}

const postsPath = path.join(CONTENT_DIR, "posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

const urlRe = /https?:\/\/klr-europe\.com\/wp-content\/[^"'\s)]+/g;
let totalReplacements = 0;
const unresolved = new Set();

for (const post of posts) {
  if (!post.contentHtml) continue;
  post.contentHtml = post.contentHtml.replace(urlRe, (match) => {
    const id = resolveId(match);
    if (id == null) {
      unresolved.add(match);
      return match;
    }
    totalReplacements++;
    return `/api/media/${id}`;
  });
}

if (!DRY_RUN) {
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n", "utf-8");
}

console.log(DRY_RUN ? "[DRY RUN] Nessun file scritto." : "posts.json aggiornato.");
console.log(`Sostituzioni: ${totalReplacements}`);
if (unresolved.size) {
  console.log(`URL non risolti (${unresolved.size}):`);
  for (const u of unresolved) console.log(`  ${u}`);
}
