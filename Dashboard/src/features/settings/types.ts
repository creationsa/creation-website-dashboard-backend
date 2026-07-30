import type { UseFormReturn } from "react-hook-form";
import type { SettingsFormValues } from "./components/settingsForm/settingsSchema";

export interface SettingItem {
  logo_en: string;
  logo_en_alt_en: string;
  logo_en_alt_ar: string;

  logo_ar: string;
  logo_ar_alt_en: string;
  logo_ar_alt_ar: string;

  instagram_title_en: string;
  instagram_title_ar: string;
  instagram_link: string;

  facebook_title_en: string;
  facebook_title_ar: string;
  facebook_link: string;

  behance_title_en: string;
  behance_title_ar: string;
  behance_link: string;

  linkedin_title_en: string;
  linkedin_title_ar: string;
  linkedin_link: string;
}

export interface SettingsFormProps {
  settings?: SettingItem;
}

export interface SectionProps {
  form: UseFormReturn<SettingsFormValues>;
  disabled: boolean;
}
