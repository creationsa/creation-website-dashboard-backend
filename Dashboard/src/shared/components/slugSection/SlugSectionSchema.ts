import { MAX_SLUG_LENGTH, MIN_SLUG_LENGTH } from "@/shared/constants/constants";
import { englishField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createSlugSectionSchema = (t: TFunction) =>
  z.object({
    slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),
  });

export type SlugSectionFormValues = z.infer<
  ReturnType<typeof createSlugSectionSchema>
>;
