import { NextRequest, NextResponse } from "next/server";
import { getStats, getBrands, getLeadership, getStudies, getPosts, getPages } from "@/lib/content";

const VALID_TYPES = ["stats", "brands", "leadership", "studies", "posts", "pages"];

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const loaders: Record<string, () => unknown> = {
    stats: getStats,
    brands: getBrands,
    leadership: getLeadership,
    studies: getStudies,
    posts: getPosts,
    pages: getPages,
  };
  const data = loaders[type]?.();
  return NextResponse.json({ data }, {
    headers: { "Cache-Control": "no-store" },
  });
}
