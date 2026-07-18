import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { readMediaManifest, writeMediaManifest, putMediaBlob, mediaUrl, type MediaRecord } from "@/lib/media-storage";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const manifest = await readMediaManifest();
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();
  const type = request.nextUrl.searchParams.get("type");

  let filtered = manifest;
  if (type && type !== "all") {
    filtered = filtered.filter((m) => m.mimeType.startsWith(type));
  }
  if (q) {
    filtered = filtered.filter((m) =>
      [m.filename, m.title, m.alt, m.caption, m.description].some((f) => f?.toLowerCase().includes(q))
    );
  }
  filtered = [...filtered].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return NextResponse.json(
    { data: filtered.map((m) => ({ ...m, url: mediaUrl(m.id) })), total: manifest.length },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nessun file ricevuto" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "";
  const blobKey = `${id}${ext ? `.${ext}` : ""}`;
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

  const manifest = await readMediaManifest();
  manifest.push(record);
  await writeMediaManifest(manifest);

  return NextResponse.json({ data: { ...record, url: mediaUrl(record.id) } });
}
