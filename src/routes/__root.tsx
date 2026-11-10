import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/site";
import { CookieConsentExperience, ConsentProvider } from "@/components/cookie-consent";
import { content, resolveLanguage } from "@/lib/site-content";
import brandMark from "@/assets/brand-mark.svg?url&no-inline";
import brandIcon from "@/assets/brand-mark-32.png?url&no-inline";

// Set VITE_GOOGLE_SITE_VERIFICATION to the token Search Console gives for the
// "HTML tag" verification method (only needed when DNS verification is not possible).
const GOOGLE_SITE_VERIFICATION = import.meta.env["VITE_GOOGLE_SITE_VERIFICATION"]?.trim();

function NotFoundComponent() {
  const language = useRouterState({
    select: (state) => resolveLanguage(state.location.search.lang),
  });
  const copy = language === "pt" ? content.pt.notFound : content.en.notFound;

  return (
    <main className="not-found-page" id="main-content">
      <div className="not-found-content">
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <Link to="/" search={{ lang: language }} className="not-found-action">
          {copy.action}
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or return to the home page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  validateSearch: (search: Record<string, unknown>) => ({ lang: resolveLanguage(search["lang"]) }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Móveis Machado | Cozinhas e móveis por medida em Odivelas" },
      {
        name: "description",
        content:
          "Cozinhas, roupeiros e móveis por medida com fabrico próprio em Odivelas, Grande Lisboa.",
      },
      { name: "theme-color", content: "#364838" },
      ...(GOOGLE_SITE_VERIFICATION
        ? [{ name: "google-site-verification", content: GOOGLE_SITE_VERIFICATION }]
        : []),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: brandIcon, type: "image/png", sizes: "32x32" },
      { rel: "icon", href: brandMark, type: "image/svg+xml", sizes: "any" },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const language = useRouterState({
    select: (state) => resolveLanguage(state.location.search.lang),
  });

  return (
    <html lang={language === "pt" ? "pt-PT" : "en"}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const language = useRouterState({
    select: (state) => resolveLanguage(state.location.search.lang),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConsentProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <SiteHeader />
        <Outlet />
        <SiteFooter />
        <CookieConsentExperience lang={language} />
      </ConsentProvider>
    </QueryClientProvider>
  );
}
