import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  readMediaManifest,
  writeMediaManifest,
  putMediaBlob,
  deleteMediaBlob,
  mediaUrl,
} from "@/lib/media-storage";
import {
  getPosts, getStudies, getPages, getBrands, getLeadership,
  getCustomPages, getColors, getSettings, getCookieBanner,
} from "@/lib/content";

async function countUsages(id: string): Promise<number> {
  const url = mediaUrl(id);
  const sources = await Promise.all([
    getPosts(), getStudies(), getPages(), getBrands(), getLeadership(),
    getCustomPages(), getColors(), getSettings(), getCookieBanner(),
  ]);
  const haystack = sources.map((s) => JSON.stringify(s)).join("\n");
  return haystack.split(url).length - 1;
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const manifest = await readMediaManifest();
  const idx = manifest.findIndex((m) => m.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const contentType = request.headers.get("content-type") || "";
  const record = { ...manifest[idx] };

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const file = form.get("file");
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      try {
        await putMediaBlob(record.blobKey, buffer, file.type || record.mimeType);
      } catch (err) {
        console.error("Media replace failed:", err);
        return NextResponse.json(
          { error: "Sostituzione file fallita", details: err instanceof Error ? err.message : String(err) },
          { status: 500 }
        );
      }
      record.mimeType = file.type || record.mimeType;
      record.filesize = file.size;
    }
    if (form.has("title")) record.title = String(form.get("title") || "");
    if (form.has("alt")) record.alt = String(form.get("alt") || "");
    if (form.has("caption")) record.caption = String(form.get("caption") || "");
    if (form.has("description")) record.description = String(form.get("description") || "");
  } else {
    const body = await request.json().catch(() => ({}));
    if (typeof body.title === "string") record.title = body.title;
    if (typeof body.alt === "string") record.alt = body.alt;
    if (typeof body.caption === "string") record.caption = body.caption;
    if (typeof body.description === "string") record.description = body.description;
  }

  record.updatedAt = new Date().toISOString();
  manifest[idx] = record;
  await writeMediaManifest(manifest);

  return NextResponse.json({ data: { ...record, url: mediaUrl(record.id) } });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const force = request.nextUrl.searchParams.get("force") === "true";
  const manifest = await readMediaManifest();
  const idx = manifest.findIndex((m) => m.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const usages = await countUsages(params.id);
  if (usages > 0 && !force) {
    return NextResponse.json(
      { error: "Asset in uso", usages, message: `Questo file è referenziato in ${usages} punto/i del sito. Conferma per eliminarlo comunque.` },
      { status: 409 }
    );
  }

  await deleteMediaBlob(manifest[idx].blobKey);
  manifest.splice(idx, 1);
  await writeMediaManifest(manifest);

  return NextResponse.json({ ok: true });
}
