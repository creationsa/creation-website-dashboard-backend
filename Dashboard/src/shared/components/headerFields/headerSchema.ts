import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createHeaderSchema = (t: TFunction) =>
  z.object({
    first_title_en: englishField(t, 3, 100),
    first_title_ar: normalField(t, 3, 100),

    second_title_en: englishField(t, 3, 100),
    second_title_ar: normalField(t, 3, 100),

    third_title_en: englishField(t, 3, 100),
    third_title_ar: normalField(t, 3, 100),
  });

export type HeaderFormValues = z.infer<ReturnType<typeof createHeaderSchema>>;
