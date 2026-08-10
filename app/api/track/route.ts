import { NextRequest, NextResponse } from "next/server";
import { appendVisit, detectBrowser, detectDevice, type VisitRecord } from "@/lib/analytics-log";

const SESSION_RE = /^[0-9a-f-]{8,64}$/i;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as {
    path?: unknown; referrer?: unknown; sessionId?: unknown; type?: unknown; label?: unknown;
    utmSource?: unknown; utmMedium?: unknown; utmCampaign?: unknown; utmTerm?: unknown; utmContent?: unknown; gclid?: unknown;
  } | null;
  if (
    !b ||
    typeof b.path !== "string" || !b.path.startsWith("/") || b.path.length > 300 ||
    typeof b.sessionId !== "string" || !SESSION_RE.test(b.sessionId)
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const eventType = b.type === "cta_click" ? "cta_click" : "pageview";
  const str = (v: unknown, max = 150) => typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;

  const userAgent = request.headers.get("user-agent") || "";
  const record: VisitRecord = {
    id: crypto.randomUUID(),
    path: b.path.slice(0, 300),
    referrer: typeof b.referrer === "string" ? b.referrer.slice(0, 300) : undefined,
    sessionId: b.sessionId,
    device: detectDevice(userAgent),
    browser: detectBrowser(userAgent),
    visitedAt: new Date().toISOString(),
    eventType,
    eventLabel: eventType === "cta_click" && typeof b.label === "string" ? b.label.slice(0, 120) : undefined,
    utmSource: str(b.utmSource),
    utmMedium: str(b.utmMedium),
    utmCampaign: str(b.utmCampaign),
    utmTerm: str(b.utmTerm),
    utmContent: str(b.utmContent),
    gclid: str(b.gclid, 200),
  };

  try {
    await appendVisit(record);
  } catch (err) {
    console.error("Failed to log visit:", err);
    return NextResponse.json({ error: "Failed to store visit" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
