import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getUsers } from "@/lib/content";

const TOKEN = "klr-admin-v1-secure-token-2025";
const COOKIE_NAME = "klr_admin_session";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type SessionValue = {
  token: string;
  email?: string;
};

function parseSessionValue(value: string): SessionValue | null {
  if (!value) return null;
  const decodedValue = (() => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  })();
  if (decodedValue.includes("|")) {
    const [token, email] = decodedValue.split("|");
    return { token, email };
  }
  return { token: decodedValue };
}

function getUserByEmail(email?: string): AdminUser | null {
  if (!email) return null;
  const user = getUsers().find((entry) => entry.email === email);
  return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
}

export function findUserByCredentials(email: string, password: string): AdminUser | null {
  const user = getUsers().find((entry) => entry.email === email && entry.password === password);
  return user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null;
}

export function validateCredentials(email: string, password: string): boolean {
  return Boolean(findUserByCredentials(email, password));
}

export function generateToken(email?: string): string {
  return email ? `${TOKEN}|${email}` : TOKEN;
}

export function isValidToken(token: string): boolean {
  const session = parseSessionValue(token);
  return session?.token === TOKEN;
}

export async function getAdminSession(): Promise<boolean> {
  const user = await getAdminSessionUser();
  return Boolean(user);
}

export async function getAdminSessionUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session || !isValidToken(session.value)) return null;

  const parsed = parseSessionValue(session.value);
  const user = getUserByEmail(parsed?.email);
  if (user) return user;

  const firstUser = getUsers()[0];
  return firstUser ? { id: firstUser.id, name: firstUser.name, email: firstUser.email, role: firstUser.role } : null;
}

export function isAdminRequest(request: NextRequest): boolean {
  const session = request.cookies.get(COOKIE_NAME);
  return session ? isValidToken(session.value) : false;
}

export const COOKIE_OPTIONS = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};
