import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createDisplayInfoSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseDisplayInfoSchema = z.object({
    blocks: z.array(
      z.object({
        left_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
        left_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
        left_desc_en: englishField(
          t,
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        ),
        left_desc_ar: normalField(
          t,
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        ),
        left_btn_en: englishField(t, 10, 70),
        left_btn_ar: normalField(t, 10, 70),

        first_right_media: createMediaSchema(t),
        first_right_card_title_en: englishField(
          t,
          MIN_TITLE_LENGTH,
          MAX_TITLE_LENGTH,
        ),
        first_right_card_title_ar: normalField(
          t,
          MIN_TITLE_LENGTH,
          MAX_TITLE_LENGTH,
        ),
        first_right_card_desc_en: englishField(
          t,
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        ),
        first_right_card_desc_ar: normalField(
          t,
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        ),

        second_right_media: createMediaSchema(t),
        second_right_card_title_en: englishField(
          t,
          MIN_TITLE_LENGTH,
          MAX_TITLE_LENGTH,
        ),
        second_right_card_title_ar: normalField(
          t,
          MIN_TITLE_LENGTH,
          MAX_TITLE_LENGTH,
        ),
        second_right_card_desc_en: englishField(
          t,
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        ),
        second_right_card_desc_ar: normalField(
          t,
          MIN_DESCRIPTION_LENGTH,
          MAX_DESCRIPTION_LENGTH,
        ),
      }),
    ),
  });

  return headerSchema.merge(baseDisplayInfoSchema);
};

export type DisplayInfoFormValues = z.infer<
  ReturnType<typeof createDisplayInfoSchema>
>;
