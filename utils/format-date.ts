const fmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export function formatDate(input: Date | string | null | undefined): string {
  if (!input) return "";
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return fmt.format(d);
}
