import { CommonTranslations, FooterTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export type FooterData = FooterTranslations;

export interface FooterStatementProps {
  footer: FooterData;
}

export interface CopyRightProps {
  footer: FooterData;
}

export interface FooterTitleProps {
  title: string;
}

export interface ProjectMenusProps {
  mainFooterTitle: string;
  trans: CommonTranslations;
  locale: LanguageType;
}

export interface SiteDescriptionProps {
  footer: FooterData;
  locale: LanguageType;
}

export interface TrustedPartnersProps {
  footer: FooterData;
}
