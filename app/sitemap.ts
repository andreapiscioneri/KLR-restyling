import type { MetadataRoute } from "next";
import { studies, brands, leadership, fallbackPosts } from "@/src/app/data";

const BASE = "https://klr-europe.com";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
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

  const studyPages: MetadataRoute.Sitemap = studies.map((s) => ({
    url: `${BASE}/work/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${BASE}/brands/${b.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const teamPages: MetadataRoute.Sitemap = leadership.map((p) => ({
    url: `${BASE}/team/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = fallbackPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...statics, ...studyPages, ...brandPages, ...teamPages, ...blogPages];
}
