export default function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-en", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        timeZone: "utc",
    });
}
