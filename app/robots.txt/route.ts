import { business } from "@/src/content/business";
export function GET() {
  return new Response(
    business.indexable
      ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nUser-agent: OAI-SearchBot\nAllow: /\nDisallow: /api/\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: ${business.origin}/sitemap.xml\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
