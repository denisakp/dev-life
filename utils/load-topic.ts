import technos from "~/data/technos";

export default function loadTopic (slug: string) {
    let data ;
    technos.map(element => {
        return element.techs.find(item => {
            if (item.slug === slug.replace('/', '')) {
                data = item;
            }
        })
    })
    return data
}
