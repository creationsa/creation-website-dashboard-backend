import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { TEXT_BLOCK_TYPES } from "./textListSchema";

export const POINT_INITIAL_STATE = {
  text_en: "",
  text_ar: "",
};

export const DESCRIPTION_BLOCK_INITIAL_STATE = {
  block_type: TEXT_BLOCK_TYPES.DESCRIPTION,
  description_en: "",
  description_ar: "",
};

export const LIST_BLOCK_INITIAL_STATE = {
  block_type: TEXT_BLOCK_TYPES.LIST,
  points: [POINT_INITIAL_STATE],
};

export const TEXT_ITEM_INITIAL_STATE = {
  header_en: "",
  header_ar: "",
  blocks: [DESCRIPTION_BLOCK_INITIAL_STATE],
};

export const TEXT_LIST_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  has_sticky_sidebar: false,
  sections_label_en: "",
  sections_label_ar: "",
  sticky_description_en: "",
  sticky_description_ar: "",
  items: [TEXT_ITEM_INITIAL_STATE],
};
