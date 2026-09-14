import {
  MAX_BUTTON_TEXT_LENGTH,
  MAX_LONG_TITLE_LENGTH,
  MAX_SHORT_TEXT_LENGTH,
  MIN_BUTTON_TEXT_LENGTH,
  MIN_LONG_TITLE_LENGTH,
  MIN_SHORT_TEXT_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createCtaBannerSchema = (t: TFunction) => {
  return z.object({
    title_en: englishField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
    title_ar: normalField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),

    description_en: englishField(t, 10, 1000),
    description_ar: normalField(t, 10, 1000),

    button_text_en: englishField(t, MIN_BUTTON_TEXT_LENGTH, MAX_BUTTON_TEXT_LENGTH),
    button_text_ar: normalField(t, MIN_BUTTON_TEXT_LENGTH, MAX_BUTTON_TEXT_LENGTH),
    button_slug: englishField(t, MIN_SHORT_TEXT_LENGTH, MAX_SHORT_TEXT_LENGTH),
  });
};

export type CtaBannerFormValues = z.infer<
  ReturnType<typeof createCtaBannerSchema>
>;
