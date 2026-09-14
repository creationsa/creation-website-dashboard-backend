import type { SettingItem } from "../../types";
import type { SettingsFormValues } from "./settingsSchema";

export const SOCIAL_ITEM_INITIAL_STATE = {
  title_en: "",
  title_ar: "",
  link: "",
};

const SETTINGS_INITIAL_STATE: SettingsFormValues = {
  logo_en: "",
  logo_en_alt_en: "",
  logo_en_alt_ar: "",

  logo_ar: "",
  logo_ar_alt_en: "",
  logo_ar_alt_ar: "",

  socials: [{ ...SOCIAL_ITEM_INITIAL_STATE }],
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

    socials: settingsToEdit.socials?.length
      ? settingsToEdit.socials
      : [{ ...SOCIAL_ITEM_INITIAL_STATE }],
  };
}
