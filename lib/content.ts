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
