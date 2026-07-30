import { FaqTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface QuestionsProps {
  locale: LanguageType;
  faq: FaqTranslations;
  showCTA?: boolean;
}
