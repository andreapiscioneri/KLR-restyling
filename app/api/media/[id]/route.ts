import { NextRequest, NextResponse } from "next/server";
import { readMediaManifest, getMediaBlob } from "@/lib/media-storage";
import { withRetry } from "@/lib/with-retry";

// Netlify Blobs fetches large objects internally via signed S3 fetch() calls;
// Next.js's Data Cache tries to cache those and throws for anything over 2MB.
// We already set our own Cache-Control below, so disable Next's fetch cache here.
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

// Netlify Blobs' connection pool occasionally stalls under concurrent load
// (a case-study page fires a dozen of these at once) and undici's connect
// timeout only fires after ~10s. Racing a short local timeout lets us fail
// fast and fall back instead of leaving the browser hanging on a 500.
const BLOB_FETCH_TIMEOUT_MS = 6000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Blob fetch timed out")), ms);
    promise.then((v) => { clearTimeout(timer); resolve(v); }, (e) => { clearTimeout(timer); reject(e); });
  });
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let manifest;
  try {
    // One quick retry: the connection-pool stall this races against is
    // usually per-connection, so a fresh attempt often succeeds even when
    // the first one times out — much cheaper than surfacing a broken image.
    manifest = await withRetry(() => withTimeout(readMediaManifest(), BLOB_FETCH_TIMEOUT_MS), 2, [200]);
  } catch (err) {
    console.error(`Media manifest read failed for ${params.id}:`, err);
    return NextResponse.json({ error: "Storage temporarily unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const record = manifest.find((m) => m.id === params.id);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Migrated WordPress media keeps its original CDN URL as `sourceUrl`. If
  // the blob store errors, times out, or genuinely doesn't have the file
  // yet, redirect there instead of surfacing a broken image — no-store so
  // the next request retries the (usually working) blob store fresh.
  let blob;
  try {
    blob = await withRetry(() => withTimeout(getMediaBlob(record.blobKey), BLOB_FETCH_TIMEOUT_MS), 2, [200]);
  } catch (err) {
    console.error(`Media blob fetch failed for ${params.id} (${record.blobKey}):`, err);
    if (record.sourceUrl) {
      return NextResponse.redirect(record.sourceUrl, { status: 307, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.json({ error: "Storage temporarily unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  if (!blob) {
    if (record.sourceUrl) {
      return NextResponse.redirect(record.sourceUrl, { status: 307, headers: { "Cache-Control": "no-store" } });
    }
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
