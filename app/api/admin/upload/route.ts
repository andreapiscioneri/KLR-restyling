import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { upsertMediaRecord, putMediaBlob, buildBlobKey, mediaUrl, type MediaRecord } from "@/lib/media-storage";

const VALID_TYPES = new Set([
  "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/avif", "image/heic",
  "video/mp4", "video/quicktime", "video/webm",
  "application/pdf",
]);

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Nessun file fornito" }, { status: 400 });
  }

  if (!VALID_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Tipo file non supportato. Usa immagini, video (mp4/mov/webm) o PDF." }, { status: 400 });
  }

  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json({ error: "File troppo grande. Massimo 50MB dall'interfaccia admin (per file più grandi usa lo script di migrazione)." }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const blobKey = buildBlobKey(id, file.name);
  const buffer = await file.arrayBuffer();

  try {
    await putMediaBlob(blobKey, buffer, file.type);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload fallito";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const now = new Date().toISOString();
  const record: MediaRecord = {
    id,
    blobKey,
    filename: file.name,
    title: file.name,
    alt: "",
    caption: "",
    description: "",
    mimeType: file.type,
    filesize: file.size,
    uploadedAt: now,
    updatedAt: now,
  };

  upsertMediaRecord(record);

  return NextResponse.json({ url: mediaUrl(id) });
}
