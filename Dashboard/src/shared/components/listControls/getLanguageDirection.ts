import type { LanguageType } from "@/shared/hooks/useLanguage";

export function getLanguageDirection(language: LanguageType): "ltr" | "rtl" {
  return language === "ar" ? "rtl" : "ltr";
}
