"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserByCredentials, generateToken, COOKIE_OPTIONS } from "./admin-auth";

export async function adminLoginAction(email: string, password: string) {
  const user = await findUserByCredentials(email, password);

  if (!user) {
    return { ok: false, error: "Email o password non corretti." };
  }

  const cookieStore = await cookies();
  const token = generateToken(user.email);
  
  // Setta il cookie nel server
  cookieStore.set(COOKIE_OPTIONS.name, token, {
    httpOnly: COOKIE_OPTIONS.httpOnly,
    secure: COOKIE_OPTIONS.secure,
    sameSite: COOKIE_OPTIONS.sameSite,
    maxAge: COOKIE_OPTIONS.maxAge,
    path: COOKIE_OPTIONS.path,
  });

  // Reindirizza lato server - questo lancia un errore speciale che Next.js cattura
  redirect("/admin/dashboard");
}
