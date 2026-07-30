import { LanguageType } from "@/i18n.config";

export interface NotFoundPageProps {
  title: string;
  description: string;
  backToHome: string;
  number: string;
  locale: LanguageType;
  hasSecondButton?: boolean;
  secondButtonTitle?: string;
  secondButtonHref?: string;
}
