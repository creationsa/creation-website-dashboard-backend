import { Languages } from "@/constants/enums";
import { LanguageType } from "@/i18n.config";

const LOCALE_MAP: Record<LanguageType, string> = {
  [Languages.ARABIC]: "ar-SA",
  [Languages.ENGLISH]: "en-US",
};

export function formatDate(date: string, locale: LanguageType): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
