import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readApplicationsLog, deleteApplication, clearApplicationsLog } from "@/lib/applications-log";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const log = await readApplicationsLog();
  const sorted = [...log].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  return NextResponse.json({ data: sorted }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (id === "all") {
    await clearApplicationsLog();
    return NextResponse.json({ ok: true });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await deleteApplication(id);
  return NextResponse.json({ ok: true });
}
