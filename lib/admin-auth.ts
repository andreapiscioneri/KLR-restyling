import crypto from "crypto";
import { promisify } from "util";
import { getUsers, writeJSON } from "@/lib/content";
import { canWriteType } from "@/lib/content-types";

/**
 * Verifica delle credenziali e hashing delle password.
 *
 * Qui NON c'è gestione di sessione: quella è passata ad Auth.js
 * (vedi auth.ts). La versione precedente firmava le sessioni con un
 * token statico scritto nel sorgente, quindi chiunque leggesse il
 * repository poteva fabbricare un cookie valido da superadmin.
 */

const pbkdf2 = promisify(crypto.pbkdf2);

// OWASP raccomanda 600.000 iterazioni per PBKDF2-SHA256. Le password
// storiche ne usavano 10.000: restano verificabili, e al primo login
// riuscito vengono ricalcolate con il valore corrente.
const PBKDF2_ITERATIONS = 600_000;
const LEGACY_ITERATIONS = 10_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

export type AdminRole = "superadmin" | "admin" | "editor";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
};

type RawUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  passwordIterations?: number;
  role: string;
};

export function canWrite(role: string, type: string): boolean {
  return canWriteType(role, type);
}

async function derive(password: string, salt: string, iterations: number): Promise<string> {
  const key = await pbkdf2(password, salt, iterations, KEY_LENGTH, DIGEST);
  return key.toString("hex");
}

export async function hashNewPassword(password: string): Promise<{
  passwordHash: string;
  passwordSalt: string;
  passwordIterations: number;
}> {
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const passwordHash = await derive(password, passwordSalt, PBKDF2_ITERATIONS);
  return { passwordHash, passwordSalt, passwordIterations: PBKDF2_ITERATIONS };
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function toAdminUser(u: RawUser): AdminUser {
  return { id: u.id, name: u.name, email: u.email, role: u.role as AdminRole };
}

/**
 * Sostituisce l'hash dell'utente con uno al numero di iterazioni
 * corrente. Chiamata solo dopo una verifica riuscita, quando è
 * disponibile la password in chiaro.
 */
async function upgradeStoredPassword(users: RawUser[], userId: string, password: string): Promise<void> {
  const fresh = await hashNewPassword(password);
  const updated = users.map((u) => {
    if (u.id !== userId) return u;
    const { password: _legacy, ...rest } = u;
    return { ...rest, ...fresh };
  });
  await writeJSON("users.json", updated);
}

export async function findUserByCredentials(email: string, password: string): Promise<AdminUser | null> {
  const users = (await getUsers()) as RawUser[];
  const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    // Un ramo che esce subito renderebbe distinguibile "utente
    // inesistente" da "password errata" misurando i tempi di risposta.
    await derive(password, "00000000000000000000000000000000", PBKDF2_ITERATIONS);
    return null;
  }

  let valid = false;
  let needsUpgrade = false;

  if (user.passwordHash && user.passwordSalt) {
    const iterations = user.passwordIterations ?? LEGACY_ITERATIONS;
    const candidate = await derive(password, user.passwordSalt, iterations);
    valid = safeEqual(candidate, user.passwordHash);
    needsUpgrade = valid && iterations < PBKDF2_ITERATIONS;
  } else if (user.password) {
    // Password in chiaro mai migrata: verifica a tempo costante e
    // conversione immediata ad hash.
    valid = safeEqual(
      Buffer.from(user.password).toString("hex"),
      Buffer.from(password).toString("hex")
    );
    needsUpgrade = valid;
  }

  if (!valid) return null;

  if (needsUpgrade) {
    try {
      await upgradeStoredPassword(users, user.id, password);
    } catch (err) {
      // Un fallimento qui non deve impedire il login: l'hash resta
      // quello vecchio e si riproverà al prossimo accesso.
      console.error("Aggiornamento hash password fallito:", err);
    }
  }

  return toAdminUser(user);
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  return Boolean(await findUserByCredentials(email, password));
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const users = (await getUsers()) as RawUser[];
  const user = users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  return user ? toAdminUser(user) : null;
}
