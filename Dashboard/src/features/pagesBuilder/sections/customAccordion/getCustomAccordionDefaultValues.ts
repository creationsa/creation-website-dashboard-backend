import { ACCORDION_ITEMS_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";
import { CUSTOM_ACCORDION_TYPES } from "./customAccordionSchema";

export const CUSTOM_ACCORDION_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  layout_type: CUSTOM_ACCORDION_TYPES.WITH_BUTTON,
  action_button_text_en: "",
  action_button_text_ar: "",
  action_button_slug: "",
  banner_media: { ...MEDIA_INITIAL_STATE },
  ...ACCORDION_ITEMS_INITIAL_STATE,
};
