import { createDynamicItemsSchema } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createSeoSectionSchema } from "@/shared/components/seoSection/SeoSectionSchema";
import { createSlugSectionSchema } from "@/shared/components/slugSection/SlugSectionSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import { createTitleSectionSchema } from "@/shared/components/titleSection/titleSectionSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createProjectSchema = (t: TFunction) => {
  const titleSchema = createTitleSectionSchema(t);
  const slugSchema = createSlugSectionSchema(t);
  const seoSchema = createSeoSectionSchema(t);
  const headerSchema = createHeaderSchema(t);

  const baseProjectSchema = z.object({
    first_cover_media: createMediaSchema(t),
    overview_description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    overview_description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    second_cover_media: createMediaSchema(t),
    stats_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stats_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_one_value: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_one_label_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_one_label_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_two_value: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_two_label_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_two_label_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_three_value: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_three_label_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    stat_three_label_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

    first_media: createMediaSchema(t),
    second_media: createMediaSchema(t),
    third_media: createMediaSchema(t),
    fourth_media: createMediaSchema(t),
    fifth_media: createMediaSchema(t),
    sixth_media: createMediaSchema(t),
    seventh_media: createMediaSchema(t),
    eighth_media: createMediaSchema(t),

    ticker_items: createDynamicItemsSchema(t),
  });

  return titleSchema
    .merge(baseProjectSchema)
    .merge(seoSchema)
    .merge(slugSchema)
    .merge(headerSchema);
};

export type ProjectFormValues = z.infer<ReturnType<typeof createProjectSchema>>;
