#!/usr/bin/env node
/**
 * Pushes local content/*.json files into the production Netlify Blobs store
 * ("cms-content"), which is what the deployed site actually reads at runtime
 * (content/*.json is only the fallback used on first boot). Committing and
 * redeploying alone does NOT update Blobs, so this script is required after
 * editing content locally to make production reflect those changes.
 *
 * Requires NETLIFY_SITE_ID and NETLIFY_API_TOKEN in .env.local.
 *
 * Intentionally excludes:
 *  - "users": auth credentials, must not be clobbered from a possibly stale local copy
 *  - siteVisits / cookieConsents / mediaLibrary: runtime logs with their own
 *    production data, not editorial content
 *
 * Usage: node scripts/sync-content-to-blobs.mjs [key1 key2 ...]
 *   With no args, syncs all keys below.
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

const SYNCABLE_KEYS = [
  "stats", "brands", "leadership", "pages", "colors", "settings",
  "studies", "posts", "positions", "customPages", "cookieBanner",
];

async function main() {
  loadEnvLocal();
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN || process.env.NETLIFY_TOKEN;
  if (!siteID || !token) {
    console.error("Missing NETLIFY_SITE_ID / NETLIFY_API_TOKEN in .env.local");
    process.exit(1);
  }

  const requested = process.argv.slice(2);
  const keys = requested.length ? requested : SYNCABLE_KEYS;
  const invalid = keys.filter((k) => !SYNCABLE_KEYS.includes(k));
  if (invalid.length) {
    console.error(`Unknown/unsafe key(s): ${invalid.join(", ")}`);
    console.error(`Allowed keys: ${SYNCABLE_KEYS.join(", ")}`);
    process.exit(1);
  }

  const { getStore } = await import("@netlify/blobs");
  const store = getStore({ name: "cms-content", siteID, token, consistency: "strong" });

  for (const key of keys) {
    const filePath = path.join(ROOT, "content", `${key}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`skip ${key}: content/${key}.json not found`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    await store.setJSON(key, data);
    const count = Array.isArray(data) ? `${data.length} items` : "object";
    console.log(`✅ synced ${key} (${count})`);
  }

  console.log("\nDone. Production should now reflect the local content above.");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
