import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";

export const createCultureIdentitySchema = (t: TFunction) => {
  return z.object({
    culture_media: createMediaSchema(t),

    top_left_text_en: englishField(t, 2, 150).or(z.literal("")),
    top_left_text_ar: normalField(t, 2, 150).or(z.literal("")),
    top_right_text_en: englishField(t, 2, 150).or(z.literal("")),
    top_right_text_ar: normalField(t, 2, 150).or(z.literal("")),

    center_title_en: englishField(t, 3, 200),
    center_title_ar: normalField(t, 3, 200),

    center_description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    center_description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    center_footer_text_en: englishField(
      t,
      MIN_TITLE_LENGTH,
      MAX_TITLE_LENGTH,
    ).or(z.literal("")),
    center_footer_text_ar: normalField(
      t,
      MIN_TITLE_LENGTH,
      MAX_TITLE_LENGTH,
    ).or(z.literal("")),
  });
};

export type CultureIdentityFormValues = z.infer<
  ReturnType<typeof createCultureIdentitySchema>
>;
