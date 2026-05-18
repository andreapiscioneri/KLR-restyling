import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const IS_NETLIFY = !!(process.env.NETLIFY || process.env.NETLIFY_LOCAL);

async function getStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "cms-content", consistency: "strong" });
}

export async function readContent<T>(key: string, fallback: T): Promise<T> {
  if (IS_NETLIFY) {
    try {
      const store = await getStore();
      const data = await store.get(key, { type: "json" });
      if (data !== null && data !== undefined) return data as T;
    } catch {
      // fall through to filesystem fallback
    }
  }
  try {
    const filePath = path.join(CONTENT_DIR, key + ".json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
    }
  } catch {
    // fall through to default fallback
  }
  return fallback;
}

export async function writeContent(key: string, data: unknown): Promise<void> {
  if (IS_NETLIFY) {
    const store = await getStore();
    await store.setJSON(key, data);
    return;
  }
  const filePath = path.join(CONTENT_DIR, key + ".json");
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
