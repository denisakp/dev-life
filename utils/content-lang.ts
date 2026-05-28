export type Locale = "en" | "fr";

const FR_SUFFIX_RE = /\.fr$/;

export function pathLang(path: string | null | undefined): Locale {
  if (!path) return "en";
  return FR_SUFFIX_RE.test(path) ? "fr" : "en";
}

export function stripLangSuffix(path: string | null | undefined): string {
  if (!path) return "";
  return path.replace(FR_SUFFIX_RE, "");
}

export function siblingPath(path: string, target: Locale): string {
  const base = stripLangSuffix(path);
  return target === "fr" ? `${base}.fr` : base;
}
