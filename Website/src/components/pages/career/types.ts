import { CareerTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface CurrentOpeningsProps {
  locale: LanguageType;
  career: CareerTranslations;
}
