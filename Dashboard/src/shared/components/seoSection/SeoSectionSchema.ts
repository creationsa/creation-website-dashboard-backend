import {
  MAX_SEO_DESCRIPTION_LENGTH,
  MIN_SEO_DESCRIPTION_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createSeoSectionSchema = (t: TFunction) =>
  z.object({
    seo_desc_en: englishField(
      t,
      MIN_SEO_DESCRIPTION_LENGTH,
      MAX_SEO_DESCRIPTION_LENGTH,
    ),
    seo_desc_ar: normalField(
      t,
      MIN_SEO_DESCRIPTION_LENGTH,
      MAX_SEO_DESCRIPTION_LENGTH,
    ),
  });

export type SeoSectionFormValues = z.infer<
  ReturnType<typeof createSeoSectionSchema>
>;
