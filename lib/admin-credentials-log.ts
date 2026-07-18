import fs from "fs";
import path from "path";

const LOG_PATH = path.join(process.cwd(), "admin-credentials.local.md");

type CredentialEntry = {
  name: string;
  email: string;
  role: string;
  password: string;
};

function readEntries(): CredentialEntry[] {
  if (!fs.existsSync(LOG_PATH)) return [];
  try {
    const raw = fs.readFileSync(LOG_PATH, "utf-8");
    const jsonBlock = raw.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonBlock) return [];
    return JSON.parse(jsonBlock[1]) as CredentialEntry[];
  } catch {
    return [];
  }
}

function render(entries: CredentialEntry[]): string {
  const header =
    "# Credenziali accesso CMS\n\n" +
    "> **SOLO USO LOCALE — non committare, non condividere.**\n" +
    "> Generato automaticamente. Aggiornato sia quando un superadmin imposta/reset una\n" +
    "> password dalla sezione Utenti, sia quando un utente la cambia da solo tramite\n" +
    "> 'Cambia password' nel proprio pannello — in entrambi i casi qui sotto trovi sempre\n" +
    "> l'ultima password realmente in uso.\n\n" +
    `_Ultimo aggiornamento: ${new Date().toISOString()}_\n\n`;

  const table =
    "| Nome | Email | Ruolo | Password |\n" +
    "|---|---|---|---|\n" +
    entries.map((e) => `| ${e.name} | ${e.email} | ${e.role} | ${e.password} |`).join("\n");

  const jsonBlock = "```json\n" + JSON.stringify(entries, null, 2) + "\n```\n";

  return `${header}${table}\n\n---\n\n${jsonBlock}`;
}

/**
 * Records a plaintext password at the moment it's set via the admin panel.
 * This is the only point in the app where the plaintext password exists
 * server-side (it's hashed immediately after and never stored elsewhere).
 * Filesystem writes here are local/dev-only — on serverless hosts (Netlify)
 * the filesystem is ephemeral, so this file will not persist in production.
 */
export function logAdminCredential(name: string, email: string, role: string, password: string): void {
  try {
    const entries = readEntries();
    const idx = entries.findIndex((e) => e.email === email);
    const entry = { name, email, role, password };
    if (idx >= 0) entries[idx] = entry;
    else entries.push(entry);
    fs.writeFileSync(LOG_PATH, render(entries), "utf-8");
  } catch (err) {
    console.error("Failed to write admin-credentials.local.md:", err);
  }
}

/** Removes an entry when a user is deleted, and re-syncs names/roles on every save. */
export function syncAdminCredentialRoster(users: { name: string; email: string; role: string }[]): void {
  try {
    const entries = readEntries();
    const byEmail = new Map(entries.map((e) => [e.email, e]));
    const next: CredentialEntry[] = [];
    for (const u of users) {
      const existing = byEmail.get(u.email);
      next.push({
        name: u.name,
        email: u.email,
        role: u.role,
        password: existing?.password ?? "(non impostata da questo pannello — password gia' esistente, hash non recuperabile)",
      });
    }
    fs.writeFileSync(LOG_PATH, render(next), "utf-8");
  } catch (err) {
    console.error("Failed to sync admin-credentials.local.md:", err);
  }
}
