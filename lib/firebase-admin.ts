import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

type ServiceAccountJson = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

function getFirebaseAdmin() {
  if (getApps().length > 0) return getApps()[0];

  const storageBucket  = process.env.FIREBASE_STORAGE_BUCKET;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  const parsedServiceAccount = serviceAccountJson
    ? JSON.parse(serviceAccountJson) as ServiceAccountJson
    : null;

  const serviceAccount: ServiceAccount | null = parsedServiceAccount
    ? {
        projectId: parsedServiceAccount.project_id ?? "",
        clientEmail: parsedServiceAccount.client_email ?? "",
        privateKey: (parsedServiceAccount.private_key ?? "").replace(/\\n/g, "\n"),
      }
    : projectId && clientEmail && privateKey
      ? {
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }
      : null;

  if (!serviceAccount || !storageBucket) {
    throw new Error("Firebase non configurato. Aggiungi FIREBASE_STORAGE_BUCKET e FIREBASE_SERVICE_ACCOUNT oppure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY nelle variabili d'ambiente.");
  }

  return initializeApp({
    credential: cert(serviceAccount),
    storageBucket,
  });
}

export function getFirebaseBucket() {
  const app = getFirebaseAdmin();
  return getStorage(app).bucket();
}
