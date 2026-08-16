// Draft-aware content querying.
//
// Articles with `draft: true` in their frontmatter are hidden from every
// public surface (blog list, topics, related, prev/next, RSS, sitemap) and
// return 404 on direct access, but only in production. During `pnpm dev`
// drafts stay fully visible so they can be previewed locally.
//
// Usage: wrap a queryCollection() builder before the terminal call, e.g.
//   publishedOnly(queryCollection("content").where("path", ...)).all()
export function publishedOnly<T extends { where: (...args: any[]) => T }>(
  query: T
): T {
  return import.meta.dev ? query : query.where("draft", "<>", true);
}

// True when a fetched article must be treated as not-found for the current
// build. Use in the [...slug] page to 404 a draft on direct URL access.
export function isHiddenDraft(article: { draft?: boolean } | null | undefined) {
  return !import.meta.dev && !!article?.draft;
}
