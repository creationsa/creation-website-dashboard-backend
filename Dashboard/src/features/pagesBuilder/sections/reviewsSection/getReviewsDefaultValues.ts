import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";

export const REVIEW_ITEM_INITIAL_STATE = {
  logo_image: "",
  title_en: "",
  title_ar: "",
  description_en: "",
  description_ar: "",
  link_text_en: "",
  link_text_ar: "",
  link_url: "",
};

export const REVIEWS_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  description_en: "",
  description_ar: "",
  items: Array.from({ length: 2 }, () => ({ ...REVIEW_ITEM_INITIAL_STATE })),
};
