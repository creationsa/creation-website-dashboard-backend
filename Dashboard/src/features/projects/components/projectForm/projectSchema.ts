import { createDynamicItemsSchema } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import { createTitleSectionSchema } from "@/shared/components/titleSection/titleSectionSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_SLUG_LENGTH,
  MAX_STAT_LENGTH,
  MAX_STAT_NUMBER_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_SLUG_LENGTH,
  MIN_STAT_LENGTH,
  MIN_STAT_NUMBER_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";
import { PROJECT_MEDIA_FIELDS } from "../../types";

export const createProjectSchema = (t: TFunction) => {
  const titleSchema = createTitleSectionSchema(t);
  const headerSchema = createHeaderSchema(t);

  const baseProjectSchema = z.object({
    slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),

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
    stat_one_value: englishField(t, MIN_STAT_NUMBER_LENGTH, MAX_STAT_NUMBER_LENGTH),
    stat_one_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_one_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_two_value: englishField(t, MIN_STAT_NUMBER_LENGTH, MAX_STAT_NUMBER_LENGTH),
    stat_two_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_two_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_three_value: englishField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat_three_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_three_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    first_media: createMediaSchema(t),
    second_media: createMediaSchema(t),
    third_media: createMediaSchema(t),
    fourth_media: createMediaSchema(t),
    fifth_media: createMediaSchema(t),
    sixth_media: createMediaSchema(t),
    seventh_media: createMediaSchema(t),
    eighth_media: createMediaSchema(t),

    cover_media_field: z.enum(PROJECT_MEDIA_FIELDS, {
      message: t("projects.cover_media_field_required"),
    }),
    feature_media_field: z.enum(PROJECT_MEDIA_FIELDS, {
      message: t("projects.feature_media_field_required"),
    }),

    ticker_items: createDynamicItemsSchema(t),
  });

  return titleSchema.merge(baseProjectSchema).merge(headerSchema);
};

export type ProjectFormValues = z.infer<ReturnType<typeof createProjectSchema>>;
