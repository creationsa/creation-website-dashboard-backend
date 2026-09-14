import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import {
  MAX_SLUG_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_SLUG_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";
import { SECTION_TYPES } from "../../constants/sectionTypes";
import { createAchievementsSchema } from "../../sections/achievementsSection/achievementsSchema";
import { createAdvancedOverviewSchema } from "../../sections/advancedOverviewSection/advancedOverviewSchema";
import { createBannerSchema } from "../../sections/bannerSection/bannerSchema";
import { createCtaBannerSchema } from "../../sections/ctaBanner/ctaBannerSchema";
import { createCultureIdentitySchema } from "../../sections/cultureIdentity/cultureIdentitySchema";
import { createCustomAccordionSchema } from "../../sections/customAccordion/customAccordionSchema";
import { createDisplayInfoSchema } from "../../sections/displayInformationSection/displayInfoSchema";
import { createFeaturedWorksSchema } from "../../sections/featuredWorksSection/featuredWorksSchema";
import { createLogosSchema } from "../../sections/logos/logosSchema";
import { createMediaContentSchema } from "../../sections/mediaContentSection/mediaContentSchema";
import { createContactSchema } from "../../sections/contactSection/contactSchema";
import { createBlogsTeaserSchema } from "../../sections/blogsTeaser/blogsTeaserSchema";
import { createNewsTickerSchema } from "../../sections/newsTickerSection/newsTickerSchema";
import { createReviewsSchema } from "../../sections/reviewsSection/reviewsSchema";
import { createTextListSchema } from "../../sections/textListSection/textListSchema";

export const createPageSchema = (t: TFunction) =>
  z.object({
    page_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    page_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    page_slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),
    is_home: z.boolean(),

    sections: z.array(
      z.discriminatedUnion("type", [
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.BANNER),
          content: createBannerSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.DISPLAY_INFO),
          content: createDisplayInfoSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.FEATURED_WORKS),
          content: createFeaturedWorksSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.ACHIEVEMENTS),
          content: createAchievementsSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.CULTURE_IDENTITY),
          content: createCultureIdentitySchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.NEWS_TICKER),
          content: createNewsTickerSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.MEDIA_CONTENT),
          content: createMediaContentSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.ADVANCED_OVERVIEW),
          content: createAdvancedOverviewSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.CUSTOM_ACCORDION),
          content: createCustomAccordionSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.CTA_BANNER),
          content: createCtaBannerSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.HEADER),
          content: createHeaderSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.LOGOS),
          content: createLogosSchema(),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.REVIEWS),
          content: createReviewsSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.BLOGS_TEASER),
          content: createBlogsTeaserSchema(t),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.CONTACT),
          content: createContactSchema(),
        }),
        z.object({
          id: z.string().optional(),
          type: z.literal(SECTION_TYPES.TEXT_LIST),
          content: createTextListSchema(t),
        }),
      ]),
    ),
  });

export type PageFormValues = z.infer<ReturnType<typeof createPageSchema>>;
