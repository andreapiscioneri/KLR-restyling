import { NextResponse } from "next/server";
import { signOut } from "@/auth";
import { isAdminRequest } from "@/lib/admin-session";

/**
 * Endpoint di compatibilità: la AdminBar interroga GET per sapere se
 * mostrarsi, la dashboard chiama DELETE per il logout. Il login è
 * passato al server action adminLoginAction (Auth.js).
 */
export async function GET() {
  return NextResponse.json(
    { authenticated: await isAdminRequest() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function DELETE() {
  await signOut({ redirect: false });
  return NextResponse.json({ ok: true });
}
