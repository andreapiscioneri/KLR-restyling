import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAdminRequest } from "@/lib/admin-auth";
import { getFirebaseBucket } from "@/lib/firebase-admin";

const VALID_TYPES: Record<string, string> = {
  "image/jpeg":   "jpg",
  "image/jpg":    "jpg",
  "image/png":    "png",
  "image/gif":    "gif",
  "image/webp":   "webp",
  "image/svg+xml":"svg",
};

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
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

  const ext = VALID_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Tipo file non supportato. Usa JPG, PNG, GIF, WebP o SVG." }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File troppo grande. Massimo 10MB." }, { status: 400 });
  }

  let bucket;
  try {
    bucket = getFirebaseBucket();
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer      = Buffer.from(arrayBuffer);
  const fileName    = `klr-cms/${randomUUID()}.${ext}`;
  const fileRef     = bucket.file(fileName);

  try {
    await fileRef.save(buffer, {
      contentType: file.type,
      metadata: { cacheControl: "public, max-age=31536000" },
    });
    await fileRef.makePublic();

    const bucketName = bucket.name;
    const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return NextResponse.json({ url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload fallito";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
