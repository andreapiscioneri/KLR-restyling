import { getDb } from "./db";

export type JobApplication = {
  id: string;
  positionId: string;
  positionRole: string;
  name: string;
  email: string;
  message?: string;
  submittedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
};

const MAX_RECORDS = 5000;

type Row = {
  id: string; position_id: string; position_role: string; name: string; email: string;
  message: string | null; submitted_at: string;
  utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; gclid: string | null;
};

function fromRow(r: Row): JobApplication {
  const rec: JobApplication = {
    id: r.id, positionId: r.position_id, positionRole: r.position_role,
    name: r.name, email: r.email, submittedAt: r.submitted_at,
  };
  if (r.message) rec.message = r.message;
  if (r.utm_source) rec.utmSource = r.utm_source;
  if (r.utm_medium) rec.utmMedium = r.utm_medium;
  if (r.utm_campaign) rec.utmCampaign = r.utm_campaign;
  if (r.gclid) rec.gclid = r.gclid;
  return rec;
}

export async function readApplicationsLog(): Promise<JobApplication[]> {
  const rows = getDb().prepare("SELECT * FROM job_applications ORDER BY submitted_at ASC").all() as Row[];
  return rows.map(fromRow);
}

export async function appendApplication(record: JobApplication): Promise<void> {
  const db = getDb();
  db.prepare(`INSERT INTO job_applications
    (id, position_id, position_role, name, email, message, submitted_at, utm_source, utm_medium, utm_campaign, gclid)
    VALUES (@id, @position_id, @position_role, @name, @email, @message, @submitted_at, @utm_source, @utm_medium, @utm_campaign, @gclid)`).run({
    id: record.id, position_id: record.positionId, position_role: record.positionRole ?? "",
    name: record.name, email: record.email, message: record.message ?? null, submitted_at: record.submittedAt,
    utm_source: record.utmSource ?? null, utm_medium: record.utmMedium ?? null,
    utm_campaign: record.utmCampaign ?? null, gclid: record.gclid ?? null,
  });

  const { c } = db.prepare("SELECT COUNT(*) AS c FROM job_applications").get() as { c: number };
  if (c > MAX_RECORDS) {
    db.prepare(
      "DELETE FROM job_applications WHERE rowid IN (SELECT rowid FROM job_applications ORDER BY submitted_at DESC LIMIT -1 OFFSET ?)"
    ).run(MAX_RECORDS);
  }
}

export async function deleteApplication(id: string): Promise<void> {
  getDb().prepare("DELETE FROM job_applications WHERE id = ?").run(id);
}

export async function clearApplicationsLog(): Promise<void> {
  getDb().prepare("DELETE FROM job_applications").run();
}
