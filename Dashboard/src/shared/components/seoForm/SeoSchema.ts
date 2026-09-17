import {
  MAX_IMAGE_ALT_LENGTH,
  MAX_SEO_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_IMAGE_ALT_LENGTH,
  MIN_SEO_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  imageField,
  normalField,
  optionalEnglishField,
  optionalNormalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

const optionalImageField = () =>
  z.union([z.instanceof(File), z.string()]).optional();

export const createSeoSchema = (
  t: TFunction,
  isLinkedRecord = false,
  isHomeForm = false,
) =>
  z.object({
    title_en: isLinkedRecord
      ? optionalEnglishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
      : englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    title_ar: isLinkedRecord
      ? optionalNormalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
      : normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

    seo_desc_en: isLinkedRecord
      ? optionalEnglishField(
          t,
          MIN_SEO_DESCRIPTION_LENGTH,
          MAX_SEO_DESCRIPTION_LENGTH,
        )
      : englishField(t, MIN_SEO_DESCRIPTION_LENGTH, MAX_SEO_DESCRIPTION_LENGTH),
    seo_desc_ar: isLinkedRecord
      ? optionalNormalField(
          t,
          MIN_SEO_DESCRIPTION_LENGTH,
          MAX_SEO_DESCRIPTION_LENGTH,
        )
      : normalField(t, MIN_SEO_DESCRIPTION_LENGTH, MAX_SEO_DESCRIPTION_LENGTH),

    keywords: z.array(z.string()),
    image_en: isLinkedRecord ? optionalImageField() : imageField(t),
    image_ar: isLinkedRecord ? optionalImageField() : imageField(t),
    image_alt_en: isLinkedRecord
      ? z.string().optional()
      : englishField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),
    image_alt_ar: isLinkedRecord
      ? z.string().optional()
      : normalField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),
    image_type_en: z.string().optional(),
    image_type_ar: z.string().optional(),

    site_name_en: isHomeForm
      ? englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
      : z.string().optional(),
    site_name_ar: isHomeForm
      ? normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
      : z.string().optional(),
  });

export type SeoFormValues = z.infer<ReturnType<typeof createSeoSchema>>;
