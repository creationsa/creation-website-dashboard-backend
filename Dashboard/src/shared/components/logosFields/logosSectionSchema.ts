import type { TFunction } from "i18next";
import { z } from "zod";
import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";

export const createLogosSchema = (t: TFunction) => {
  return z.object({
    title_en: englishField(t, 2, 100),
    title_ar: normalField(t, 2, 100),
    logos: z
      .array(
        z.object({
          logo_image: imageField(t),
          alt_en: englishField(t, 2, 150),
          alt_ar: normalField(t, 2, 150),
        }),
      )
      .min(1, t("errors.fieldRequired")),
  });
};

export type LogosFormValues = z.infer<ReturnType<typeof createLogosSchema>>;
