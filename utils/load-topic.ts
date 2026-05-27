import topics from "~/data/topics";

export default function loadTopic(slug: string | undefined | null) {
  if (!slug) return undefined;
  return topics.find((el) => el.slug === slug.replace(/^\//, ""));
}
