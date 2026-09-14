import {
  MAX_LONG_CONTENT_LENGTH,
  MAX_LONG_TITLE_LENGTH,
  MIN_LONG_CONTENT_LENGTH,
  MIN_LONG_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createAccordionContentBlockSchema = (t: TFunction) =>
  z.object({
    subtitle_en: z.string().optional(),
    subtitle_ar: z.string().optional(),
    description_en: englishField(
      t,
      MIN_LONG_CONTENT_LENGTH,
      MAX_LONG_CONTENT_LENGTH,
    ),
    description_ar: normalField(
      t,
      MIN_LONG_CONTENT_LENGTH,
      MAX_LONG_CONTENT_LENGTH,
    ),
  });

export const createAccordionSchema = (t: TFunction) =>
  z.object({
    accordion_items: z.array(
      z.object({
        title_en: englishField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
        title_ar: normalField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
        content_blocks: z.array(createAccordionContentBlockSchema(t)).min(1),
      }),
    ),
  });

export type AccordionContentBlockValues = z.infer<
  ReturnType<typeof createAccordionContentBlockSchema>
>;

export type AccordionFormValues = z.infer<
  ReturnType<typeof createAccordionSchema>
>;
