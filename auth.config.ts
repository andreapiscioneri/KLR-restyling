import type { NextAuthConfig } from "next-auth";

/**
 * Configurazione condivisa, priva di accessi al database.
 *
 * Il middleware di Next gira nel runtime edge, dove better-sqlite3 non
 * esiste: qui c'è solo ciò che serve a validare il JWT già firmato.
 * Il provider Credentials, che il database lo interroga, vive in auth.ts
 * e viene usato solo dal runtime Node.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 giorni, come il cookie precedente
  },
  // L'app sta dietro nginx: senza questo Auth.js costruirebbe URL e
  // callback sull'indirizzo interno 127.0.0.1:3000.
  trustHost: true,
  callbacks: {
    jwt({ token, user }) {
      // `user` è valorizzato solo al login; dopo si legge dal token.
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        return Boolean(auth?.user);
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
