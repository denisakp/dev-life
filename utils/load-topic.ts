import techno from "~/data/technos";
import topics from "~/data/topics";

export default function loadTopic(slug: string) {
  let data;
  topics.map((el) => {
    if (el.slug === slug.replace("/", "")) {
      data = el;
    }
  });
  return data;
}
