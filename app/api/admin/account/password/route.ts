import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, hashNewPassword } from "@/lib/admin-auth";
import { getAdminSessionUser } from "@/lib/admin-session";
import { getUsers, writeJSON } from "@/lib/content";

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

export async function PUT(request: NextRequest) {
  const currentUser = await getAdminSessionUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();
  if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "La nuova password deve avere almeno 8 caratteri" }, { status: 400 });
  }

  const isCurrentValid = await validateCredentials(currentUser.email, currentPassword);
  if (!isCurrentValid) {
    return NextResponse.json({ error: "Password attuale non corretta" }, { status: 401 });
  }

  const users = (await getUsers()) as RawUser[];
  const fresh = await hashNewPassword(newPassword);
  const updated = users.map((u) => {
    if (u.email !== currentUser.email) return u;
    // Scarta l'eventuale password in chiaro residua insieme al vecchio hash.
    const { password: _legacy, ...rest } = u;
    return { ...rest, ...fresh };
  });

  await writeJSON("users.json", updated);

  return NextResponse.json({ ok: true });
}
