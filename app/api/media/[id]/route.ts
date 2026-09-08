import { NextRequest, NextResponse } from "next/server";
import { getMediaRecord, getMediaBlob } from "@/lib/media-storage";

// I metadati arrivano da una SELECT su chiave primaria e il binario da
// una lettura su disco locale: niente più timeout, retry o workaround
// per la cache fetch di Next, che servivano solo perché il pool di
// connessioni di Netlify Blobs si bloccava sotto carico concorrente.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const record = getMediaRecord(params.id);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const blob = await getMediaBlob(record.blobKey);
  if (!blob) {
    // I media migrati da WordPress conservano l'URL originale: se il file
    // non è ancora stato sincronizzato su questa macchina, meglio un
    // redirect che un'immagine rotta.
    if (record.sourceUrl) {
      return NextResponse.redirect(record.sourceUrl, { status: 307, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.json({ error: "File non trovato" }, { status: 404 });
  }

  const etag = typeof blob.metadata?.etag === "string" ? blob.metadata.etag : `"${record.updatedAt}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, { status: 304 });
  }

  // Gli header HTTP sono ByteString: un nome file con accenti o
  // cirillico farebbe fallire l'intera risposta. Fallback ASCII più
  // forma RFC 5987 per i client che la supportano.
  const asciiFilename = record.filename.replace(/[^\x20-\x7E]/g, "_");
  const encodedFilename = encodeURIComponent(record.filename);

  return new NextResponse(new Uint8Array(blob.data), {
    headers: {
      "Content-Type": record.mimeType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
      "Cache-Control": "public, max-age=300, must-revalidate",
      ETag: etag,
    },
  });
}
