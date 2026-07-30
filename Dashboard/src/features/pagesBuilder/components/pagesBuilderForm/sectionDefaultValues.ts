import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { LOGOS_INITIAL_STATE } from "@/shared/components/logosFields/getLogosFieldsDefaultValues";
import { SECTION_TYPES } from "../../constants/sectionTypes";
import { ACHIEVEMENTS_INITIAL_STATE } from "../../sections/achievementsSection/getAchievementsDefaultValues";
import { ADVANCED_OVERVIEW_INITIAL_STATE } from "../../sections/advancedOverviewSection/getAdvancedOverviewDefaultValues";
import { BANNER_INITIAL_STATE } from "../../sections/bannerSection/getBannerDefaultValues";
import { CTA_BANNER_INITIAL_STATE } from "../../sections/ctaBanner/getCtaBannerDefaultValues";
import { CULTURE_IDENTITY_INITIAL_STATE } from "../../sections/cultureIdentity/getCultureIdentityDefaultValues";
import { CUSTOM_ACCORDION_INITIAL_STATE } from "../../sections/customAccordion/getCustomAccordionDefaultValues";
import { DISPLAY_INFO_INITIAL_STATE } from "../../sections/displayInformationSection/getInfoDefaultValues";
import { FEATURED_WORKS_INITIAL_STATE } from "../../sections/featuredWorksSection/getFeaturedWorksDefaultValues";
import { MEDIA_CONTENT_INITIAL_STATE } from "../../sections/mediaContentSection/getMediaContentDefaultValues";
import { NEWS_TICKER_INITIAL_STATE } from "../../sections/newsTickerSection/getNewsTickerDefaultValues";

export const SECTION_DEFAULTS: Record<string, object> = {
  [SECTION_TYPES.BANNER]: {
    type: SECTION_TYPES.BANNER,
    content: BANNER_INITIAL_STATE,
  },
  [SECTION_TYPES.DISPLAY_INFO]: {
    type: SECTION_TYPES.DISPLAY_INFO,
    content: DISPLAY_INFO_INITIAL_STATE,
  },
  [SECTION_TYPES.FEATURED_WORKS]: {
    type: SECTION_TYPES.FEATURED_WORKS,
    content: FEATURED_WORKS_INITIAL_STATE,
  },
  [SECTION_TYPES.ACHIEVEMENTS]: {
    type: SECTION_TYPES.ACHIEVEMENTS,
    content: ACHIEVEMENTS_INITIAL_STATE,
  },
  [SECTION_TYPES.CULTURE_IDENTITY]: {
    type: SECTION_TYPES.CULTURE_IDENTITY,
    content: CULTURE_IDENTITY_INITIAL_STATE,
  },
  [SECTION_TYPES.NEWS_TICKER]: {
    type: SECTION_TYPES.NEWS_TICKER,
    content: NEWS_TICKER_INITIAL_STATE,
  },
  [SECTION_TYPES.MEDIA_CONTENT]: {
    type: SECTION_TYPES.MEDIA_CONTENT,
    content: MEDIA_CONTENT_INITIAL_STATE,
  },
  [SECTION_TYPES.ADVANCED_OVERVIEW]: {
    type: SECTION_TYPES.ADVANCED_OVERVIEW,
    content: ADVANCED_OVERVIEW_INITIAL_STATE,
  },
  [SECTION_TYPES.CUSTOM_ACCORDION]: {
    type: SECTION_TYPES.CUSTOM_ACCORDION,
    content: CUSTOM_ACCORDION_INITIAL_STATE,
  },
  [SECTION_TYPES.CTA_BANNER]: {
    type: SECTION_TYPES.CTA_BANNER,
    content: CTA_BANNER_INITIAL_STATE,
  },
  [SECTION_TYPES.HEADER]: {
    type: SECTION_TYPES.HEADER,
    content: HEADER_INITIAL_STATE,
  },
  [SECTION_TYPES.LOGOS]: {
    type: SECTION_TYPES.LOGOS,
    content: LOGOS_INITIAL_STATE,
  },
};
