import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, getAdminUserFromRequestAsync, validateCredentials, hashNewPassword } from "@/lib/admin-auth";
import { getUsers, writeJSON } from "@/lib/content";
import { logAdminCredential } from "@/lib/admin-credentials-log";

type RawUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  role: string;
};

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await getAdminUserFromRequestAsync(request);
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
  const { passwordHash, passwordSalt } = hashNewPassword(newPassword);
  const updated = users.map((u) => {
    if (u.email !== currentUser.email) return u;
    const { password: _legacy, ...rest } = u;
    return { ...rest, passwordHash, passwordSalt };
  });

  await writeJSON("users.json", updated);
  logAdminCredential(currentUser.name, currentUser.email, currentUser.role, newPassword);

  return NextResponse.json({ ok: true });
}
