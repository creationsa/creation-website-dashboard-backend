import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { LanguageType } from "@/i18n.config";
import { HeaderMenuItem } from "./getHeader";

export interface FooterSocialItem {
  title: string;
  link: string;
}

export interface FooterBadge {
  label: string;
  link: string;
  image: string;
}

export interface FooterData {
  logo: string | null;
  logo_alt: string;
  statement_image: string;
  statement_desc: string;
  statement_image_alt: string;
  description: string;
  tagline: string;
  menu_title: string;
  social_title: string;
  copyright_text: string;
  menu_items: HeaderMenuItem[];
  copyright_items: HeaderMenuItem[];
  social_items: FooterSocialItem[];
  badges: FooterBadge[];
}

export async function getFooter(locale: LanguageType): Promise<FooterData> {
  return apiClient<FooterData>(endpoints.footer.root, locale, undefined, 3600);
}
