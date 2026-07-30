import { headers } from "next/headers";
import { i18n, Locale } from "@/i18n.config";

export async function getCurrentLocale(): Promise<Locale> {
  const url = (await headers()).get("x-url");
  if (!url) return i18n.defaultLocale;

  const segments = new URL(url).pathname.split("/").filter(Boolean);
  const potentialLocale = segments[0] as Locale;

  return i18n.locales.includes(potentialLocale)
    ? potentialLocale
    : i18n.defaultLocale;
}
