export interface Tag {
  slug: string;
  label: string;
  count: number;
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Aggregate tags from a list of posts into a Tag[] sorted by post count DESC
 * then slug ASC. First-seen casing wins as the display label per slug.
 */
export function aggregateTags(
  posts: Array<{ tags?: string[] | null }>
): Tag[] {
  const map = new Map<string, Tag>();
  for (const post of posts) {
    for (const raw of post.tags ?? []) {
      if (typeof raw !== "string" || raw.length === 0) continue;
      const slug = tagToSlug(raw);
      if (!slug) continue;
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { slug, label: raw, count: 1 });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.slug.localeCompare(b.slug);
  });
}
