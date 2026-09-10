import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { queryMedia, countMedia, upsertMediaRecord, putMediaBlob, buildBlobKey, mediaUrl, type MediaRecord } from "@/lib/media-storage";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Il filtro è ora lato SQL invece di caricare tutti i record e
  // filtrarli in memoria.
  const filtered = queryMedia({
    q: request.nextUrl.searchParams.get("q")?.toLowerCase().trim() || undefined,
    type: request.nextUrl.searchParams.get("type") || undefined,
  });

  return NextResponse.json(
    { data: filtered.map((m) => ({ ...m, url: mediaUrl(m.id) })), total: countMedia() },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nessun file ricevuto" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const blobKey = buildBlobKey(id, file.name);
  const buffer = await file.arrayBuffer();

  try {
    await putMediaBlob(blobKey, buffer, file.type || "application/octet-stream");
  } catch (err) {
    console.error("Media upload failed:", err);
    return NextResponse.json(
      { error: "Upload fallito", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }

  const now = new Date().toISOString();
  const record: MediaRecord = {
    id,
    blobKey,
    filename: file.name,
    title: String(form.get("title") || file.name),
    alt: String(form.get("alt") || ""),
    caption: String(form.get("caption") || ""),
    description: String(form.get("description") || ""),
    mimeType: file.type || "application/octet-stream",
    filesize: file.size,
    uploadedAt: now,
    updatedAt: now,
  };

  upsertMediaRecord(record);

  return NextResponse.json({ data: { ...record, url: mediaUrl(record.id) } });
}
