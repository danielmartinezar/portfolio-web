import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGUAGES = ["en", "es"];
const DEFAULT_LANGUAGE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a supported language
  const firstSegment = pathname.split("/")[1];
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Redirect to default language prefix
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${DEFAULT_LANGUAGE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
