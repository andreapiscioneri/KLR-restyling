import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminRequest, canWrite, getAdminUserFromRequestAsync, hashNewPassword } from "@/lib/admin-auth";
import { getStats, getBrands, getLeadership, getPages, getStudies, getPosts, getUsers, getColors, getSettings, getPositions, getCustomPages, getCookieBanner, writeJSON } from "@/lib/content";
import { VALID_CONTENT_TYPES } from "@/lib/content-types";
import { logAdminCredential, syncAdminCredentialRoster } from "@/lib/admin-credentials-log";

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
        // Plaintext password only ever exists here, in this request body,
        // before being hashed below — this is the sole point where it can
        // be recorded to the local credentials log.
        logAdminCredential(u.name, u.email, u.role, u.password);
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
    syncAdminCredentialRoster((body as RawUser[]).map(u => ({ name: u.name, email: u.email, role: u.role })));
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

  try {
    // Root layout revalidation covers every route below it (Nav/Footer + all
    // static and dynamic pages), since content edits can affect shared layout
    // data (nav/footer) as well as any page, including /work/[id], /team/[id],
    // /brands/[id], /blog/[slug] and custom /[slug] pages.
    revalidatePath("/", "layout");
  } catch (err) {
    console.error("Failed to revalidate paths after admin save:", err);
  }

  return NextResponse.json({ ok: true });
}
