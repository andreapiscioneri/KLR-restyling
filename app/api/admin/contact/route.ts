import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readContactLog, deleteContactSubmission, clearContactLog } from "@/lib/contact-log";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const log = await readContactLog();
  const sorted = [...log].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  return NextResponse.json({ data: sorted }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (id === "all") {
    await clearContactLog();
    return NextResponse.json({ ok: true });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await deleteContactSubmission(id);
  return NextResponse.json({ ok: true });
}
