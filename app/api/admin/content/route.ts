import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { canWrite, hashNewPassword } from "@/lib/admin-auth";
import { isAdminRequest, getAdminSessionUser } from "@/lib/admin-session";
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
  passwordIterations?: number;
  role: string;
};

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) {
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
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const type = request.nextUrl.searchParams.get("type");
  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const user = await getAdminSessionUser();
  const role = user?.role ?? "editor";
  if (!canWrite(role, type)) {
    return NextResponse.json({ error: "Forbidden: permessi insufficienti" }, { status: 403 });
  }

  let body = await request.json();

  if (type === "users") {
    const existingUsers = (await getUsers()) as RawUser[];
    const incoming = body as (RawUser & { hasPassword?: unknown })[];
    const next: RawUser[] = [];

    for (const raw of incoming) {
      // hasPassword è un flag derivato calcolato dalla GET per la sola
      // visualizzazione: non va mai persistito.
      const { hasPassword: _hasPassword, ...u } = raw;
      const existing = existingUsers.find((e) => e.id === u.id);

      if (u.password && u.password.length > 0) {
        // La password in chiaro esiste solo qui, nel corpo di questa
        // richiesta, e viene subito sostituita dal suo hash. Non viene
        // più scritta su alcun file di log.
        const fresh = await hashNewPassword(u.password);
        const { password: _plain, ...rest } = u;
        next.push({ ...rest, ...fresh });
        continue;
      }

      if (existing) {
        // Nessuna nuova password: si conservano le credenziali esistenti,
        // incluso il numero di iterazioni con cui erano state generate.
        const { password: _plain, ...rest } = u;
        next.push({
          ...rest,
          ...(existing.passwordHash
            ? {
                passwordHash: existing.passwordHash,
                passwordSalt: existing.passwordSalt,
                passwordIterations: existing.passwordIterations,
              }
            : { password: existing.password }),
        });
        continue;
      }

      next.push(u);
    }

    body = next;
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
