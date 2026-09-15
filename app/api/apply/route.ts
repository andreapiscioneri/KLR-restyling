import { NextRequest, NextResponse } from "next/server";
import { appendApplication, type JobApplication } from "@/lib/applications-log";
import { sendNotificationEmail, type EmailAttachment } from "@/lib/send-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_BYTES = 8 * 1024 * 1024;

function emailFor(record: JobApplication, attachments?: EmailAttachment[]) {
  const lines = [
    `Posizione: ${record.positionRole}`,
    `Nome: ${record.name}`,
    `Email: ${record.email}`,
    "",
    record.message || "(nessun messaggio)",
  ];
  return {
    subject: `Nuova candidatura — ${record.positionRole} — ${record.name}`,
    text: lines.join("\n"),
    replyTo: record.email,
    attachments,
  };
}

const str = (v: unknown, max = 150) => typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  let record: JobApplication;
  let attachments: EmailAttachment[] | undefined;

  if (contentType.includes("multipart/form-data")) {
    // Candidatura spontanea dalla pagina Team: nessuna posizione specifica,
    // ma un possibile CV allegato — un mailto: non può portare allegati.
    const form = await request.formData();
    const name = form.get("name");
    const email = form.get("email");
    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }
    const role = str(form.get("role"), 200);
    record = {
      id: crypto.randomUUID(),
      positionId: "general",
      positionRole: role || "General Application",
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 200),
      message: str(form.get("message"), 5000),
      submittedAt: new Date().toISOString(),
      utmSource: str(form.get("utmSource")),
      utmMedium: str(form.get("utmMedium")),
      utmCampaign: str(form.get("utmCampaign")),
      gclid: str(form.get("gclid"), 200),
    };

    const cv = form.get("cv");
    if (cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_BYTES) {
        return NextResponse.json({ error: "File too large" }, { status: 400 });
      }
      attachments = [{ filename: cv.name || "cv", content: Buffer.from(await cv.arrayBuffer()) }];
    }
  } else {
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
    record = {
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
  }

  try {
    await appendApplication(record);
  } catch (err) {
    console.error("Failed to log job application:", err);
    return NextResponse.json({ error: "Failed to store application" }, { status: 500 });
  }

  // La candidatura è già al sicuro nel log qui sopra: un intoppo nell'invio
  // dell'email non deve far fallire la richiesta per chi si è candidato,
  // resta comunque visibile nell'admin.
  try {
    await sendNotificationEmail(emailFor(record, attachments));
  } catch (err) {
    console.error("Failed to send application notification email:", err);
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
