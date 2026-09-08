import { getDb } from "./db";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company?: string;
  jobTitle?: string;
  message: string;
  submittedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
};

const MAX_RECORDS = 5000;

type Row = {
  id: string; name: string; email: string; company: string | null; job_title: string | null;
  message: string; submitted_at: string;
  utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; gclid: string | null;
};

function fromRow(r: Row): ContactSubmission {
  const rec: ContactSubmission = {
    id: r.id, name: r.name, email: r.email, message: r.message, submittedAt: r.submitted_at,
  };
  if (r.company) rec.company = r.company;
  if (r.job_title) rec.jobTitle = r.job_title;
  if (r.utm_source) rec.utmSource = r.utm_source;
  if (r.utm_medium) rec.utmMedium = r.utm_medium;
  if (r.utm_campaign) rec.utmCampaign = r.utm_campaign;
  if (r.gclid) rec.gclid = r.gclid;
  return rec;
}

export async function readContactLog(): Promise<ContactSubmission[]> {
  const rows = getDb().prepare("SELECT * FROM contact_submissions ORDER BY submitted_at ASC").all() as Row[];
  return rows.map(fromRow);
}

export async function appendContactSubmission(record: ContactSubmission): Promise<void> {
  const db = getDb();
  db.prepare(`INSERT INTO contact_submissions
    (id, name, email, company, job_title, message, submitted_at, utm_source, utm_medium, utm_campaign, gclid)
    VALUES (@id, @name, @email, @company, @job_title, @message, @submitted_at, @utm_source, @utm_medium, @utm_campaign, @gclid)`).run({
    id: record.id, name: record.name, email: record.email,
    company: record.company ?? null, job_title: record.jobTitle ?? null,
    message: record.message ?? "", submitted_at: record.submittedAt,
    utm_source: record.utmSource ?? null, utm_medium: record.utmMedium ?? null,
    utm_campaign: record.utmCampaign ?? null, gclid: record.gclid ?? null,
  });

  const { c } = db.prepare("SELECT COUNT(*) AS c FROM contact_submissions").get() as { c: number };
  if (c > MAX_RECORDS) {
    db.prepare(
      "DELETE FROM contact_submissions WHERE rowid IN (SELECT rowid FROM contact_submissions ORDER BY submitted_at DESC LIMIT -1 OFFSET ?)"
    ).run(MAX_RECORDS);
  }
}

export async function deleteContactSubmission(id: string): Promise<void> {
  getDb().prepare("DELETE FROM contact_submissions WHERE id = ?").run(id);
}

export async function clearContactLog(): Promise<void> {
  getDb().prepare("DELETE FROM contact_submissions").run();
}
