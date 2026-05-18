import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import crypto from "crypto";
import { getUsers, writeJSON } from "@/lib/content";

const TOKEN = "klr-admin-v1-secure-token-2025";
const COOKIE_NAME = "klr_admin_session";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "editor";
};

type RawUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  role: string;
};

// Sections visible per role
export const ROLE_SECTIONS: Record<string, string[]> = {
  superadmin: ["overview","pages","stats","brands","leadership","studies","posts","colors","users","settings"],
  admin:      ["overview","pages","stats","brands","leadership","studies","posts","colors","settings"],
  editor:     ["overview","studies","posts"],
};

// Content types writable per role
const WRITE_PERMISSIONS: Record<string, string[]> = {
  superadmin: ["stats","brands","leadership","pages","studies","posts","users","colors","settings"],
  admin:      ["stats","brands","leadership","pages","studies","posts","colors","settings"],
  editor:     ["studies","posts"],
};

export function canWrite(role: string, type: string): boolean {
  return (WRITE_PERMISSIONS[role] ?? []).includes(type);
}

// PBKDF2 password hashing (no external deps)
function pbkdf2Hash(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt ?? crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, actualSalt, 10000, 32, "sha256").toString("hex");
  return { hash, salt: actualSalt };
}

export function hashNewPassword(password: string): { passwordHash: string; passwordSalt: string } {
  const { hash, salt } = pbkdf2Hash(password);
  return { passwordHash: hash, passwordSalt: salt };
}

type SessionValue = { token: string; email?: string };

function parseSession(value: string): SessionValue | null {
  if (!value) return null;
  let v = value;
  try { v = decodeURIComponent(value); } catch { /* noop */ }
  if (v.includes("|")) {
    const [token, email] = v.split("|");
    return { token, email };
  }
  return { token: v };
}

function getRawUserByEmail(email?: string): RawUser | null {
  if (!email) return null;
  return (getUsers() as RawUser[]).find(u => u.email === email) ?? null;
}

function toAdminUser(u: RawUser): AdminUser {
  return { id: u.id, name: u.name, email: u.email, role: u.role as AdminUser["role"] };
}

export function findUserByCredentials(email: string, password: string): AdminUser | null {
  const users = getUsers() as RawUser[];
  const user = users.find(u => u.email === email);
  if (!user) return null;

  let valid = false;
  let migrate = false;

  if (user.passwordHash && user.passwordSalt) {
    try {
      const { hash } = pbkdf2Hash(password, user.passwordSalt);
      valid = crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.passwordHash, "hex"));
    } catch { valid = false; }
  } else if (user.password) {
    valid = user.password === password;
    if (valid) migrate = true;
  }

  if (!valid) return null;

  // Auto-migrate plaintext → PBKDF2
  if (migrate) {
    const { hash, salt } = pbkdf2Hash(password);
    const updated = users.map(u => {
      if (u.id !== user.id) return u;
      const { password: _p, ...rest } = u;
      return { ...rest, passwordHash: hash, passwordSalt: salt };
    });
    writeJSON("users.json", updated);
  }

  return toAdminUser(user);
}

export function validateCredentials(email: string, password: string): boolean {
  return Boolean(findUserByCredentials(email, password));
}

export function generateToken(email?: string): string {
  return email ? `${TOKEN}|${email}` : TOKEN;
}

export function isValidToken(token: string): boolean {
  return parseSession(token)?.token === TOKEN;
}

export async function getAdminSession(): Promise<boolean> {
  return Boolean(await getAdminSessionUser());
}

export async function getAdminSessionUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session || !isValidToken(session.value)) return null;

  const parsed = parseSession(session.value);
  const raw = getRawUserByEmail(parsed?.email);
  if (raw) return toAdminUser(raw);

  const first = (getUsers() as RawUser[])[0];
  return first ? toAdminUser(first) : null;
}

export function isAdminRequest(request: NextRequest): boolean {
  const session = request.cookies.get(COOKIE_NAME);
  return session ? isValidToken(session.value) : false;
}

export function getAdminUserFromRequest(request: NextRequest): AdminUser | null {
  const session = request.cookies.get(COOKIE_NAME);
  if (!session || !isValidToken(session.value)) return null;
  const email = parseSession(session.value)?.email;
  const raw = getRawUserByEmail(email);
  return raw ? toAdminUser(raw) : null;
}

export const COOKIE_OPTIONS = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
};
