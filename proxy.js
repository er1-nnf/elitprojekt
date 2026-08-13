import { NextResponse } from "next/server";
import { URL_LOCALES, DEFAULT_LOCALE } from "./lib/locales";

function detectLocale(request) {
  const cookie = request.cookies.get("locale")?.value;
  if (cookie && URL_LOCALES.includes(cookie)) return cookie;

  const accept = request.headers.get("accept-language") || "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0].trim().toLowerCase();
    if (code.startsWith("hr")) return "hr";
    if (code.startsWith("en")) return "en";
  }
  return DEFAULT_LOCALE;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const hasLocale = URL_LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip static files, Next internals and API routes.
  matcher: ["/((?!_next|api|video|favicon|.*\\..*).*)"],
};
