import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createAccordionSchema = (t: TFunction) =>
  z.object({
    accordion_items: z.array(
      z.object({
        title_en: englishField(t, 3, 150),
        title_ar: normalField(t, 3, 150),
        content_en: englishField(t, 3, 1000),
        content_ar: normalField(t, 3, 1000),
      }),
    ),
  });

export type AccordionFormValues = z.infer<
  ReturnType<typeof createAccordionSchema>
>;
