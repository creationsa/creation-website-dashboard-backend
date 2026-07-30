import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createTitleSectionSchema = (t: TFunction) =>
  z.object({
    title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
  });

export type TitleSectionFormValues = z.infer<
  ReturnType<typeof createTitleSectionSchema>
>;
