export function parseKeywords(keywords: string | null): string[] {
  if (!keywords) return [];

  return keywords
    .replace(/[{}"]/g, "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}
