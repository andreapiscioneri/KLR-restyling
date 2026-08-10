import { readContent, writeContent } from "./storage";

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

const KEY = "jobApplications";
const MAX_RECORDS = 5000;

export async function readApplicationsLog(): Promise<JobApplication[]> {
  return readContent<JobApplication[]>(KEY, []);
}

export async function appendApplication(record: JobApplication): Promise<void> {
  const log = await readApplicationsLog();
  const next = [...log, record].slice(-MAX_RECORDS);
  await writeContent(KEY, next);
}

export async function deleteApplication(id: string): Promise<void> {
  const log = await readApplicationsLog();
  await writeContent(KEY, log.filter((r) => r.id !== id));
}

export async function clearApplicationsLog(): Promise<void> {
  await writeContent(KEY, []);
}
