import { getStore, type Store } from "@netlify/blobs";
import { readContent, writeContent } from "./storage";

const STORE_NAME = "media";
const MANIFEST_KEY = "mediaLibrary";

export type MediaRecord = {
  id: string;
  blobKey: string;
  filename: string;
  title: string;
  alt: string;
  caption: string;
  description: string;
  mimeType: string;
  width?: number;
  height?: number;
  filesize?: number;
  sourceUrl?: string;
  uploadedAt: string;
  updatedAt: string;
};

function manualCredentials() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN || process.env.NETLIFY_TOKEN;
  return siteID && token ? { siteID, token } : null;
}

export function getMediaStore(): Store {
  const manual = manualCredentials();
  if (manual) {
    return getStore({ name: STORE_NAME, ...manual, consistency: "strong" });
  }
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

export async function readMediaManifest(): Promise<MediaRecord[]> {
  return readContent<MediaRecord[]>(MANIFEST_KEY, []);
}

export async function writeMediaManifest(records: MediaRecord[]): Promise<void> {
  await writeContent(MANIFEST_KEY, records);
}

export async function putMediaBlob(key: string, data: ArrayBuffer, mimeType: string): Promise<void> {
  const store = getMediaStore();
  await store.set(key, data, { metadata: { mimeType } });
}

export async function getMediaBlob(key: string): Promise<{ data: ArrayBuffer; metadata: Record<string, unknown> } | null> {
  const store = getMediaStore();
  const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
  if (!result) return null;
  return { data: result.data, metadata: result.metadata };
}

export async function deleteMediaBlob(key: string): Promise<void> {
  const store = getMediaStore();
  await store.delete(key);
}

export function mediaUrl(id: string): string {
  return `/api/media/${id}`;
}
