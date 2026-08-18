// One-off migration script: downloads the author avatar images still
// referenced from klr-europe.com (content/posts.json authorAvatar) and
// uploads them into Netlify Blobs, appending records to content/mediaLibrary.json.
// Run scripts/replace-legacy-urls.mjs afterwards to swap the URLs in content/*.json.
//
// Usage:
//   NETLIFY_SITE_ID=... NETLIFY_API_TOKEN=... node scripts/migrate-author-avatars.mjs

import { getStore } from "@netlify/blobs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const MANIFEST_PATH = path.join(CONTENT_DIR, "mediaLibrary.json");
const POSTS_PATH = path.join(CONTENT_DIR, "posts.json");
const STUDIES_PATH = path.join(CONTENT_DIR, "studies.json");

const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_API_TOKEN;
if (!siteID || !token) {
  console.error("Missing NETLIFY_SITE_ID or NETLIFY_API_TOKEN");
  process.exit(1);
}

const store = getStore({ name: "media", siteID, token, consistency: "strong" });

function loadJson(p, fallback) {
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : fallback;
}
function saveManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
}
function extFromUrl(url) {
  const clean = url.split("?")[0];
  const m = clean.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : "";
}
function mimeFromExt(ext) {
  return { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif" }[ext] || "application/octet-stream";
}

async function main() {
  const posts = loadJson(POSTS_PATH, []);
  const studies = loadJson(STUDIES_PATH, []);
  const manifest = loadJson(MANIFEST_PATH, []);
  const existingBySource = new Map(manifest.filter(m => m.sourceUrl).map(m => [m.sourceUrl, m]));

  const urls = Array.from(new Set(
    [...posts, ...studies]
      .map(p => p.authorAvatar)
      .filter(u => u && u.includes("klr-europe.com"))
  ));

  console.log(`Found ${urls.length} unique author avatar URLs to migrate.`);

  let migrated = 0, skipped = 0, failed = 0;

  for (const sourceUrl of urls) {
    if (existingBySource.has(sourceUrl)) { skipped++; continue; }

    const filename = decodeURIComponent(sourceUrl.split("/").pop() || `avatar-${Date.now()}`);
    const ext = extFromUrl(sourceUrl) || "png";
    const slug = filename.replace(/\.[a-zA-Z0-9]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const id = `avatar-${slug}`;
    const blobKey = `${id}.${ext}`;

    try {
      const res = await fetch(sourceUrl);
      if (!res.ok) throw new Error(`download failed HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      const mimeType = res.headers.get("content-type") || mimeFromExt(ext);

      await store.set(blobKey, buffer, { metadata: { mimeType } });

      const now = new Date().toISOString();
      const record = {
        id, blobKey, filename,
        title: filename, alt: "", caption: "", description: "",
        mimeType, filesize: buffer.byteLength,
        sourceUrl, uploadedAt: now, updatedAt: now,
      };
      manifest.push(record);
      existingBySource.set(sourceUrl, record);
      migrated++;
      console.log(`  migrated ${id} <- ${sourceUrl}`);
    } catch (err) {
      failed++;
      console.error(`  FAILED ${sourceUrl}:`, err.message);
    }
  }

  saveManifest(manifest);
  console.log(`\nmigrated: ${migrated}, skipped: ${skipped}, failed: ${failed}`);
}

main().catch(err => { console.error(err); process.exit(1); });
