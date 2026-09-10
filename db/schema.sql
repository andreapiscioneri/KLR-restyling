-- ─────────────────────────────────────────────────────────────
-- KLR Europe — schema SQLite
-- Sostituisce lo store Netlify Blobs "cms-content".
--
-- Criterio: le COLLEZIONI (array di record) diventano tabelle,
-- i SINGOLETTI (documenti annidati: pages, settings, colors,
-- stats, cookieBanner, customPages) restano JSON in `documents`,
-- perché normalizzarli non darebbe alcun vantaggio.
--
-- `position` preserva l'ordine dell'array originale: alcune
-- viste del sito dipendono dall'ordine di inserimento, che in
-- una tabella non è garantito senza un ORDER BY esplicito.
-- ─────────────────────────────────────────────────────────────

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version    INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL
);

-- ── Singoletti ────────────────────────────────────────────────
-- Rimpiazzo drop-in di readContent/writeContent: stessa chiave,
-- stesso payload JSON, stessa semantica.
CREATE TABLE IF NOT EXISTS documents (
  key        TEXT PRIMARY KEY,
  data       TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- ── Contenuti editoriali ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id             INTEGER PRIMARY KEY,      -- id numerici ereditati da WordPress
  slug           TEXT    NOT NULL UNIQUE,
  title          TEXT    NOT NULL,
  date           TEXT    NOT NULL,
  excerpt        TEXT    NOT NULL DEFAULT '',
  img            TEXT    NOT NULL DEFAULT '',
  link           TEXT    NOT NULL DEFAULT '',
  category       TEXT    NOT NULL DEFAULT '',
  content_html   TEXT    NOT NULL DEFAULT '',
  public_preview INTEGER NOT NULL DEFAULT 0,
  cornerstone    INTEGER NOT NULL DEFAULT 0,
  author_name    TEXT    NOT NULL DEFAULT '',
  author_avatar  TEXT    NOT NULL DEFAULT '',
  status         TEXT    NOT NULL DEFAULT 'published',
  position       INTEGER NOT NULL DEFAULT 0,
  updated_at     TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_posts_status_date ON posts(status, date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_position    ON posts(position);

CREATE TABLE IF NOT EXISTS studies (
  id             TEXT    PRIMARY KEY,      -- slug testuale
  cat            TEXT    NOT NULL DEFAULT '',
  client         TEXT    NOT NULL DEFAULT '',
  title          TEXT    NOT NULL,
  location       TEXT    NOT NULL DEFAULT '',
  year           TEXT    NOT NULL DEFAULT '',
  img            TEXT    NOT NULL DEFAULT '',
  summary        TEXT    NOT NULL DEFAULT '',
  results        TEXT    NOT NULL DEFAULT '[]',   -- JSON array
  brand          TEXT    NOT NULL DEFAULT '',
  details        TEXT    NOT NULL DEFAULT '{}',   -- JSON object (gallery, sezioni)
  public_preview INTEGER NOT NULL DEFAULT 0,
  cornerstone    INTEGER NOT NULL DEFAULT 0,
  status         TEXT    NOT NULL DEFAULT 'published',
  position       INTEGER NOT NULL DEFAULT 0,
  updated_at     TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_studies_status   ON studies(status);
CREATE INDEX IF NOT EXISTS idx_studies_brand    ON studies(brand);
CREATE INDEX IF NOT EXISTS idx_studies_position ON studies(position);

CREATE TABLE IF NOT EXISTS brands (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  tag        TEXT,
  img        TEXT,
  logo       TEXT,
  since      TEXT,
  campaigns  TEXT,
  countries  TEXT,
  desc_text  TEXT,                          -- "desc" è riservata in SQL
  position   INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leadership (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT '',
  img        TEXT NOT NULL DEFAULT '',
  bio        TEXT NOT NULL DEFAULT '',
  quote      TEXT NOT NULL DEFAULT '',
  linkedin   TEXT,
  position   INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS positions (
  id          TEXT PRIMARY KEY,
  role        TEXT NOT NULL,
  loc         TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  position    INTEGER NOT NULL DEFAULT 0,
  updated_at  TEXT NOT NULL
);

-- ── Utenti CMS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
  role          TEXT NOT NULL CHECK (role IN ('superadmin','admin','editor')),
  password_hash TEXT,
  password_salt TEXT,
  -- Numero di iterazioni PBKDF2 con cui l'hash è stato generato.
  -- Le password storiche usavano 10.000; al primo login riuscito
  -- vengono ricalcolate con il valore corrente (vedi lib/admin-auth.ts),
  -- quindi il default serve solo ai record non ancora aggiornati.
  password_iterations INTEGER NOT NULL DEFAULT 10000,
  -- Password in chiaro legacy: findUserByCredentials la migra ad hash
  -- al primo login riuscito. Preservata per non bloccare fuori un
  -- utente non ancora migrato; deve restare NULL a regime.
  legacy_password TEXT,
  updated_at    TEXT NOT NULL
);

-- ── Media ─────────────────────────────────────────────────────
-- La tabella che elimina il collo di bottiglia attuale: oggi ogni
-- richiesta di immagine deserializza 545 KB di manifest JSON per
-- risolvere un singolo id.
CREATE TABLE IF NOT EXISTS media (
  id          TEXT PRIMARY KEY,
  blob_key    TEXT NOT NULL UNIQUE,        -- nome del file su disco
  filename    TEXT NOT NULL,
  title       TEXT NOT NULL DEFAULT '',
  alt         TEXT NOT NULL DEFAULT '',
  caption     TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  mime_type   TEXT NOT NULL,
  width       INTEGER,
  height      INTEGER,
  filesize    INTEGER,
  source_url  TEXT,                        -- fallback CDN WordPress legacy
  uploaded_at TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_media_uploaded ON media(uploaded_at DESC);
-- Risoluzione dei vecchi URL /wp-content/uploads/... verso il media attuale.
CREATE INDEX IF NOT EXISTS idx_media_source_url ON media(source_url);

-- ── Log runtime ───────────────────────────────────────────────
-- Il motivo principale della migrazione: oggi ogni pageview
-- rilegge e riscrive l'intero log (fino a ~6,8 MB a regime).
-- Qui diventa una INSERT da poche centinaia di byte.
CREATE TABLE IF NOT EXISTS site_visits (
  id           TEXT PRIMARY KEY,
  path         TEXT NOT NULL,
  referrer     TEXT,
  session_id   TEXT NOT NULL,
  device       TEXT NOT NULL,
  browser      TEXT NOT NULL,
  visited_at   TEXT NOT NULL,
  event_type   TEXT NOT NULL DEFAULT 'pageview',
  event_label  TEXT,
  utm_source   TEXT, utm_medium TEXT, utm_campaign TEXT,
  utm_term     TEXT, utm_content TEXT, gclid TEXT
);
CREATE INDEX IF NOT EXISTS idx_visits_visited_at ON site_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_path       ON site_visits(path);
CREATE INDEX IF NOT EXISTS idx_visits_session    ON site_visits(session_id);
CREATE INDEX IF NOT EXISTS idx_visits_utm        ON site_visits(utm_source, utm_campaign);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  company      TEXT,
  job_title    TEXT,
  message      TEXT NOT NULL DEFAULT '',
  submitted_at TEXT NOT NULL,
  utm_source   TEXT, utm_medium TEXT, utm_campaign TEXT, gclid TEXT
);
CREATE INDEX IF NOT EXISTS idx_contact_submitted ON contact_submissions(submitted_at DESC);

CREATE TABLE IF NOT EXISTS job_applications (
  id            TEXT PRIMARY KEY,
  position_id   TEXT NOT NULL,
  position_role TEXT NOT NULL DEFAULT '',
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  message       TEXT,
  submitted_at  TEXT NOT NULL,
  utm_source    TEXT, utm_medium TEXT, utm_campaign TEXT, gclid TEXT
);
CREATE INDEX IF NOT EXISTS idx_applications_submitted ON job_applications(submitted_at DESC);

-- Prova di consenso ai fini GDPR: da conservare, mai troncare.
CREATE TABLE IF NOT EXISTS cookie_consents (
  id           TEXT PRIMARY KEY,
  level        TEXT NOT NULL,
  duration     TEXT NOT NULL,
  categories   TEXT NOT NULL,               -- JSON {basic, content, optimization, ads}
  consented_at TEXT NOT NULL,
  expires_at   TEXT NOT NULL,
  path         TEXT,
  user_agent   TEXT,
  logged_at    TEXT NOT NULL,
  source       TEXT                         -- 'prod' | 'repo' | 'both': provenienza al momento della migrazione
);
CREATE INDEX IF NOT EXISTS idx_consents_consented ON cookie_consents(consented_at DESC);

-- ── Cronologia delle modifiche ────────────────────────────────
-- Sostituisce (migliorandola) la versionabilità che oggi davano i
-- content/*.json in git: qui la storia è per singolo record.
CREATE TABLE IF NOT EXISTS revisions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  entity     TEXT NOT NULL,                 -- 'posts' | 'studies' | 'documents' | ...
  entity_id  TEXT NOT NULL,
  data       TEXT NOT NULL,                 -- snapshot JSON precedente
  changed_by TEXT,                          -- email dell'utente admin
  changed_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_revisions ON revisions(entity, entity_id, changed_at DESC);
