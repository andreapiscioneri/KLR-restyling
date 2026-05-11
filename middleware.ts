import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "klr_admin_session";
const TOKEN = "klr-admin-v1-secure-token-2025";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get(COOKIE_NAME);
    if (!session || !session.value.startsWith(TOKEN)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
