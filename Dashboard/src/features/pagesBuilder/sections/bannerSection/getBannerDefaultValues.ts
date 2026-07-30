import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const BANNER_INITIAL_STATE = {
  first_title_en: "",
  first_title_ar: "",

  second_title_en: "",
  second_title_ar: "",

  third_title_en: "",
  third_title_ar: "",

  left_media: { ...MEDIA_INITIAL_STATE },
  right_media: { ...MEDIA_INITIAL_STATE },
};
