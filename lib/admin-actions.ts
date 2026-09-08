"use server";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function adminLoginAction(email: string, password: string) {
  try {
    // redirect: false per poter restituire l'errore al form invece di
    // far reindirizzare Auth.js a una pagina di errore.
    await signIn("credentials", { email, password, redirect: false });
  } catch (err) {
    if (err instanceof AuthError) {
      return { ok: false, error: "Email o password non corretti." };
    }
    throw err;
  }

  // Fuori dal try: redirect() propaga un'eccezione di controllo che
  // Next intercetta, e un catch la scambierebbe per un errore.
  redirect("/admin/dashboard");
}
