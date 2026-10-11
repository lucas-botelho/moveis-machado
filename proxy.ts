import { NextResponse, type NextRequest } from "next/server";
import projectData from "./src/content/projects.json";
import { resolvePage } from "./src/i18n/routes.mjs";
import { getMessages } from "./src/i18n";
import type { PortfolioProject } from "./src/content";
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/")
    return NextResponse.redirect(new URL("/pt", request.url), 308);
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] === "en" ? "en" : "pt";
  if (
    !resolvePage(
      segments[0],
      segments.slice(1),
      projectData as PortfolioProject[],
    )
  ) {
    const m = getMessages(locale).common;
    // Render unknown paths directly. This avoids a cold notFound boundary delay
    // in the hosted adapter and keeps 404s fast, localized and script-free.
    const html = `<!doctype html><html lang="${locale === "pt" ? "pt-PT" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${m.notFound} | Móveis Machado</title><style>body{margin:0;background:#f7f5ef;color:#2c302b;font:16px/1.8 Arial,sans-serif}main{max-width:850px;padding:15vh 7%}h1{font:400 clamp(42px,6vw,76px)/1.1 Georgia,serif;letter-spacing:-.04em}p{color:#5e6057}small{letter-spacing:.15em;color:#705840}a{display:inline-block;background:#705840;color:white;text-decoration:none;padding:14px 28px;margin-top:24px}a:focus-visible{outline:3px solid #705840;outline-offset:5px}</style></head><body><main><small>MÓVEIS MACHADO · 404</small><h1>${m.notFound}</h1><p>${m.notFoundText}</p><a href="/${locale}">${m.home} ↗</a></main></body></html>`;
    return new NextResponse(html, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
  const h = new Headers(request.headers);
  h.set(
    "x-site-locale",
    request.nextUrl.pathname.split("/")[1] === "en" ? "en" : "pt",
  );
  return NextResponse.next({ request: { headers: h } });
}
export const config = {
  matcher: ["/((?!api|_next|images|favicon|robots|sitemap).*)"],
};
