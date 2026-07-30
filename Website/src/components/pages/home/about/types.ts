import { AboutTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface AboutProps {
  locale: LanguageType;
  about: AboutTranslations;
}

export interface AboutHeadingProps {
  about: AboutTranslations;
}

export interface AboutStatsProps {
  about: AboutTranslations;
  locale: LanguageType;
}

export interface StatItemProps {
  value: string;
  label: string;
  about: AboutTranslations;
  locale: LanguageType;
}
