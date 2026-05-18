import { NextRequest, NextResponse } from "next/server";
import { getStats, getBrands, getLeadership, getStudies, getPosts, getPages, getPositions, getCustomPages } from "@/lib/content";

const VALID_TYPES = ["stats", "brands", "leadership", "studies", "posts", "pages", "positions", "customPages"];

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const loaders: Record<string, () => Promise<unknown>> = {
    stats:       getStats,
    brands:      getBrands,
    leadership:  getLeadership,
    studies:     getStudies,
    posts:       getPosts,
    pages:       getPages,
    positions:   getPositions,
    customPages: getCustomPages,
  };
  const data = await loaders[type]?.();
  return NextResponse.json({ data }, {
    headers: { "Cache-Control": "no-store" },
  });
}
