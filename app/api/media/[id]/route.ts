import { NextRequest, NextResponse } from "next/server";
import { getMediaRecord, getMediaBlob } from "@/lib/media-storage";

// I metadati arrivano da una SELECT su chiave primaria e il binario da
// una lettura su disco locale: niente più timeout, retry o workaround
// per la cache fetch di Next, che servivano solo perché il pool di
// connessioni di Netlify Blobs si bloccava sotto carico concorrente.
export const dynamic = "force-dynamic";

/**
 * Vero quando il vecchio URL punta ormai a questa stessa macchina.
 *
 * Il ripiego qui sotto manda al sito storico su klr-europe.com quando il
 * file non è presente in locale. Finché il dominio serve WordPress ha
 * senso, ma appena lo si punta al VPS quell'indirizzo siamo noi: la
 * richiesta finirebbe su app/wp-content/uploads/[...path], che risolve
 * il media e rimanda qui, che non trova il file e rimanda di nuovo là —
 * un ciclo infinito invece di una singola immagine mancante.
 *
 * Il difetto non si vede oggi (tutti gli 1121 record hanno il loro file)
 * e si presenterebbe solo dopo lo spostamento del dominio, cioè quando
 * nessuno lo starebbe cercando.
 */
function pointsAtUs(sourceUrl: string, request: NextRequest): boolean {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(sourceUrl).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

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
    if (record.sourceUrl && !pointsAtUs(record.sourceUrl, request)) {
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
