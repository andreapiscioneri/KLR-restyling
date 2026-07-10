import { NextRequest, NextResponse } from "next/server";
import { appendConsentRecord, type StoredConsentRecord } from "@/lib/consent-log";

const LEVELS = new Set(["silver", "gold", "platinum", "custom"]);
const DURATIONS = new Set(["1m", "6m", "12m"]);
const UUID_RE = /^[0-9a-f-]{8,64}$/i;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Partial<StoredConsentRecord> | null;
  if (
    !b ||
    typeof b.id !== "string" || !UUID_RE.test(b.id) ||
    typeof b.level !== "string" || !LEVELS.has(b.level) ||
    typeof b.duration !== "string" || !DURATIONS.has(b.duration) ||
    typeof b.consentedAt !== "string" || Number.isNaN(Date.parse(b.consentedAt)) ||
    typeof b.expiresAt !== "string" || Number.isNaN(Date.parse(b.expiresAt)) ||
    typeof b.categories !== "object" || b.categories === null
  ) {
    return NextResponse.json({ error: "Invalid consent record" }, { status: 400 });
  }

  const categories = b.categories as Record<string, unknown>;
  const record: StoredConsentRecord = {
    id: b.id,
    level: b.level as StoredConsentRecord["level"],
    duration: b.duration as StoredConsentRecord["duration"],
    categories: {
      basic: Boolean(categories.basic),
      content: Boolean(categories.content),
      optimization: Boolean(categories.optimization),
      ads: Boolean(categories.ads),
    },
    consentedAt: b.consentedAt,
    expiresAt: b.expiresAt,
    path: typeof b.path === "string" ? b.path.slice(0, 200) : undefined,
    userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? undefined,
    loggedAt: new Date().toISOString(),
  };

  try {
    await appendConsentRecord(record);
  } catch (err) {
    console.error("Failed to log consent record:", err);
    return NextResponse.json({ error: "Failed to store consent" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
