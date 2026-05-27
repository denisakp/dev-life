export default defineEventHandler(async (event) => {
  const q = (getQuery(event).q as string | undefined)?.trim() ?? "";
  if (q.length < 4) return [];

  const articles = await queryCollection(event, "content")
    .select("path", "title", "description", "date", "tags")
    .order("date", "DESC")
    .limit(25)
    .all();

  const needle = q.toLowerCase();
  return articles.filter((a) => a.title?.toLowerCase().includes(needle));
});
