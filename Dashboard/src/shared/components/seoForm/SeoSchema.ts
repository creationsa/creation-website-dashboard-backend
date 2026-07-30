import {
  MAX_SEO_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_SEO_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createSeoSchema = (t: TFunction) =>
  z.object({
    title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

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

    keywords: z.array(z.string()),
    image_en: imageField(t),
    image_ar: imageField(t),
  });

export type SeoFormValues = z.infer<ReturnType<typeof createSeoSchema>>;
