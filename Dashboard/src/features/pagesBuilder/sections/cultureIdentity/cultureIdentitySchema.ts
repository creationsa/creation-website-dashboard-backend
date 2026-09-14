import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_SHORT_TEXT_LENGTH,
  MAX_SUBTITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_SHORT_TEXT_LENGTH,
  MIN_SUBTITLE_LENGTH,
} from "@/shared/constants/constants";

export const createCultureIdentitySchema = (t: TFunction) => {
  return z.object({
    culture_media: createMediaSchema(t),

    top_left_text_en: englishField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),
    top_left_text_ar: normalField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),
    top_left_second_text_en: englishField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),
    top_left_second_text_ar: normalField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),

    top_right_text_en: englishField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),
    top_right_text_ar: normalField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),
    top_right_second_text_en: englishField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),
    top_right_second_text_ar: normalField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ).or(z.literal("")),

    center_title_en: englishField(t, MIN_SUBTITLE_LENGTH, MAX_SUBTITLE_LENGTH),
    center_title_ar: normalField(t, MIN_SUBTITLE_LENGTH, MAX_SUBTITLE_LENGTH),

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
  });
};

export type CultureIdentityFormValues = z.infer<
  ReturnType<typeof createCultureIdentitySchema>
>;
