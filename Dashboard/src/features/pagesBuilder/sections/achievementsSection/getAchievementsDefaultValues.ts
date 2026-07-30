import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const ACHIEVEMENTS_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,

  achievement_media: { ...MEDIA_INITIAL_STATE },
  description_en: "",
  description_ar: "",

  stat_1_number: "",
  stat_1_label_en: "",
  stat_1_label_ar: "",
  stat_2_number: "",
  stat_2_label_en: "",
  stat_2_label_ar: "",
  stat_3_number: "",
  stat_3_label_en: "",
  stat_3_label_ar: "",
  stat_4_number: "",
  stat_4_label_en: "",
  stat_4_label_ar: "",
};
