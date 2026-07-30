import { ACCORDION_ITEM_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const LIST_ITEM_INITIAL_STATE = {
  text_en: "",
  text_ar: "",
};

export const MEDIA_CONTENT_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  is_media_right: true,
  content_type: "description",
  description_en: "",
  description_ar: "",
  accordion_items: [ACCORDION_ITEM_INITIAL_STATE],
  list_items: [LIST_ITEM_INITIAL_STATE],
  media: { ...MEDIA_INITIAL_STATE },
};
