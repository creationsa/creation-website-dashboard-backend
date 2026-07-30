import { useTranslation } from "react-i18next";

export type LanguageType = "ar" | "en";

export function useLanguage(): LanguageType {
  const { i18n } = useTranslation();

  return i18n.language === "ar" ? "ar" : "en";
}
