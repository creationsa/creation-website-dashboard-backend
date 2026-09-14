import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const ADVANCED_OVERVIEW_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  upper_description_en: "",
  upper_description_ar: "",

  lower_description_en: "",
  lower_description_ar: "",

  overlay_label_number: "",
  overlay_label_title_en: "",
  overlay_label_title_ar: "",

  stat1_number_en: "",
  stat1_number_ar: "",
  stat1_label_en: "",
  stat1_label_ar: "",

  stat2_number_en: "",
  stat2_number_ar: "",
  stat2_label_en: "",
  stat2_label_ar: "",

  stat3_number_en: "",
  stat3_number_ar: "",
  stat3_label_en: "",
  stat3_label_ar: "",

  stat4_number_en: "",
  stat4_number_ar: "",
  stat4_label_en: "",
  stat4_label_ar: "",

  based_advanced_overview_media: { ...MEDIA_INITIAL_STATE },
};
