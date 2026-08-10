import { NextRequest, NextResponse } from "next/server";
import { appendApplication, type JobApplication } from "@/lib/applications-log";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Partial<JobApplication> | null;
  if (
    !b ||
    typeof b.positionId !== "string" || !b.positionId.trim() ||
    typeof b.positionRole !== "string" || !b.positionRole.trim() ||
    typeof b.name !== "string" || !b.name.trim() ||
    typeof b.email !== "string" || !EMAIL_RE.test(b.email)
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const str = (v: unknown, max = 150) => typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;
  const record: JobApplication = {
    id: crypto.randomUUID(),
    positionId: b.positionId.trim().slice(0, 100),
    positionRole: b.positionRole.trim().slice(0, 200),
    name: b.name.trim().slice(0, 200),
    email: b.email.trim().slice(0, 200),
    message: typeof b.message === "string" ? b.message.trim().slice(0, 5000) : undefined,
    submittedAt: new Date().toISOString(),
    utmSource: str(b.utmSource),
    utmMedium: str(b.utmMedium),
    utmCampaign: str(b.utmCampaign),
    gclid: str(b.gclid, 200),
  };

  try {
    await appendApplication(record);
  } catch (err) {
    console.error("Failed to log job application:", err);
    return NextResponse.json({ error: "Failed to store application" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
