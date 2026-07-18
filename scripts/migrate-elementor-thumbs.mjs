// Migrates Elementor-generated thumbnail cache files referenced inside blog
// contentHtml — these aren't registered WP Media Library attachments, so
// they're fetched by direct URL instead of via the REST API.
import { getStore } from "@netlify/blobs";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const MANIFEST_PATH = path.join(CONTENT_DIR, "mediaLibrary.json");

const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_API_TOKEN;
const store = getStore({ name: "media", siteID, token, consistency: "strong" });

const urls = JSON.parse(fs.readFileSync("/tmp/elementor_thumb_urls.json", "utf-8"));

function loadManifest() {
  return fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) : [];
}
function saveManifest(m) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(m, null, 2), "utf-8");
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

async function main() {
  const manifest = loadManifest();
  const existingBySource = new Map(manifest.filter(m => m.sourceUrl).map(m => [m.sourceUrl, m]));
  let ok = 0, fail = 0;
  const urlToId = {};

  for (const sourceUrl of urls) {
    if (existingBySource.has(sourceUrl)) {
      urlToId[sourceUrl] = existingBySource.get(sourceUrl).id;
      console.log(`SKIP ${sourceUrl} (already migrated)`);
      continue;
    }
    const id = `el-${crypto.createHash("md5").update(sourceUrl).digest("hex").slice(0, 12)}`;
    console.log(`\n--- ${id} ---\n  ${sourceUrl}`);
    try {
      const fileRes = await withTimeout(fetch(sourceUrl), 60000, "download");
      if (!fileRes.ok) throw new Error(`download HTTP ${fileRes.status}`);
      const buffer = await withTimeout(fileRes.arrayBuffer(), 60000, "download body");
      const mimeType = fileRes.headers.get("content-type") || "image/png";
      const ext = extFromUrl(sourceUrl) || "png";
      const blobKey = `${id}.${ext}`;
      await withTimeout(store.set(blobKey, buffer, { metadata: { mimeType } }), 60000, "blob upload");

      const filename = decodeURIComponent(sourceUrl.split("/").pop());
      const now = new Date().toISOString();
      manifest.push({
        id, blobKey, filename, title: filename, alt: "", caption: "", description: "",
        mimeType, filesize: buffer.byteLength, sourceUrl, uploadedAt: now, updatedAt: now,
      });
      saveManifest(manifest);
      urlToId[sourceUrl] = id;
      console.log(`  OK (${(buffer.byteLength / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      fail++;
    }
  }

  fs.writeFileSync("/tmp/elementor_thumb_id_map.json", JSON.stringify(urlToId, null, 2));
  console.log(`\n=== DONE: ${ok} recovered, ${fail} failed, ${manifest.length} total in manifest ===`);
}

main().catch(e => { console.error(e); process.exit(1); });
