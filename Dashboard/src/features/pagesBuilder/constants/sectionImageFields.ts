import { SECTION_TYPES } from "./sectionTypes";

export const SECTION_IMAGE_FIELDS: Record<string, string[]> = {
  [SECTION_TYPES.BANNER]: ["left_media", "right_media"],
  [SECTION_TYPES.ACHIEVEMENTS]: ["achievement_media"],
  [SECTION_TYPES.CULTURE_IDENTITY]: ["culture_media"],
  [SECTION_TYPES.DISPLAY_INFO]: [
    "blocks.*.first_right_media",
    "blocks.*.second_right_media",
  ],
  [SECTION_TYPES.FEATURED_WORKS]: ["items.*.feature_media"],
  [SECTION_TYPES.MEDIA_CONTENT]: ["media"],
  [SECTION_TYPES.NEWS_TICKER]: [],
  [SECTION_TYPES.ADVANCED_OVERVIEW]: ["based_advanced_overview_media"],
  [SECTION_TYPES.CUSTOM_ACCORDION]: ["banner_media"],
  [SECTION_TYPES.CTA_BANNER]: [],
  [SECTION_TYPES.HEADER]: [],
  [SECTION_TYPES.LOGOS]: ["logos.*.logo_image"],
  [SECTION_TYPES.REVIEWS]: ["items.*.logo_image"],
  [SECTION_TYPES.BLOGS_TEASER]: ["items.*.feature_media"],
  [SECTION_TYPES.CONTACT]: [],
  [SECTION_TYPES.TEXT_LIST]: [],
};
