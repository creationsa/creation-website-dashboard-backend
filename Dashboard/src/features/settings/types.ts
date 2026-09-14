import type { UseFormReturn } from "react-hook-form";
import type { SettingsFormValues } from "./components/settingsForm/settingsSchema";

export interface SettingSocialItem {
  id?: number;
  title_en: string;
  title_ar: string;
  link: string;
}

export interface SettingItem {
  logo_en: string;
  logo_en_alt_en: string;
  logo_en_alt_ar: string;

  logo_ar: string;
  logo_ar_alt_en: string;
  logo_ar_alt_ar: string;

  socials: SettingSocialItem[];
}

export interface SettingsFormProps {
  settings?: SettingItem;
}

export interface SectionProps {
  form: UseFormReturn<SettingsFormValues>;
  disabled: boolean;
}
