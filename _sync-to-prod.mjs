import { getStore } from "@netlify/blobs";
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_API_TOKEN || process.env.NETLIFY_TOKEN;
if (!siteID || !token) {
  console.error("Missing NETLIFY_SITE_ID or NETLIFY_API_TOKEN in .env.local");
  process.exit(1);
}

const store = getStore({ name: "cms-content", siteID, token, consistency: "strong" });
const keys = process.argv.slice(2).filter((a) => a !== "--write");
const write = process.argv.includes("--write");

for (const key of keys) {
  const local = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", `${key}.json`), "utf-8"));
  const prod = await store.get(key, { type: "json" });
  console.log(`\n=== ${key} ===`);
  console.log("LOCAL:", Array.isArray(local) ? local.length : "object");
  console.log("PROD :", Array.isArray(prod) ? (prod || []).length : (prod ? "object" : "null"));
  if (write) {
    await store.setJSON(key, local);
    console.log(`✅ Wrote local ${key}.json to production.`);
  }
}
if (!write) console.log("\nDry run only. Re-run with --write to actually overwrite production.");
