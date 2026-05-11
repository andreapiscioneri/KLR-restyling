import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJSON<T>(file: string, fallback: T): T {
  try {
    const filePath = path.join(CONTENT_DIR, file);
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(file: string, data: unknown): void {
  const filePath = path.join(CONTENT_DIR, file);
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function getStats() {
  return readJSON("stats.json", {
    campaigns: "340+", retailers: "150+", countries: "20+", years: "10+",
    combinedExperience: "275", people: "43", nationalities: "11",
  });
}

export function getBrands() {
  return readJSON("brands.json", []);
}

export function getLeadership() {
  return readJSON("leadership.json", []);
}

export function getPages() {
  return readJSON("pages.json", {});
}

export function getColors() {
  return readJSON("colors.json", {
    primaryColor: "#2E2784",
    accentColor: "#F8AE01",
    logoUrl: "/klr-logo.png",
    siteUrl: "https://klr-europe.com",
    defaultEmail: "info@klr-europe.com",
  });
}

export function getSettings() {
  return readJSON("settings.json", {
    siteName: "KLR Europe",
    siteDescription: "Loyalty campaigns that excite and engage customers.",
    siteKeywords: "loyalty, retail, campaigns, marketing",
    siteUrl: "https://klr-europe.com",
    defaultEmail: "info@klr-europe.com",
    supportEmail: "support@klr-europe.com",
    phone: "+386 1 620 2600",
    socialLinks: {},
    hq: {},
    googleAnalyticsId: "",
    customCss: "",
  });
}

export function getStudies() {
  return readJSON("studies.json", null);
}

export function getPosts() {
  return readJSON("posts.json", null);
}

export function getUsers() {
  return readJSON("users.json", [
    {
      id: "admin",
      name: "Admin",
      email: "andrea.piscioneri@denani.it",
      password: "denani",
      role: "admin",
    },
  ]);
}
