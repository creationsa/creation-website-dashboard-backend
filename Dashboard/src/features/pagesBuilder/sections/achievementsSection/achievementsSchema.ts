import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_STAT_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_STAT_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createAchievementsSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseAchievementsSchema = z.object({
    achievement_media: createMediaSchema(t),

    description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    stat_1_number: z.string().min(1, t("errors.fieldRequired")),
    stat_1_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_1_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    stat_2_number: z.string().min(1, t("errors.fieldRequired")),
    stat_2_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_2_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    stat_3_number: z.string().min(1, t("errors.fieldRequired")),
    stat_3_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_3_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),

    stat_4_number: z.string().min(1, t("errors.fieldRequired")),
    stat_4_label_en: englishField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
    stat_4_label_ar: normalField(t, MIN_STAT_LENGTH, MAX_STAT_LENGTH),
  });

  return headerSchema.merge(baseAchievementsSchema);
};

export type AchievementsFormValues = z.infer<
  ReturnType<typeof createAchievementsSchema>
>;
