import { NextRequest, NextResponse } from "next/server";
import { getMediaBySourceUrl, mediaUrl } from "@/lib/media-storage";

/**
 * Risolve i vecchi URL delle immagini di WordPress.
 *
 * Gli 1100 file della libreria conservano il percorso che avevano su
 * klr-europe.com/wp-content/uploads/…: quegli indirizzi compaiono negli
 * articoli ripubblicati su altri siti e nelle anteprime social, e dopo
 * lo spostamento del dominio risponderebbero 404. Qui vengono
 * reindirizzati in modo permanente al media corrispondente.
 */
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: { params: { path: string[] } }) {
  const uploadPath = `/wp-content/uploads/${params.path.map(decodeURIComponent).join("/")}`;

  const record = getMediaBySourceUrl(uploadPath);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Location relativo invece di NextResponse.redirect(): dietro il
  // reverse proxy request.nextUrl.origin vale 127.0.0.1:3000, e il
  // browser verrebbe mandato su un indirizzo irraggiungibile. Un
  // riferimento relativo e' ammesso dalla RFC 7231 e non ha il problema.
  return new NextResponse(null, {
    status: 301,
    headers: {
      Location: mediaUrl(record.id),
      "Cache-Control": "public, max-age=86400",
    },
  });
}
