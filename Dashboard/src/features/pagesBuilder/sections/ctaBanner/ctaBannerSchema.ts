import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createCtaBannerSchema = (t: TFunction) => {
  return z.object({
    title_en: englishField(t, 3, 150),
    title_ar: normalField(t, 3, 150),

    description_en: englishField(t, 10, 1000),
    description_ar: normalField(t, 10, 1000),

    button_text_en: englishField(t, 2, 50),
    button_text_ar: normalField(t, 2, 50),
    button_slug: englishField(t, 2, 150),
  });
};

export type CtaBannerFormValues = z.infer<
  ReturnType<typeof createCtaBannerSchema>
>;
