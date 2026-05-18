import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest, canWrite, getAdminUserFromRequestAsync, hashNewPassword } from "@/lib/admin-auth";
import { getStats, getBrands, getLeadership, getPages, getStudies, getPosts, getUsers, getColors, getSettings, getPositions, getCustomPages, writeJSON } from "@/lib/content";

const VALID_TYPES = ["stats","brands","leadership","pages","studies","posts","users","colors","settings","positions","customPages"];

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
    users:       async () => ((await getUsers()) as RawUser[]).map(({ id, name, email, role }) => ({ id, name, email, role })),
    colors:      getColors,
    settings:    getSettings,
    positions:   getPositions,
    customPages: getCustomPages,
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
    body = (body as RawUser[]).map((u: RawUser) => {
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

  await writeJSON(`${type}.json`, body);

  const pathsToRevalidate = [
    "/","/about","/services","/team","/brands","/work",
    "/blog","/10-years","/career","/contact","/privacy","/copyright","/geo",
  ];
  pathsToRevalidate.forEach(p => revalidatePath(p));

  return NextResponse.json({ ok: true });
}
