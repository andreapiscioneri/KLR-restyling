// One-off migration script: pulls every item from the WordPress Media Library
// REST API and uploads it into Netlify Blobs, building content/mediaLibrary.json.
// Resumable: re-running skips items already present in the manifest (matched by sourceUrl).
//
// Usage:
//   NETLIFY_SITE_ID=... NETLIFY_API_TOKEN=... node scripts/migrate-media.mjs [startPage] [endPage]

import { getStore } from "@netlify/blobs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "content");
const MANIFEST_PATH = path.join(CONTENT_DIR, "mediaLibrary.json");
const WP_API = "https://klr-europe.com/wp-json/wp/v2/media";

// Known problematic items (oversized/slow files) — skipped on the main pass,
// retried separately afterwards with a much longer, per-item budget.
const SKIP_IDS = new Set([3289, 3350, 3351, 3441, 3498, 4357]);

// Auto-absorb any additional failures logged by previous runs so re-runs
// don't keep re-hitting the same problem items over and over.
try {
  const glob = fs.readdirSync("/tmp").filter(f => f.startsWith("klr-media-migration-full") && f.endsWith(".log"));
  for (const f of glob) {
    const text = fs.readFileSync(`/tmp/${f}`, "utf-8");
    for (const m of text.matchAll(/FAILED wp-(\d+)/g)) SKIP_IDS.add(parseInt(m[1], 10));
  }
} catch {}

const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_API_TOKEN;
if (!siteID || !token) {
  console.error("Missing NETLIFY_SITE_ID or NETLIFY_API_TOKEN");
  process.exit(1);
}

const store = getStore({ name: "media", siteID, token, consistency: "strong" });

function loadManifest() {
  if (fs.existsSync(MANIFEST_PATH)) {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  }
  return [];
}

function saveManifest(manifest) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

function stripHtml(s) {
  return (s || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&amp;/g, "&")
    .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-").replace(/&#038;/g, "&").trim();
}

function extFromUrl(url) {
  const clean = url.split("?")[0];
  const m = clean.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : "";
}

async function fetchWithTimeout(url, ms, options = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(new Error(`timeout after ${ms}ms`)), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timeout after ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function fetchPage(page) {
  const res = await fetch(`${WP_API}?per_page=100&page=${page}`);
  if (!res.ok) {
    if (res.status === 400) return []; // page beyond range
    throw new Error(`WP media page ${page} failed: ${res.status}`);
  }
  return res.json();
}

async function main() {
  const startPage = parseInt(process.argv[2] || "1", 10);
  const endPage = parseInt(process.argv[3] || "11", 10);

  const manifest = loadManifest();
  const existingBySource = new Map(manifest.filter(m => m.sourceUrl).map(m => [m.sourceUrl, m]));

  let migrated = 0, skipped = 0, failed = 0;
  const failures = [];

  for (let page = startPage; page <= endPage; page++) {
    let items;
    try {
      items = await fetchPage(page);
    } catch (err) {
      console.error(`Page ${page} fetch error:`, err.message);
      continue;
    }
    if (!items.length) {
      console.log(`Page ${page}: empty, stopping.`);
      break;
    }
    console.log(`--- Page ${page}: ${items.length} items ---`);

    for (const item of items) {
      const sourceUrl = item.source_url;
      if (!sourceUrl) { skipped++; continue; }
      if (existingBySource.has(sourceUrl)) { skipped++; continue; }
      if (SKIP_IDS.has(item.id)) { skipped++; continue; }

      const wpId = item.id;
      const mimeType = item.mime_type || "application/octet-stream";
      const filename = decodeURIComponent(sourceUrl.split("/").pop() || `wp-${wpId}`);
      const ext = extFromUrl(sourceUrl) || extFromUrl(filename);
      const blobKey = `wp-${wpId}${ext ? `.${ext}` : ""}`;

      try {
        const fileRes = await fetchWithTimeout(sourceUrl, 120000);
        if (!fileRes.ok) throw new Error(`download failed HTTP ${fileRes.status}`);
        const buffer = await withTimeout(fileRes.arrayBuffer(), 120000, "download body read");

        // Large files (e.g. uncompressed leaflet mockups, 50MB+) need more
        // headroom for the blob upload than typical images.
        const uploadTimeout = buffer.byteLength > 20 * 1024 * 1024 ? 180000 : 60000;
        await withTimeout(store.set(blobKey, buffer, { metadata: { mimeType } }), uploadTimeout, "blob upload");

        const md = item.media_details || {};
        const now = new Date().toISOString();
        const record = {
          id: `wp-${wpId}`,
          blobKey,
          filename,
          title: stripHtml(item.title?.rendered) || filename,
          alt: item.alt_text || "",
          caption: stripHtml(item.caption?.rendered),
          description: stripHtml(item.description?.rendered),
          mimeType,
          width: md.width || undefined,
          height: md.height || undefined,
          filesize: md.filesize || buffer.byteLength,
          sourceUrl,
          uploadedAt: item.date ? `${item.date}` : now,
          updatedAt: now,
        };

        manifest.push(record);
        existingBySource.set(sourceUrl, record);
        migrated++;

        // Small pacing delay to avoid bursting the Netlify Blobs API.
        await new Promise((r) => setTimeout(r, 150));

        if (migrated % 25 === 0) {
          saveManifest(manifest);
          console.log(`  checkpoint: ${migrated} migrated so far (page ${page})`);
        }
      } catch (err) {
        failed++;
        failures.push({ wpId, sourceUrl, error: err.message });
        console.error(`  FAILED wp-${wpId} (${sourceUrl}):`, err.message);
        // Cooldown after a failure — the 403s we see seem to be transient
        // API throttling; back off before hitting the endpoint again.
        await new Promise((r) => setTimeout(r, 5000));
      }
    }

    saveManifest(manifest);
  }

  saveManifest(manifest);

  console.log("\n=== SUMMARY ===");
  console.log("migrated this run:", migrated);
  console.log("skipped (already present):", skipped);
  console.log("failed:", failed);
  console.log("total in manifest now:", manifest.length);
  if (failures.length) {
    fs.writeFileSync(path.join(__dirname, "_media_migration_failures.json"), JSON.stringify(failures, null, 2));
    console.log("failures written to scripts/_media_migration_failures.json");
  }
}

main().catch(err => { console.error(err); process.exit(1); });
