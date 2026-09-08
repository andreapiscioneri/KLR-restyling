import type { MetadataRoute } from "next";
import { legacyStudyIdMap } from "@/src/app/data";
import { getPublishedStudies, getPublishedPosts, getBrands, getLeadership } from "@/lib/content";

const BASE = "https://klr-europe.com";

// La sitemap leggeva dai dati hardcoded in src/app/data.ts, fermi a 6 case
// study e 7 post: dichiarava 47 URL su un sito che ne ha oltre 80, e non si
// sarebbe mai aggiornata pubblicando nuovi contenuti. Ora legge dal
// database, e si rigenera con la stessa cadenza delle pagine.
export const revalidate = 3600;

type WithId = { id?: unknown };
type WithSlug = { slug?: unknown };

const ids = (rows: unknown): string[] =>
  Array.isArray(rows)
    ? rows.map((r) => (r as WithId)?.id).filter((v): v is string | number => v !== undefined && v !== null).map(String)
    : [];

const slugs = (rows: unknown): string[] =>
  Array.isArray(rows)
    ? rows.map((r) => (r as WithSlug)?.slug).filter((v): v is string => typeof v === "string" && v.length > 0)
    : [];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,           lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/work`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/brands`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/team`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/contact`,    lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/career`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/10-years`,   lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/geo`,        lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/llms.txt`,   lastModified: now, changeFrequency: "monthly", priority: 0.2 },
    { url: `${BASE}/llms-full.txt`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
  ];

  // getPublished* esclude bozze ed elementi cestinati: una sitemap non deve
  // dichiarare a Google pagine che ai visitatori rispondono 404.
  const [studies, posts, brands, leadership] = await Promise.all([
    getPublishedStudies(),
    getPublishedPosts(),
    getBrands(),
    getLeadership(),
  ]);

  // Gli id storici di WordPress restano fuori: sono già coperti dai
  // redirect 301 in next.config.mjs, e dichiararli duplicherebbe le URL.
  const legacyIds = new Set(Object.keys(legacyStudyIdMap));

  const studyPages: MetadataRoute.Sitemap = ids(studies)
    .filter((id) => !legacyIds.has(id))
    .map((id) => ({ url: `${BASE}/work/${id}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 }));

  const brandPages: MetadataRoute.Sitemap = ids(brands).map((id) => ({
    url: `${BASE}/brands/${id}`, lastModified: now, changeFrequency: "monthly", priority: 0.6,
  }));

  const teamPages: MetadataRoute.Sitemap = ids(leadership).map((id) => ({
    url: `${BASE}/team/${id}`, lastModified: now, changeFrequency: "monthly", priority: 0.5,
  }));

  const blogPages: MetadataRoute.Sitemap = slugs(posts).map((slug) => ({
    url: `${BASE}/blog/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7,
  }));

  return [...statics, ...studyPages, ...brandPages, ...teamPages, ...blogPages];
}
