import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createHeaderSchema = (t: TFunction) =>
  z.object({
    first_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH).or(
      z.literal(""),
    ),
    first_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH).or(
      z.literal(""),
    ),

    second_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    second_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

    third_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH).or(
      z.literal(""),
    ),
    third_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH).or(
      z.literal(""),
    ),
  });

export type HeaderFormValues = z.infer<ReturnType<typeof createHeaderSchema>>;
