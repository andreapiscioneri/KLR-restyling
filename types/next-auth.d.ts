import type { DefaultSession } from "next-auth";

// Il ruolo (superadmin / admin / editor) governa i permessi di scrittura
// per tipo di contenuto: va portato nella sessione e nel JWT.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
