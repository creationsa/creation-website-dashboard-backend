import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_STAT_LENGTH,
  MAX_STAT_NUMBER_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_STAT_LENGTH,
  MIN_STAT_NUMBER_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createAdvancedOverviewSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseAdvancedOverview = z.object({
    upper_description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    upper_description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    lower_description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    lower_description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    overlay_label_number: englishField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ).optional(),
    overlay_label_title_en: englishField(
      t,
      MIN_STAT_LENGTH,
      MAX_STAT_LENGTH,
    ).optional(),
    overlay_label_title_ar: normalField(
      t,
      MIN_STAT_LENGTH,
      MAX_STAT_LENGTH,
    ).optional(),

    stat1_number_en: englishField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat1_number_ar: normalField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat1_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat1_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    stat2_number_en: englishField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat2_number_ar: normalField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat2_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat2_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    stat3_number_en: englishField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat3_number_ar: normalField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat3_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat3_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    stat4_number_en: englishField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat4_number_ar: normalField(
      t,
      MIN_STAT_NUMBER_LENGTH,
      MAX_STAT_NUMBER_LENGTH,
    ),
    stat4_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat4_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    based_advanced_overview_media: createMediaSchema(t),
  });

  return headerSchema.merge(baseAdvancedOverview);
};

export type AdvancedOverviewFormValues = z.infer<
  ReturnType<typeof createAdvancedOverviewSchema>
>;
