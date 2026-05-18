import { NextRequest, NextResponse } from "next/server";
import { findUserByCredentials, generateToken, COOKIE_OPTIONS, isAdminRequest } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await findUserByCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ ...COOKIE_OPTIONS, value: generateToken(user.email) });
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ ...COOKIE_OPTIONS, value: "", maxAge: 0 });
  return response;
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
}
