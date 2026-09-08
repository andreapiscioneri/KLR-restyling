import { getPublishedPosts, getSettings } from "@/lib/content";
import type { Post } from "@/lib/content-schema";

/**
 * Feed RSS degli articoli.
 *
 * WordPress ne pubblicava uno su /feed/ e /blog/feed/, e chi si era
 * iscritto continua a interrogare quegli indirizzi. Un redirect verso
 * l'elenco articoli avrebbe tolto il link morto ma lasciato i lettori
 * senza aggiornamenti: qui il feed viene generato davvero, agli stessi
 * percorsi di prima.
 *
 * Contiene solo gli articoli. Il feed di WordPress includeva anche i
 * case study, ma nel modello dati attuale questi hanno solo l'anno e
 * non una data di pubblicazione: metterli nel feed vorrebbe dire
 * inventare i pubDate e ordinarli a caso.
 */
export const revalidate = 3600;

type Settings = { siteName?: string; siteDescription?: string; siteUrl?: string };

const FALLBACK_URL = "https://klr-europe.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value: string): string {
  // Le sequenze ]]> spezzerebbero la sezione CDATA.
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** RSS 2.0 richiede le date in formato RFC 822. */
function rfc822(value: string): string {
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

/** I lettori di feed non risolvono i percorsi relativi: vanno resi assoluti. */
function absolutize(html: string, base: string): string {
  return html
    .replace(/(\ssrc=")\/(?!\/)/g, `$1${base}/`)
    .replace(/(\shref=")\/(?!\/)/g, `$1${base}/`);
}

export async function GET() {
  const [posts, settings] = await Promise.all([
    getPublishedPosts() as Promise<Post[] | null>,
    getSettings() as Promise<Settings>,
  ]);

  const base = (settings?.siteUrl || FALLBACK_URL).replace(/\/$/, "");
  const title = settings?.siteName || "KLR Europe";
  const description = settings?.siteDescription || "Key to Loyalty in Retail";

  const sorted = [...(posts ?? [])].sort((a, b) => b.date.localeCompare(a.date));
  const lastBuild = sorted.length ? rfc822(sorted[0].date) : new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const parts = [
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
      ];
      if (post.authorName) parts.push(`      <dc:creator>${cdata(post.authorName)}</dc:creator>`);
      if (post.category) parts.push(`      <category>${cdata(post.category)}</category>`);
      if (post.excerpt) parts.push(`      <description>${cdata(post.excerpt)}</description>`);
      if (post.contentHtml) {
        parts.push(`      <content:encoded>${cdata(absolutize(post.contentHtml, base))}</content:encoded>`);
      }
      return `    <item>\n${parts.join("\n")}\n    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(base)}/</link>
    <description>${escapeXml(description)}</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(base)}/feed" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
