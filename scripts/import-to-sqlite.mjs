#!/usr/bin/env node
/**
 * Importa l'export dei Netlify Blobs in SQLite.
 *
 * Uso: node scripts/import-to-sqlite.mjs [--export <dir>] [--db <file>] [--repo <dir>]
 * Default: --export /Users/ohzak/klr-export/content  --db /Users/ohzak/klr-export/klr.db
 *
 * Idempotente: ricostruisce il DB da zero a ogni esecuzione.
 *
 * Note di migrazione:
 *  - `position` preserva l'ordine degli array originali.
 *  - I consensi cookie sono l'UNIONE di produzione e copia nel repo:
 *    i due insiemi sono quasi disgiunti (si sovrappongono per 1 record
 *    su 40) perché il log di produzione è stato azzerato a un certo
 *    punto. Sono prova di consenso ai fini GDPR: si tengono entrambi.
 */
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const EXPORT_DIR = arg("--export", "/Users/ohzak/klr-export/content");
const DB_PATH     = arg("--db", "/Users/ohzak/klr-export/klr.db");
const REPO        = arg("--repo", path.resolve(path.dirname(new URL(import.meta.url).pathname), ".."));
const SCHEMA      = path.join(REPO, "db", "schema.sql");

const read = (dir, key) => {
  const p = path.join(dir, `${key}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : null;
};
const now = new Date().toISOString();
const bool = (v) => (v ? 1 : 0);
const warnings = [];

function checkFields(key, records, known) {
  const seen = new Set();
  for (const r of records) for (const k of Object.keys(r ?? {})) if (!known.includes(k)) seen.add(k);
  if (seen.size) warnings.push(`${key}: campi non modellati -> ${[...seen].join(", ")}`);
}

if (fs.existsSync(DB_PATH)) fs.rmSync(DB_PATH);
for (const suffix of ["-wal", "-shm"]) if (fs.existsSync(DB_PATH + suffix)) fs.rmSync(DB_PATH + suffix);

const db = new Database(DB_PATH);
db.exec(fs.readFileSync(SCHEMA, "utf-8"));
const counts = {};

db.transaction(() => {
  // ── singoletti ──────────────────────────────────────────────
  const ins = db.prepare("INSERT INTO documents (key, data, updated_at) VALUES (?, ?, ?)");
  for (const key of ["pages", "settings", "colors", "stats", "cookieBanner", "customPages"]) {
    const d = read(EXPORT_DIR, key);
    if (d === null) { warnings.push(`${key}: assente dall'export`); continue; }
    ins.run(key, JSON.stringify(d), now);
  }
  counts.documents = db.prepare("SELECT COUNT(*) c FROM documents").get().c;

  // ── posts ───────────────────────────────────────────────────
  const posts = read(EXPORT_DIR, "posts") ?? [];
  checkFields("posts", posts, ["id","slug","title","date","excerpt","img","link","category","contentHtml","publicPreview","cornerstone","authorName","authorAvatar","status"]);
  const insPost = db.prepare(`INSERT INTO posts
    (id,slug,title,date,excerpt,img,link,category,content_html,public_preview,cornerstone,author_name,author_avatar,status,position,updated_at)
    VALUES (@id,@slug,@title,@date,@excerpt,@img,@link,@category,@content_html,@public_preview,@cornerstone,@author_name,@author_avatar,@status,@position,@updated_at)`);
  posts.forEach((p, i) => insPost.run({
    id: p.id, slug: p.slug, title: p.title, date: p.date,
    excerpt: p.excerpt ?? "", img: p.img ?? "", link: p.link ?? "", category: p.category ?? "",
    content_html: p.contentHtml ?? "", public_preview: bool(p.publicPreview), cornerstone: bool(p.cornerstone),
    author_name: p.authorName ?? "", author_avatar: p.authorAvatar ?? "",
    status: p.status ?? "published", position: i, updated_at: now,
  }));
  counts.posts = posts.length;

  // ── studies ─────────────────────────────────────────────────
  const studies = read(EXPORT_DIR, "studies") ?? [];
  checkFields("studies", studies, ["id","cat","client","title","location","year","img","summary","results","brand","details","publicPreview","cornerstone","status"]);
  const insStudy = db.prepare(`INSERT INTO studies
    (id,cat,client,title,location,year,img,summary,results,brand,details,public_preview,cornerstone,status,position,updated_at)
    VALUES (@id,@cat,@client,@title,@location,@year,@img,@summary,@results,@brand,@details,@public_preview,@cornerstone,@status,@position,@updated_at)`);
  studies.forEach((s, i) => insStudy.run({
    id: s.id, cat: s.cat ?? "", client: s.client ?? "", title: s.title, location: s.location ?? "",
    year: s.year ?? "", img: s.img ?? "", summary: s.summary ?? "",
    results: JSON.stringify(s.results ?? []), brand: s.brand ?? "", details: JSON.stringify(s.details ?? {}),
    public_preview: bool(s.publicPreview), cornerstone: bool(s.cornerstone),
    status: s.status ?? "published", position: i, updated_at: now,
  }));
  counts.studies = studies.length;

  // ── brands / leadership / positions ─────────────────────────
  const brands = read(EXPORT_DIR, "brands") ?? [];
  checkFields("brands", brands, ["id","name","tag","img","logo","since","campaigns","countries","desc"]);
  const insBrand = db.prepare(`INSERT INTO brands (id,name,tag,img,logo,since,campaigns,countries,desc_text,position,updated_at)
    VALUES (@id,@name,@tag,@img,@logo,@since,@campaigns,@countries,@desc_text,@position,@updated_at)`);
  brands.forEach((b, i) => insBrand.run({
    id: b.id, name: b.name, tag: b.tag ?? null, img: b.img ?? null, logo: b.logo ?? null,
    since: b.since ?? null, campaigns: b.campaigns ?? null, countries: b.countries ?? null,
    desc_text: b.desc ?? null, position: i, updated_at: now,
  }));
  counts.brands = brands.length;

  const leadership = read(EXPORT_DIR, "leadership") ?? [];
  checkFields("leadership", leadership, ["id","name","role","img","bio","quote","linkedin"]);
  const insLead = db.prepare(`INSERT INTO leadership (id,name,role,img,bio,quote,linkedin,position,updated_at)
    VALUES (@id,@name,@role,@img,@bio,@quote,@linkedin,@position,@updated_at)`);
  leadership.forEach((l, i) => insLead.run({
    id: l.id, name: l.name, role: l.role ?? "", img: l.img ?? "", bio: l.bio ?? "",
    quote: l.quote ?? "", linkedin: l.linkedin ?? null, position: i, updated_at: now,
  }));
  counts.leadership = leadership.length;

  const positions = read(EXPORT_DIR, "positions") ?? [];
  checkFields("positions", positions, ["id","role","loc","description"]);
  const insPos = db.prepare(`INSERT INTO positions (id,role,loc,description,position,updated_at)
    VALUES (@id,@role,@loc,@description,@position,@updated_at)`);
  positions.forEach((p, i) => insPos.run({
    id: p.id, role: p.role, loc: p.loc ?? "", description: p.description ?? "", position: i, updated_at: now,
  }));
  counts.positions = positions.length;

  // ── users ───────────────────────────────────────────────────
  const users = read(EXPORT_DIR, "users") ?? [];
  checkFields("users", users, ["id","name","email","role","password","passwordHash","passwordSalt"]);
  const insUser = db.prepare(`INSERT INTO users (id,name,email,role,password_hash,password_salt,updated_at)
    VALUES (@id,@name,@email,@role,@password_hash,@password_salt,@updated_at)`);
  for (const u of users) {
    if (u.password && !u.passwordHash) warnings.push(`users: ${u.email} ha ancora una password in chiaro`);
    insUser.run({ id: u.id, name: u.name, email: u.email, role: u.role,
      password_hash: u.passwordHash ?? null, password_salt: u.passwordSalt ?? null, updated_at: now });
  }
  counts.users = users.length;

  // ── media ───────────────────────────────────────────────────
  const media = read(EXPORT_DIR, "mediaLibrary") ?? [];
  checkFields("media", media, ["id","blobKey","filename","title","alt","caption","description","mimeType","width","height","filesize","sourceUrl","uploadedAt","updatedAt"]);
  const insMedia = db.prepare(`INSERT INTO media
    (id,blob_key,filename,title,alt,caption,description,mime_type,width,height,filesize,source_url,uploaded_at,updated_at)
    VALUES (@id,@blob_key,@filename,@title,@alt,@caption,@description,@mime_type,@width,@height,@filesize,@source_url,@uploaded_at,@updated_at)`);
  for (const m of media) insMedia.run({
    id: m.id, blob_key: m.blobKey, filename: m.filename, title: m.title ?? "", alt: m.alt ?? "",
    caption: m.caption ?? "", description: m.description ?? "", mime_type: m.mimeType,
    width: m.width ?? null, height: m.height ?? null, filesize: m.filesize ?? null,
    source_url: m.sourceUrl ?? null, uploaded_at: m.uploadedAt, updated_at: m.updatedAt,
  });
  counts.media = media.length;

  // ── log ─────────────────────────────────────────────────────
  const visits = read(EXPORT_DIR, "siteVisits") ?? [];
  const insVisit = db.prepare(`INSERT INTO site_visits
    (id,path,referrer,session_id,device,browser,visited_at,event_type,event_label,utm_source,utm_medium,utm_campaign,utm_term,utm_content,gclid)
    VALUES (@id,@path,@referrer,@session_id,@device,@browser,@visited_at,@event_type,@event_label,@utm_source,@utm_medium,@utm_campaign,@utm_term,@utm_content,@gclid)`);
  for (const v of visits) insVisit.run({
    id: v.id, path: v.path, referrer: v.referrer ?? null, session_id: v.sessionId,
    device: v.device, browser: v.browser, visited_at: v.visitedAt,
    event_type: v.eventType ?? "pageview", event_label: v.eventLabel ?? null,
    utm_source: v.utmSource ?? null, utm_medium: v.utmMedium ?? null, utm_campaign: v.utmCampaign ?? null,
    utm_term: v.utmTerm ?? null, utm_content: v.utmContent ?? null, gclid: v.gclid ?? null,
  });
  counts.site_visits = visits.length;

  const contacts = read(EXPORT_DIR, "contactSubmissions") ?? [];
  const insContact = db.prepare(`INSERT INTO contact_submissions
    (id,name,email,company,job_title,message,submitted_at,utm_source,utm_medium,utm_campaign,gclid)
    VALUES (@id,@name,@email,@company,@job_title,@message,@submitted_at,@utm_source,@utm_medium,@utm_campaign,@gclid)`);
  for (const c of contacts) insContact.run({
    id: c.id, name: c.name, email: c.email, company: c.company ?? null, job_title: c.jobTitle ?? null,
    message: c.message ?? "", submitted_at: c.submittedAt,
    utm_source: c.utmSource ?? null, utm_medium: c.utmMedium ?? null, utm_campaign: c.utmCampaign ?? null, gclid: c.gclid ?? null,
  });
  counts.contact_submissions = contacts.length;

  const apps = read(EXPORT_DIR, "jobApplications") ?? [];
  const insApp = db.prepare(`INSERT INTO job_applications
    (id,position_id,position_role,name,email,message,submitted_at,utm_source,utm_medium,utm_campaign,gclid)
    VALUES (@id,@position_id,@position_role,@name,@email,@message,@submitted_at,@utm_source,@utm_medium,@utm_campaign,@gclid)`);
  for (const a of apps) insApp.run({
    id: a.id, position_id: a.positionId, position_role: a.positionRole ?? "", name: a.name, email: a.email,
    message: a.message ?? null, submitted_at: a.submittedAt,
    utm_source: a.utmSource ?? null, utm_medium: a.utmMedium ?? null, utm_campaign: a.utmCampaign ?? null, gclid: a.gclid ?? null,
  });
  counts.job_applications = apps.length;

  // ── consensi: UNIONE prod + repo ────────────────────────────
  const prod = read(EXPORT_DIR, "cookieConsents") ?? [];
  const repoPath = path.join(REPO, "content", "cookieConsents.json");
  const repo = fs.existsSync(repoPath) ? JSON.parse(fs.readFileSync(repoPath, "utf-8")) : [];
  const prodIds = new Set(prod.map((c) => c.id));
  const repoIds = new Set(repo.map((c) => c.id));
  const merged = new Map();
  for (const c of repo) merged.set(c.id, { ...c, source: prodIds.has(c.id) ? "both" : "repo" });
  for (const c of prod) merged.set(c.id, { ...c, source: repoIds.has(c.id) ? "both" : "prod" });
  const insConsent = db.prepare(`INSERT INTO cookie_consents
    (id,level,duration,categories,consented_at,expires_at,path,user_agent,logged_at,source)
    VALUES (@id,@level,@duration,@categories,@consented_at,@expires_at,@path,@user_agent,@logged_at,@source)`);
  for (const c of merged.values()) insConsent.run({
    id: c.id, level: c.level, duration: c.duration, categories: JSON.stringify(c.categories ?? {}),
    consented_at: c.consentedAt, expires_at: c.expiresAt, path: c.path ?? null,
    user_agent: c.userAgent ?? null, logged_at: c.loggedAt, source: c.source,
  });
  counts.cookie_consents = merged.size;
  counts._consents_detail = `prod ${prod.length} + repo ${repo.length} -> unione ${merged.size}`;

  db.prepare("INSERT INTO schema_migrations (version, applied_at) VALUES (1, ?)").run(now);
})();

db.pragma("optimize");
db.close();

console.log(`DB creato: ${DB_PATH}  (${(fs.statSync(DB_PATH).size / 1024 / 1024).toFixed(1)} MB)\n`);
for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(22)} ${v}`);
if (warnings.length) { console.log("\nAVVISI:"); for (const w of warnings) console.log(`  ! ${w}`); }
