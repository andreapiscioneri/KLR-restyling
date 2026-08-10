import { readContent, writeContent } from "./storage";

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

const KEY = "contactSubmissions";
const MAX_RECORDS = 5000;

export async function readContactLog(): Promise<ContactSubmission[]> {
  return readContent<ContactSubmission[]>(KEY, []);
}

export async function appendContactSubmission(record: ContactSubmission): Promise<void> {
  const log = await readContactLog();
  const next = [...log, record].slice(-MAX_RECORDS);
  await writeContent(KEY, next);
}

export async function deleteContactSubmission(id: string): Promise<void> {
  const log = await readContactLog();
  await writeContent(KEY, log.filter((r) => r.id !== id));
}

export async function clearContactLog(): Promise<void> {
  await writeContent(KEY, []);
}
