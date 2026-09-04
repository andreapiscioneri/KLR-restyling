import fs from "fs";
import path from "path";
import { withRetry } from "./with-retry";

const CONTENT_DIR = path.join(process.cwd(), "content");
const IS_NETLIFY_CLOUD = Boolean(process.env.NETLIFY && !process.env.NETLIFY_LOCAL);
const IS_NETLIFY_LOCAL = Boolean(process.env.NETLIFY_LOCAL);
const HAS_NETLIFY_BLOBS = Boolean(process.env.NETLIFY_BLOBS_CONTEXT || (globalThis as any)?.netlifyBlobsContext);

function manualCredentials() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN || process.env.NETLIFY_TOKEN;
  return siteID && token ? { siteID, token } : null;
}

// Local dev intentionally shares the same Netlify Blobs store as production
// (via the manual .env.local credentials) so admin edits on either side are
// always visible on both — no more manual sync step, no more drift.
// Previously this was disabled because concurrent cold-start reads against
// Blobs had been seen to 403; readContent()/writeContent() below always fall
// back to the local content/*.json file on any Blobs error, so a repeat of
// that failure degrades to local-only instead of crashing.
const USE_BLOBS = IS_NETLIFY_CLOUD || IS_NETLIFY_LOCAL || HAS_NETLIFY_BLOBS || Boolean(manualCredentials());

async function initBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  const manual = manualCredentials();
  if (manual) {
    return getStore({ name: "cms-content", ...manual, consistency: "strong" });
  }
  return getStore({ name: "cms-content", consistency: "strong" });
}

export async function readContent<T>(key: string, fallback: T): Promise<T> {
  if (USE_BLOBS) {
    try {
      const store = await initBlobStore();
      const data = await store.get(key, { type: "json" });
      if (data !== null && data !== undefined) return data as T;
    } catch (err) {
      console.error("Read content from Netlify blobs failed:", err);
      // fall through to filesystem fallback when available
    }
  }
  try {
    const filePath = path.join(CONTENT_DIR, key + ".json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
    }
  } catch (err) {
    console.error("Read content from filesystem failed:", err);
  }
  return fallback;
}

export async function writeContent(key: string, data: unknown): Promise<void> {
  if (USE_BLOBS) {
    try {
      await withRetry(async () => {
        const store = await initBlobStore();
        await store.setJSON(key, data);
      });
      return;
    } catch (err) {
      console.error("Write content to Netlify blobs failed after retries:", err);
      if (IS_NETLIFY_CLOUD) {
        throw err;
      }
      // falling back to a local filesystem write only when blobs are unreachable outside prod
    }
  }
  const filePath = path.join(CONTENT_DIR, key + ".json");
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
