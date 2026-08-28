#!/usr/bin/env node
/**
 * One-off patch: adds the `logo` field (transparent partner-strip logo) to
 * existing brands in the LIVE production "brands" blob, without touching any
 * other field or any brand not listed below. Unlike sync-content-to-blobs.mjs
 * this does NOT overwrite the whole "brands" record — it reads what's live,
 * patches only `logo` on matching ids, and writes the merged result back, so
 * any edits already made from the admin UI (new brands, changed text/images)
 * are preserved untouched.
 *
 * Requires NETLIFY_SITE_ID and NETLIFY_API_TOKEN in .env.local.
 * Usage: node scripts/backfill-brand-logos.mjs [--dry-run]
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

// Same mapping used to seed content/brands.json locally.
const LOGO_BY_ID = {
  bugatti: "/partner/casa-bugatti-logo-vector-1.svg",
  pintinox: "/partner/Logo-Pintinox.png",
  nasa: "/partner/pngkey.com-nasa-logo-png-274741.png",
  "red-bull": "/partner/ORBR_TEAM_LOGO_22_MONO_WHITE.png",
  eurosport: "/partner/Eurosport-1.svg",
  "spear-jackson": "/partner/SpearJackson-1.svg",
  zanussi: "/partner/zanussi-01.svg",
  guzzini: "/partner/LOGO_CHEFLINE.png",
  police: "/partner/Police-logo.png",
};

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

  const live = await store.get("brands", { type: "json" });
  if (!Array.isArray(live)) {
    console.error("Live 'brands' blob is missing or not an array — aborting, nothing written.");
    process.exit(1);
  }

  // Safety copy of what's live right now, before touching anything.
  const backupDir = path.join(ROOT, ".backups", "blobs-pre-sync");
  fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `brands-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(live, null, 2));
  console.log(`Backed up current live brands to ${path.relative(ROOT, backupPath)}`);

  let changed = 0;
  const updated = live.map((b) => {
    const logo = LOGO_BY_ID[b?.id];
    if (!logo) return b;
    if (b.logo === logo) {
      console.log(`= ${b.id}: logo already set, no change`);
      return b;
    }
    changed++;
    console.log(`~ ${b.id}: logo -> ${logo}`);
    return { ...b, logo };
  });

  const unmatched = Object.keys(LOGO_BY_ID).filter((id) => !live.some((b) => b?.id === id));
  if (unmatched.length) {
    console.log(`Note: no live brand found for id(s) ${unmatched.join(", ")} — skipped.`);
  }

  if (!changed) {
    console.log("Nothing to update.");
    return;
  }

  if (dryRun) {
    console.log(`\nDry run: would update ${changed} brand(s). Re-run without --dry-run to write.`);
    return;
  }

  await store.setJSON("brands", updated);
  console.log(`\nDone. Updated ${changed} brand(s) in the live "brands" blob.`);
}

main().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
