import { LanguageType } from "@/i18n.config";
import { FooterData as FooterApiData, FooterBadge } from "@/lib/api/getFooter";
import { HeaderMenuItem } from "@/lib/api/getHeader";

export interface FooterStatementProps {
  data?: FooterApiData | null;
}

export interface CopyRightProps {
  locale: LanguageType;
  data?: FooterApiData | null;
}

export interface ProjectMenusProps {
  mainFooterTitle: string;
  locale: LanguageType;
  menuItems?: HeaderMenuItem[];
}

export interface SiteDescriptionProps {
  locale: LanguageType;
  data?: FooterApiData | null;
}

export interface TrustedPartnersProps {
  badges?: FooterBadge[];
}
