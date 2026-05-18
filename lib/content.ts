import { readContent, writeContent } from "./storage";

export async function writeJSON(file: string, data: unknown): Promise<void> {
  const key = file.replace(/\.json$/, "");
  await writeContent(key, data);
}

export async function getStats() {
  return readContent("stats", {
    campaigns: "340+", retailers: "150+", countries: "20+", years: "10+",
    combinedExperience: "275", people: "43", nationalities: "11",
  });
}

export async function getBrands() {
  return readContent("brands", []);
}

export async function getLeadership() {
  return readContent("leadership", []);
}

export async function getPages() {
  return readContent("pages", {});
}

export async function getColors() {
  return readContent("colors", {
    primaryColor: "#2E2784",
    accentColor: "#F8AE01",
    logoUrl: "/klr-logo.png",
    siteUrl: "https://klr-europe.com",
    defaultEmail: "info@klr-europe.com",
  });
}

export async function getSettings() {
  return readContent("settings", {
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

export async function getStudies() {
  return readContent("studies", null);
}

export async function getPosts() {
  return readContent("posts", null);
}

export async function getUsers() {
  return readContent("users", [
    {
      id: "admin",
      name: "Admin",
      email: "andrea.piscioneri@denani.it",
      password: "denani",
      role: "admin",
    },
  ]);
}

export async function getPositions() {
  return readContent("positions", [
    { id: "1", role: "Loyalty Program Manager", loc: "Milan · IT", description: "" },
    { id: "2", role: "Account Executive — Petrol", loc: "Ljubljana · SI", description: "" },
    { id: "3", role: "Creative Copywriter", loc: "Remote · EU", description: "" },
    { id: "4", role: "Supply Chain Coordinator", loc: "Milan · IT", description: "" },
  ]);
}

export async function getCustomPages() {
  return readContent("customPages", []);
}
