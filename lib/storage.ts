import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const IS_NETLIFY_CLOUD = Boolean(process.env.NETLIFY && !process.env.NETLIFY_LOCAL);
const IS_NETLIFY_LOCAL = Boolean(process.env.NETLIFY_LOCAL);
const HAS_NETLIFY_BLOBS = Boolean(process.env.NETLIFY_BLOBS_CONTEXT || (globalThis as any)?.netlifyBlobsContext);

async function initBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "cms-content", consistency: "strong" });
}

export async function readContent<T>(key: string, fallback: T): Promise<T> {
  if (IS_NETLIFY_CLOUD || IS_NETLIFY_LOCAL || HAS_NETLIFY_BLOBS) {
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
  if (IS_NETLIFY_CLOUD || HAS_NETLIFY_BLOBS) {
    try {
      const store = await initBlobStore();
      await store.setJSON(key, data);
      return;
    } catch (err) {
      console.error("Write content to Netlify blobs failed:", err);
      if (IS_NETLIFY_CLOUD) {
        throw err;
      }
      // falling back to a local filesystem write in Netlify local/dev mode only
    }
  }
  const filePath = path.join(CONTENT_DIR, key + ".json");
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
