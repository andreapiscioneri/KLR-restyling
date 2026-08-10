import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readVisitLog, clearVisitLog } from "@/lib/analytics-log";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const log = await readVisitLog();
  const sorted = [...log].sort((a, b) => b.visitedAt.localeCompare(a.visitedAt));
  return NextResponse.json({ data: sorted }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await clearVisitLog();
  return NextResponse.json({ ok: true });
}
