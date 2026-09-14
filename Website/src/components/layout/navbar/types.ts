import { NavTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { HeaderMenuItem } from "@/lib/api/getHeader";

export interface DesktopNavLinksProps {
  locale: LanguageType;
  menuItems?: HeaderMenuItem[];
}

export interface NavLinksProps {
  locale: LanguageType;
  logoUrl?: string | null;
  logoAlt?: string;
  menuItems?: HeaderMenuItem[];
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
