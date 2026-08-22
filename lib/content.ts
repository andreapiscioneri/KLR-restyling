import { readContent, writeContent } from "./storage";
import { CONTENT_TYPES } from "./content-types";

export async function writeJSON(file: string, data: unknown): Promise<void> {
  const key = file.replace(/\.json$/, "");
  await writeContent(key, data);
}

export async function getStats() {
  return readContent("stats", CONTENT_TYPES.stats.default);
}

export async function getBrands() {
  return readContent("brands", CONTENT_TYPES.brands.default);
}

export async function getLeadership() {
  return readContent("leadership", CONTENT_TYPES.leadership.default);
}

export async function getPages() {
  return readContent("pages", CONTENT_TYPES.pages.default);
}

export async function getColors() {
  return readContent("colors", CONTENT_TYPES.colors.default);
}

export async function getSettings() {
  return readContent("settings", CONTENT_TYPES.settings.default);
}

export async function getStudies() {
  return readContent("studies", CONTENT_TYPES.studies.default);
}

export async function getPosts() {
  return readContent("posts", CONTENT_TYPES.posts.default);
}

// Public-facing pages must never show drafts or soft-deleted items; the
// admin dashboard uses getStudies()/getPosts() directly so editors can see
// and manage all of them (including the trash).
export function normalizeContentStatus(status?: string | null): "published" | "draft" | "deleted" {
  const value = String(status ?? "").trim().toLowerCase();
  if (!value || value === "publish" || value === "published") return "published";
  if (["draft", "pending", "private", "future", "auto-draft", "review"].includes(value)) return "draft";
  if (["deleted", "trash", "remove"].includes(value)) return "deleted";
  return "published";
}

export async function getPublishedStudies() {
  const studies = await getStudies();
  if (!Array.isArray(studies)) return studies;
  return studies.filter((s) => {
    const status = normalizeContentStatus((s as { status?: string | null })?.status);
    return status !== "draft" && status !== "deleted";
  });
}

export async function getPublishedPosts() {
  const posts = await getPosts();
  if (!Array.isArray(posts)) return posts;
  return posts.filter((p) => {
    const status = normalizeContentStatus((p as { status?: string | null })?.status);
    return status !== "draft" && status !== "deleted";
  });
}

export async function getUsers() {
  return readContent("users", CONTENT_TYPES.users.default);
}

export async function getPositions() {
  return readContent("positions", CONTENT_TYPES.positions.default);
}

export async function getCustomPages() {
  return readContent("customPages", CONTENT_TYPES.customPages.default);
}

export async function getCookieBanner() {
  return readContent("cookieBanner", CONTENT_TYPES.cookieBanner.default);
}
