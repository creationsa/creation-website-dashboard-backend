import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const CARD_INITIAL_STATE = {
  left_title_en: "",
  left_title_ar: "",
  left_desc_en: "",
  left_desc_ar: "",
  left_btn_en: "",
  left_btn_ar: "",

  first_right_media: { ...MEDIA_INITIAL_STATE },
  first_right_card_title_en: "",
  first_right_card_title_ar: "",
  first_right_card_desc_en: "",
  first_right_card_desc_ar: "",

  second_right_media: { ...MEDIA_INITIAL_STATE },
  second_right_card_title_en: "",
  second_right_card_title_ar: "",
  second_right_card_desc_en: "",
  second_right_card_desc_ar: "",
};

export const DISPLAY_INFO_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  blocks: [CARD_INITIAL_STATE],
};
