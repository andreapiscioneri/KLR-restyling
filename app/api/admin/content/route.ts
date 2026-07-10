import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest, canWrite, getAdminUserFromRequestAsync, hashNewPassword } from "@/lib/admin-auth";
import { getStats, getBrands, getLeadership, getPages, getStudies, getPosts, getUsers, getColors, getSettings, getPositions, getCustomPages, getCookieBanner, writeJSON } from "@/lib/content";
import { VALID_CONTENT_TYPES } from "@/lib/content-types";

const VALID_TYPES: string[] = VALID_CONTENT_TYPES;

type RawUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  passwordSalt?: string;
  role: string;
};

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const loaders: Record<string, () => Promise<unknown>> = {
    stats:       getStats,
    brands:      getBrands,
    leadership:  getLeadership,
    pages:       getPages,
    studies:     getStudies,
    posts:       getPosts,
    users:       async () => ((await getUsers()) as RawUser[]).map(({ id, name, email, role, password, passwordHash }) => ({ id, name, email, role, hasPassword: Boolean(password || passwordHash) })),
    colors:      getColors,
    settings:    getSettings,
    positions:   getPositions,
    customPages: getCustomPages,
    cookieBanner: getCookieBanner,
  };
  const data = await loaders[type]?.();
  const response = NextResponse.json({ data });
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

  const user = await getAdminUserFromRequestAsync(request);
  const role = user?.role ?? "editor";
  if (!canWrite(role, type)) {
    return NextResponse.json({ error: "Forbidden: permessi insufficienti" }, { status: 403 });
  }

  let body = await request.json();

  if (type === "users") {
    const existingUsers = (await getUsers()) as RawUser[];
    body = (body as (RawUser & { hasPassword?: unknown })[]).map((raw) => {
      // hasPassword is a derived, display-only flag computed by the GET loader — never persist it.
      const { hasPassword: _hasPassword, ...u } = raw;
      const existing = existingUsers.find(e => e.id === u.id);
      if (u.password && u.password.length > 0) {
        const { passwordHash, passwordSalt } = hashNewPassword(u.password);
        const { password: _, ...rest } = u;
        return { ...rest, passwordHash, passwordSalt };
      }
      if (existing) {
        const { password: _, ...rest } = u;
        return {
          ...rest,
          ...(existing.passwordHash
            ? { passwordHash: existing.passwordHash, passwordSalt: existing.passwordSalt }
            : { password: existing.password }),
        };
      }
      return u;
    });
  }

  try {
    await writeJSON(`${type}.json`, body);
  } catch (err) {
    console.error("Failed to save admin content:", err);
    return NextResponse.json(
      { error: "Errore durante il salvataggio del contenuto", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }

  const pathsToRevalidate = [
    "/","/about","/services","/team","/brands","/work",
    "/blog","/10-years","/career","/contact","/privacy","/copyright","/geo",
  ];
  try {
    pathsToRevalidate.forEach(p => revalidatePath(p));
  } catch (err) {
    console.error("Failed to revalidate paths after admin save:", err);
  }

  return NextResponse.json({ ok: true });
}
