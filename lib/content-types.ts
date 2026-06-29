/**
 * Single source of truth for every CMS content type: key, default value, and
 * which admin roles may write it. Previously this list was duplicated across
 * lib/content.ts, app/api/admin/content/route.ts, app/api/content/route.ts and
 * lib/admin-auth.ts — any new content type had to be added in all four places.
 */

export type AdminRole = "superadmin" | "admin" | "editor";

export type ContentTypeDef = {
  default: unknown;
  writableRoles: AdminRole[];
};

export const CONTENT_TYPES = {
  stats: {
    default: {
      campaigns: "340+", retailers: "150+", countries: "20+", years: "10+",
      combinedExperience: "275", people: "43", nationalities: "11",
    },
    writableRoles: ["superadmin", "admin"],
  },
  brands: {
    default: [] as unknown[],
    writableRoles: ["superadmin", "admin"],
  },
  leadership: {
    default: [] as unknown[],
    writableRoles: ["superadmin", "admin"],
  },
  pages: {
    default: {} as Record<string, unknown>,
    writableRoles: ["superadmin", "admin"],
  },
  colors: {
    default: {
      primaryColor: "#2E2784",
      accentColor: "#F8AE01",
      logoUrl: "/klr-logo.png",
      siteUrl: "https://klr-europe.com",
      defaultEmail: "info@klr-europe.com",
    },
    writableRoles: ["superadmin", "admin"],
  },
  settings: {
    default: {
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
    },
    writableRoles: ["superadmin", "admin"],
  },
  studies: {
    default: null as unknown[] | null,
    writableRoles: ["superadmin", "admin", "editor"],
  },
  posts: {
    default: null as unknown[] | null,
    writableRoles: ["superadmin", "admin", "editor"],
  },
  users: {
    default: [
      {
        id: "admin",
        name: "Admin",
        email: "andrea.piscioneri@denani.it",
        password: "denani",
        role: "admin",
      },
    ] as unknown[],
    writableRoles: ["superadmin"],
  },
  positions: {
    default: [
      { id: "1", role: "Loyalty Program Manager", loc: "Milan · IT", description: "" },
      { id: "2", role: "Account Executive — Petrol", loc: "Ljubljana · SI", description: "" },
      { id: "3", role: "Creative Copywriter", loc: "Remote · EU", description: "" },
      { id: "4", role: "Supply Chain Coordinator", loc: "Milan · IT", description: "" },
    ] as unknown[],
    writableRoles: ["superadmin", "admin"],
  },
  customPages: {
    default: [] as unknown[],
    writableRoles: ["superadmin", "admin"],
  },
} as const satisfies Record<string, ContentTypeDef>;

export type ContentTypeKey = keyof typeof CONTENT_TYPES;

export const VALID_CONTENT_TYPES = Object.keys(CONTENT_TYPES) as ContentTypeKey[];

export function isContentType(type: string): type is ContentTypeKey {
  return (VALID_CONTENT_TYPES as string[]).includes(type);
}

export function canWriteType(role: string, type: string): boolean {
  if (!isContentType(type)) return false;
  return (CONTENT_TYPES[type].writableRoles as readonly string[]).includes(role);
}
