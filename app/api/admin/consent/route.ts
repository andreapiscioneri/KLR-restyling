import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readConsentLog, deleteConsentRecord, clearConsentLog } from "@/lib/consent-log";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const log = await readConsentLog();
  const sorted = [...log].sort((a, b) => b.loggedAt.localeCompare(a.loggedAt));
  return NextResponse.json({ data: sorted }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (id === "all") {
    await clearConsentLog();
    return NextResponse.json({ ok: true });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await deleteConsentRecord(id);
  return NextResponse.json({ ok: true });
}
