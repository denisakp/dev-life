type DateLocale = "en-US" | "fr-FR";

const formatters: Record<DateLocale, Intl.DateTimeFormat> = {
  "en-US": new Intl.DateTimeFormat("en-US", { dateStyle: "long" }),
  "fr-FR": new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }),
};

export function formatDate(
  input: Date | string | null | undefined,
  locale: DateLocale = "en-US"
): string {
  if (!input) return "";
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return (formatters[locale] ?? formatters["en-US"]).format(d);
}

export function dateLocaleFor(locale: string | undefined): DateLocale {
  return locale === "fr" ? "fr-FR" : "en-US";
}
