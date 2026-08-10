import { NextRequest, NextResponse } from "next/server";
import { appendContactSubmission, type ContactSubmission } from "@/lib/contact-log";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Partial<ContactSubmission> | null;
  if (
    !b ||
    typeof b.name !== "string" || !b.name.trim() ||
    typeof b.email !== "string" || !EMAIL_RE.test(b.email) ||
    typeof b.message !== "string" || !b.message.trim()
  ) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const str = (v: unknown, max = 150) => typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;
  const record: ContactSubmission = {
    id: crypto.randomUUID(),
    name: b.name.trim().slice(0, 200),
    email: b.email.trim().slice(0, 200),
    company: typeof b.company === "string" ? b.company.trim().slice(0, 200) : undefined,
    jobTitle: typeof b.jobTitle === "string" ? b.jobTitle.trim().slice(0, 200) : undefined,
    message: b.message.trim().slice(0, 5000),
    submittedAt: new Date().toISOString(),
    utmSource: str(b.utmSource),
    utmMedium: str(b.utmMedium),
    utmCampaign: str(b.utmCampaign),
    gclid: str(b.gclid, 200),
  };

  try {
    await appendContactSubmission(record);
  } catch (err) {
    console.error("Failed to log contact submission:", err);
    return NextResponse.json({ error: "Failed to store submission" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
