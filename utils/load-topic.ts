import techno from "~/data/technos";

export default function loadTopic(slug: string) {
  let data;
  techno.map((element) => {
    return element.techs.find((item) => {
      if (item.slug === slug.replace("/", "")) {
        data = item;
      }
    });
  });
  return data;
}
