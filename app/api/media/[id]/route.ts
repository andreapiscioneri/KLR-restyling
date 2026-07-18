import { NextRequest, NextResponse } from "next/server";
import { readMediaManifest, getMediaBlob } from "@/lib/media-storage";

// Netlify Blobs fetches large objects internally via signed S3 fetch() calls;
// Next.js's Data Cache tries to cache those and throws for anything over 2MB.
// We already set our own Cache-Control below, so disable Next's fetch cache here.
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const manifest = await readMediaManifest();
  const record = manifest.find((m) => m.id === params.id);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const blob = await getMediaBlob(record.blobKey);
  if (!blob) {
    return NextResponse.json({ error: "Blob not found" }, { status: 404 });
  }

  const etag = typeof blob.metadata?.etag === "string" ? blob.metadata.etag : `"${record.updatedAt}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, { status: 304 });
  }

  // HTTP header values must be Latin-1 (ByteString) — non-ASCII filenames
  // (accents, Cyrillic, mangled encodings) would otherwise throw and crash
  // the response entirely. ASCII-only fallback + RFC 5987 UTF-8 form.
  const asciiFilename = record.filename.replace(/[^\x20-\x7E]/g, "_");
  const encodedFilename = encodeURIComponent(record.filename);

  return new NextResponse(blob.data, {
    headers: {
      "Content-Type": record.mimeType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
      // Short max-age + must-revalidate so a replaced/edited asset shows up
      // quickly without a rebuild, while ETag still allows 304s in between.
      "Cache-Control": "public, max-age=300, must-revalidate",
      ETag: etag,
    },
  });
}
