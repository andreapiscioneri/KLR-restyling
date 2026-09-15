import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { appendContactSubmission, type ContactSubmission } from "@/lib/contact-log";

const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL || "info@klr-europe.com";
// resend.dev è il dominio di test di Resend: funziona per qualsiasi
// destinatario senza dover verificare un dominio. Una volta verificato
// klr-europe.com su Resend, basta impostare CONTACT_FROM_EMAIL (es.
// "KLR Europe <noreply@klr-europe.com>") senza toccare il codice.
const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL || "KLR Europe Website <onboarding@resend.dev>";

async function sendNotificationEmail(record: ContactSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY non configurata: il messaggio è stato salvato ma nessuna email è stata inviata.");
    return;
  }
  const resend = new Resend(apiKey);
  const lines = [
    `Nome: ${record.name}`,
    `Email: ${record.email}`,
    record.company ? `Azienda: ${record.company}` : null,
    record.jobTitle ? `Ruolo: ${record.jobTitle}` : null,
    "",
    record.message,
  ].filter((l): l is string => l !== null);

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: CONTACT_RECIPIENT,
    replyTo: record.email,
    subject: `Nuovo messaggio dal sito — ${record.name}`,
    text: lines.join("\n"),
  });
}

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

  // Il messaggio è già al sicuro nel log qui sopra: un intoppo nell'invio
  // dell'email non deve far fallire la richiesta per chi ha compilato il
  // form, resta comunque visibile nell'admin.
  try {
    await sendNotificationEmail(record);
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
