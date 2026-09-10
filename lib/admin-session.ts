import { auth } from "@/auth";
import { getUserByEmail, type AdminUser } from "@/lib/admin-auth";

/**
 * Lettura della sessione amministrativa.
 *
 * Il ruolo viene riletto dal database a ogni richiesta invece di
 * fidarsi di quello dentro il JWT: con sessioni da 7 giorni, un ruolo
 * revocato o un utente eliminato resterebbero altrimenti validi fino
 * alla scadenza del token.
 */
export async function getAdminSessionUser(): Promise<AdminUser | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  return getUserByEmail(email);
}

export async function isAdminRequest(): Promise<boolean> {
  return Boolean(await getAdminSessionUser());
}

export async function getAdminSession(): Promise<boolean> {
  return isAdminRequest();
}
