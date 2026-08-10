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
export async function getPublishedStudies() {
  const studies = await getStudies();
  return (studies as { status?: string }[])?.filter((s) => s.status !== "draft" && s.status !== "deleted") ?? studies;
}

export async function getPublishedPosts() {
  const posts = await getPosts();
  return (posts as { status?: string }[])?.filter((p) => p.status !== "draft" && p.status !== "deleted") ?? posts;
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
