#!/usr/bin/env node
/**
 * One-off patch: sets every gallery block's `fit` to "cover" in the LIVE
 * production "studies" blob, so gallery thumbnails render as a uniform grid
 * (fixed height, cropped) instead of the current per-image native aspect
 * ratio ("fit: original"), which mixes portrait/landscape cell sizes and
 * misaligns the grid. The lightbox (opened by clicking a thumbnail) already
 * shows the untouched original image via object-contain — untouched by this
 * script, since it only edits `details.blocks[].fit` on gallery blocks.
 *
 * Reads what's live, patches only the `fit` field on gallery blocks within
 * each study's blocks array, and writes the merged result back — everything
 * else (text, images, order, other block types) stays exactly as it is, so
 * any edits already made from the admin UI are preserved untouched.
 *
 * Requires NETLIFY_SITE_ID and NETLIFY_API_TOKEN in .env.local.
 * Usage: node scripts/uniform-gallery-fit.mjs [--dry-run]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf-8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN || process.env.NETLIFY_TOKEN;
  if (!siteID || !token) {
    console.error("Missing NETLIFY_SITE_ID / NETLIFY_API_TOKEN in .env.local");
    process.exit(1);
  }
  const dryRun = process.argv.includes("--dry-run");

  const { getStore } = await import("@netlify/blobs");
  const store = getStore({ name: "cms-content", siteID, token, consistency: "strong" });

  const live = await store.get("studies", { type: "json" });
  if (!Array.isArray(live)) {
    console.error("Live 'studies' blob is missing or not an array — aborting, nothing written.");
    process.exit(1);
  }

  const backupDir = path.join(ROOT, ".backups", "blobs-pre-sync");
  fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `studies-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(live, null, 2));
  console.log(`Backed up current live studies to ${path.relative(ROOT, backupPath)}`);

  let changedBlocks = 0;
  let changedStudies = 0;
  const updated = live.map((s) => {
    const blocks = s?.details?.blocks;
    if (!Array.isArray(blocks)) return s;
    let studyChanged = false;
    const newBlocks = blocks.map((b) => {
      if (b?.type !== "gallery") return b;
      if (b.fit === "cover") return b;
      changedBlocks++;
      studyChanged = true;
      return { ...b, fit: "cover" };
    });
    if (!studyChanged) return s;
    changedStudies++;
    console.log(`~ ${s.id}: ${newBlocks.filter((b, i) => b !== blocks[i]).length} gallery block(s) -> fit: "cover"`);
    return { ...s, details: { ...s.details, blocks: newBlocks } };
  });

  if (!changedBlocks) {
    console.log("Nothing to update.");
    return;
  }

  console.log(`\n${changedStudies} stud${changedStudies === 1 ? "y" : "ies"}, ${changedBlocks} gallery block(s) total.`);

  if (dryRun) {
    console.log("Dry run: would write the above. Re-run without --dry-run to write.");
    return;
  }

  await store.setJSON("studies", updated);
  console.log(`\nDone. Updated ${changedBlocks} gallery block(s) across ${changedStudies} stud${changedStudies === 1 ? "y" : "ies"} in the live "studies" blob.`);
}

main().catch((err) => {
  console.error("Patch failed:", err);
  process.exit(1);
});
