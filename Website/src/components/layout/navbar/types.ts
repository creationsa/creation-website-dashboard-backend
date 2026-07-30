import { NavTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface DesktopNavLinksProps {
  locale: LanguageType;
  nav: NavTranslations;
}

export interface NavLinksProps {
  locale: LanguageType;
  nav: NavTranslations;
}

export interface LanguageSwitcherProps {
  nav: NavTranslations;
}

export interface NavLinkItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}
