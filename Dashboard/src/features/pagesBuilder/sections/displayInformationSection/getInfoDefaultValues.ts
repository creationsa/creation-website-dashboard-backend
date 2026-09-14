import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { PROJECT_SOURCE_TYPES } from "@/shared/components/projectPickerField/projectPickerFieldSchema";
import { SOLUTION_SOURCE_TYPES } from "@/shared/components/solutionPickerField/solutionPickerFieldSchema";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const CARD_INITIAL_STATE = {
  left_source: SOLUTION_SOURCE_TYPES.CUSTOM,
  left_title_en: "",
  left_title_ar: "",
  left_desc_en: "",
  left_desc_ar: "",
  left_btn_slug: "",
  left_solution_id: null,
  left_btn_en: "",
  left_btn_ar: "",

  first_right_source: PROJECT_SOURCE_TYPES.CUSTOM,
  first_right_media: { ...MEDIA_INITIAL_STATE },
  first_right_card_title_en: "",
  first_right_card_title_ar: "",
  first_right_slug: "",
  first_right_project_id: null,
  first_right_project_media_field: null,
  first_right_card_desc_en: "",
  first_right_card_desc_ar: "",

  second_right_source: PROJECT_SOURCE_TYPES.CUSTOM,
  second_right_media: { ...MEDIA_INITIAL_STATE },
  second_right_card_title_en: "",
  second_right_card_title_ar: "",
  second_right_slug: "",
  second_right_project_id: null,
  second_right_project_media_field: null,
  second_right_card_desc_en: "",
  second_right_card_desc_ar: "",
};

export const DISPLAY_INFO_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  blocks: [CARD_INITIAL_STATE],
};
