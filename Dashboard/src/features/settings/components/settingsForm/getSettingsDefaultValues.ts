import type { SettingItem } from "../../types";
import type { SettingsFormValues } from "./settingsSchema";

const SETTINGS_INITIAL_STATE = {
  logo_en: "",
  logo_en_alt_en: "",
  logo_en_alt_ar: "",

  logo_ar: "",
  logo_ar_alt_en: "",
  logo_ar_alt_ar: "",

  instagram_title_en: "",
  instagram_title_ar: "",
  instagram_link: "",

  facebook_title_en: "",
  facebook_title_ar: "",
  facebook_link: "",

  behance_title_en: "",
  behance_title_ar: "",
  behance_link: "",

  linkedin_title_en: "",
  linkedin_title_ar: "",
  linkedin_link: "",
};

export default function getSettingsDefaultValues(
  settingsToEdit?: SettingItem,
): SettingsFormValues {
  if (!settingsToEdit) return SETTINGS_INITIAL_STATE;
  return {
    logo_en: settingsToEdit?.logo_en || "",
    logo_en_alt_en: settingsToEdit?.logo_en_alt_en || "",
    logo_en_alt_ar: settingsToEdit?.logo_en_alt_ar || "",

    logo_ar: settingsToEdit?.logo_ar || "",
    logo_ar_alt_en: settingsToEdit?.logo_ar_alt_en || "",
    logo_ar_alt_ar: settingsToEdit?.logo_ar_alt_ar || "",

    instagram_title_en: settingsToEdit?.instagram_title_en || "",
    instagram_title_ar: settingsToEdit?.instagram_title_ar || "",
    instagram_link: settingsToEdit?.instagram_link || "",

    facebook_title_en: settingsToEdit?.facebook_title_en || "",
    facebook_title_ar: settingsToEdit?.facebook_title_ar || "",
    facebook_link: settingsToEdit?.facebook_link || "",

    behance_title_en: settingsToEdit?.behance_title_en || "",
    behance_title_ar: settingsToEdit?.behance_title_ar || "",
    behance_link: settingsToEdit?.behance_link || "",

    linkedin_title_en: settingsToEdit?.linkedin_title_en || "",
    linkedin_title_ar: settingsToEdit?.linkedin_title_ar || "",
    linkedin_link: settingsToEdit?.linkedin_link || "",
  };
}
