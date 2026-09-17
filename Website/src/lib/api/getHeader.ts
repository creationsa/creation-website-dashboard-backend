import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { LanguageType } from "@/i18n.config";

export interface HeaderMenuItem {
  key: string;
  href: string;
  label: string;
}

export interface HeaderData {
  logo: string | null;
  logo_alt: string;
  show_language_switch: boolean;
  show_theme_switch: boolean;
  menu_items: HeaderMenuItem[];
  copyright_items: HeaderMenuItem[];
}

export async function getHeader(locale: LanguageType): Promise<HeaderData> {
  return apiClient<HeaderData>(endpoints.header.root, locale, undefined, 3600);
}
