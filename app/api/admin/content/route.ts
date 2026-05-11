import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest } from "@/lib/admin-auth";
import { getStats, getBrands, getLeadership, getPages, getStudies, getPosts, getUsers, getColors, getSettings, writeJSON } from "@/lib/content";

const VALID_TYPES = ["stats", "brands", "leadership", "pages", "studies", "posts", "users", "colors", "settings"];

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const loaders: Record<string, () => unknown> = {
    stats: getStats,
    brands: getBrands,
    leadership: getLeadership,
    pages: getPages,
    studies: getStudies,
    posts: getPosts,
    users: getUsers,
    colors: getColors,
    settings: getSettings,
  };
  const data = loaders[type]?.();
  const response = NextResponse.json({ data });
  // No caching for admin API
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return response;
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const body = await request.json();
  writeJSON(`${type}.json`, body);
  
  // Revalidate all pages that might use this data
  const pathsToRevalidate = [
    "/",
    "/about",
    "/services",
    "/team",
    "/brands",
    "/work",
    "/blog",
    "/10-years",
    "/career",
    "/contact",
    "/privacy",
    "/copyright",
    "/geo",
  ];
  
  pathsToRevalidate.forEach(path => revalidatePath(path));
  
  return NextResponse.json({ ok: true });
}
