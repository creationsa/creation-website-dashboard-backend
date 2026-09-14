import {
  MAX_SHORT_TITLE_LENGTH,
  MAX_SLUG_LENGTH,
  MIN_SHORT_TITLE_LENGTH,
  MIN_SLUG_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createPageTitleSettingsSectionSchema = (t: TFunction) =>
  z.object({
    slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),
    nav_title_en: englishField(t, MIN_SHORT_TITLE_LENGTH, MAX_SHORT_TITLE_LENGTH),
    nav_title_ar: normalField(t, MIN_SHORT_TITLE_LENGTH, MAX_SHORT_TITLE_LENGTH),
  });

export type PageTitleSettingsSectionFormValues = z.infer<
  ReturnType<typeof createPageTitleSettingsSectionSchema>
>;
