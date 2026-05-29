import { queryCollection } from "@nuxt/content/server";

const SITE_URL = "https://denisakp.me";
const SITE_TITLE = "Denis AKPAGNONITE";
const SITE_DESC = "Cloud-native, DevOps, SRE, et systèmes distribués.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string | Date | undefined): string {
  if (!date) return new Date(0).toUTCString();
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return new Date(0).toUTCString();
  return d.toUTCString();
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, "content")
    .where("path", "LIKE", "%.fr")
    .select("path", "title", "description", "date", "tags", "topics")
    .order("date", "DESC")
    .all();

  if (posts.length === 0) {
    throw createError({ statusCode: 404, statusMessage: "No French posts yet" });
  }

  const items = posts
    .map((p) => {
      const basePath = (p.path ?? "").replace(/\.fr$/, "");
      const link = `${SITE_URL}/fr/blog${basePath}`;
      const cats = [
        ...((p.tags as string[] | undefined) ?? []),
        ...((p.topics as string[] | undefined) ?? []),
      ]
        .map((c) => `    <category>${escapeXml(String(c))}</category>`)
        .join("\n");
      return `  <item>
    <title>${escapeXml(p.title ?? "")}</title>
    <link>${escapeXml(link)}</link>
    <guid isPermaLink="true">${escapeXml(link)}</guid>
    <pubDate>${rfc822(p.date as string | Date | undefined)}</pubDate>
    <description>${escapeXml(p.description ?? "")}</description>
${cats}
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(SITE_TITLE)}</title>
  <link>${SITE_URL}/fr/</link>
  <description>${escapeXml(SITE_DESC)}</description>
  <language>fr</language>
  <atom:link href="${SITE_URL}/fr/rss.xml" rel="self" type="application/rss+xml" />
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;

  setHeader(event, "Content-Type", "application/rss+xml; charset=utf-8");
  return xml;
});
