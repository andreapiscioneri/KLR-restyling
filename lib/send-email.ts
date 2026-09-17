import { Resend } from "resend";

// resend.dev è il dominio di test di Resend: funziona per qualsiasi
// destinatario senza dover verificare un dominio. Una volta verificato
// klr-europe.com su Resend, basta impostare CONTACT_FROM_EMAIL (es.
// "KLR Europe <noreply@klr-europe.com>") senza toccare il codice.
const DEFAULT_FROM = "KLR Europe Website <onboarding@resend.dev>";

export type EmailAttachment = { filename: string; content: Buffer };

export type NotificationEmail = {
  to?: string;
  replyTo?: string;
  subject: string;
  text: string;
  attachments?: EmailAttachment[];
};

/**
 * Invia una notifica via Resend. Senza RESEND_API_KEY configurata non fa
 * nulla (solo un avviso in log): chi ha compilato il form resta comunque
 * al sicuro perché il chiamante salva già la richiesta nel database prima
 * di arrivare qui.
 */
export async function sendNotificationEmail(email: NotificationEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY non configurata: richiesta salvata ma nessuna email inviata.");
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
    to: email.to || process.env.CONTACT_RECIPIENT_EMAIL || "info@klr-europe.com",
    replyTo: email.replyTo,
    subject: email.subject,
    text: email.text,
    attachments: email.attachments,
  });
}
