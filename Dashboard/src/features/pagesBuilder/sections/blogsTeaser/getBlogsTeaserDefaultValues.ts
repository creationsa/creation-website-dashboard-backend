import { BLOG_SOURCE_TYPES } from "@/shared/components/blogPickerField/blogPickerFieldSchema";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";
import type { BlogsTeaserFormValues } from "./blogsTeaserSchema";

export const TEASER_ITEM_INITIAL_STATE = {
  source: BLOG_SOURCE_TYPES.CUSTOM,
  feature_media: MEDIA_INITIAL_STATE,
  item_title_en: "",
  item_title_ar: "",
  item_slug_en: "",
};

export const BLOGS_TEASER_INITIAL_STATE: BlogsTeaserFormValues = {
  ...HEADER_INITIAL_STATE,
  button_title_en: "",
  button_title_ar: "",
  button_slug_en: "",
  items: [TEASER_ITEM_INITIAL_STATE],
};
