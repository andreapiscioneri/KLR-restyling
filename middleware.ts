import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * La protezione di /admin è ora il callback `authorized` in
 * auth.config.ts: verifica la firma del JWT invece di confrontare il
 * cookie con una costante presente nel sorgente.
 *
 * Qui si usa la sola configurazione edge-safe: il middleware di Next
 * gira nel runtime edge, dove better-sqlite3 non è disponibile.
 */
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
