// Retries the small set of items that failed during the bulk migration,
// one at a time, with very generous timeouts. Safe to re-run.
import { getStore } from "@netlify/blobs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const MANIFEST_PATH = path.join(CONTENT_DIR, "mediaLibrary.json");

const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_API_TOKEN;
const store = getStore({ name: "media", siteID, token, consistency: "strong" });

const IDS = [3498];

function stripHtml(s) {
  return (s || "").replace(/<[^>]+>/g, "")
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, "&")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-").replace(/&#038;/g, "&").trim();
}
function extFromUrl(url) {
  const clean = url.split("?")[0];
  const m = clean.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : "";
}
async function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms); });
  try { return await Promise.race([promise, timeout]); } finally { clearTimeout(timer); }
}

function loadManifest() {
  return fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) : [];
}
function saveManifest(m) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2), "utf-8");
}

async function main() {
  const manifest = loadManifest();
  const have = new Set(manifest.map(m => m.id));
  let ok = 0, fail = 0;

  for (const wpId of IDS) {
    const id = `wp-${wpId}`;
    if (have.has(id)) { console.log(`SKIP ${id} (already migrated)`); continue; }

    console.log(`\n--- ${id} ---`);
    const t0 = Date.now();
    try {
      const metaRes = await withTimeout(fetch(`https://klr-europe.com/wp-json/wp/v2/media/${wpId}`), 30000, "wp meta fetch");
      if (!metaRes.ok) throw new Error(`wp meta HTTP ${metaRes.status}`);
      const item = await metaRes.json();
      const sourceUrl = item.source_url;
      console.log(`  source: ${sourceUrl}`);

      const fileRes = await withTimeout(fetch(sourceUrl), 300000, "download");
      if (!fileRes.ok) throw new Error(`download HTTP ${fileRes.status}`);
      const buffer = await withTimeout(fileRes.arrayBuffer(), 300000, "download body");
      console.log(`  downloaded: ${(buffer.byteLength / 1024 / 1024).toFixed(2)} MB in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

      const mimeType = item.mime_type || "application/octet-stream";
      const filename = decodeURIComponent(sourceUrl.split("/").pop() || id);
      const ext = extFromUrl(sourceUrl) || extFromUrl(filename);
      const blobKey = `${id}${ext ? `.${ext}` : ""}`;

      await withTimeout(store.set(blobKey, buffer, { metadata: { mimeType } }), 300000, "blob upload");
      console.log(`  uploaded OK in ${((Date.now() - t0) / 1000).toFixed(1)}s total`);

      const md = item.media_details || {};
      const now = new Date().toISOString();
      manifest.push({
        id, blobKey, filename,
        title: stripHtml(item.title?.rendered) || filename,
        alt: item.alt_text || "",
        caption: stripHtml(item.caption?.rendered),
        description: stripHtml(item.description?.rendered),
        mimeType,
        width: md.width || undefined,
        height: md.height || undefined,
        filesize: md.filesize || buffer.byteLength,
        sourceUrl,
        uploadedAt: item.date || now,
        updatedAt: now,
      });
      saveManifest(manifest);
      ok++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n=== DONE: ${ok} recovered, ${fail} still failing, ${manifest.length} total in manifest ===`);
}

main().catch(e => { console.error(e); process.exit(1); });
