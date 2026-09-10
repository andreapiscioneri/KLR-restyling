import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { findUserByCredentials } from "@/lib/admin-auth";

/**
 * Auth.js sostituisce la gestione di sessione artigianale precedente,
 * che firmava i cookie con un token statico scritto nel sorgente di un
 * repository pubblico: chiunque poteva fabbricarsi una sessione da
 * superadmin senza conoscere alcuna password.
 *
 * Il cookie è ora un JWT firmato e cifrato con AUTH_SECRET, e il ruolo
 * viaggia dentro il token invece che in una stringa non autenticata.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        const user = await findUserByCredentials(email, password);
        if (!user) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
});
