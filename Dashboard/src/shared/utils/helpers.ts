/*
 * accept a date string and a locale, and return the formatted date string according to the locale.
 */
export function formatDate(dateStr: string, locale: string): string {
  const normalized = dateStr
    .replace(" ", "T")
    .replace(/(AM|PM)$/, "")
    .trim();
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return dateStr; // safe fallback

  return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
