import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_LINK_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_LINK_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createReviewItemSchema = (t: TFunction) =>
  z.object({
    logo_image: imageField(t),
    title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    link_text_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    link_text_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    link_url: englishField(t, MIN_LINK_LENGTH, MAX_LINK_LENGTH),
  });

export const createReviewsSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseReviewsSchema = z.object({
    description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    items: z.array(createReviewItemSchema(t)).length(2),
  });

  return headerSchema.merge(baseReviewsSchema);
};

export type ReviewItemFormValues = z.infer<
  ReturnType<typeof createReviewItemSchema>
>;
export type ReviewsFormValues = z.infer<ReturnType<typeof createReviewsSchema>>;
