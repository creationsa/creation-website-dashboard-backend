import { createTitleSectionSchema } from "@/shared/components/titleSection/titleSectionSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_IMAGE_ALT_LENGTH,
  MAX_SEO_DESCRIPTION_LENGTH,
  MAX_SLUG_LENGTH,
  MAX_SUBTITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_IMAGE_ALT_LENGTH,
  MIN_SEO_DESCRIPTION_LENGTH,
  MIN_SLUG_LENGTH,
  MIN_SUBTITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createBlogSchema = (t: TFunction) => {
  const titleSchema = createTitleSectionSchema(t);

  const baseBlogSchema = z.object({
    slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),

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

    base_image: imageField(t),
    base_image_alt_en: englishField(
      t,
      MIN_IMAGE_ALT_LENGTH,
      MAX_IMAGE_ALT_LENGTH,
    ),
    base_image_alt_ar: normalField(
      t,
      MIN_IMAGE_ALT_LENGTH,
      MAX_IMAGE_ALT_LENGTH,
    ),

    cover_image: imageField(t),
    cover_image_alt_en: englishField(
      t,
      MIN_IMAGE_ALT_LENGTH,
      MAX_IMAGE_ALT_LENGTH,
    ),
    cover_image_alt_ar: normalField(
      t,
      MIN_IMAGE_ALT_LENGTH,
      MAX_IMAGE_ALT_LENGTH,
    ),

    first_sub_title_en: englishField(t, MIN_SUBTITLE_LENGTH, MAX_SUBTITLE_LENGTH),
    first_sub_title_ar: normalField(t, MIN_SUBTITLE_LENGTH, MAX_SUBTITLE_LENGTH),

    first_desc_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    first_desc_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    second_desc_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    second_desc_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    second_sub_title_en: englishField(
      t,
      MIN_SUBTITLE_LENGTH,
      MAX_SUBTITLE_LENGTH,
    ),
    second_sub_title_ar: normalField(
      t,
      MIN_SUBTITLE_LENGTH,
      MAX_SUBTITLE_LENGTH,
    ),

    items: z
      .array(
        z.object({
          en: z.object({
            desc: englishField(
              t,
              MIN_DESCRIPTION_LENGTH,
              MAX_DESCRIPTION_LENGTH,
            ),
          }),
          ar: z.object({
            desc: normalField(
              t,
              MIN_DESCRIPTION_LENGTH,
              MAX_DESCRIPTION_LENGTH,
            ),
          }),
        }),
      )
      .min(1),
  });

  return titleSchema.merge(baseBlogSchema);
};

export type BlogFormValues = z.infer<ReturnType<typeof createBlogSchema>>;
