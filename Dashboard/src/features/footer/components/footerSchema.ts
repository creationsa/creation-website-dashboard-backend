import {
  createMenuItemSchema,
  createMenuItemsFieldSchema,
} from "@/shared/components/menuItemsField/menuItemsFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_IMAGE_ALT_LENGTH,
  MAX_LINK_LENGTH,
  MAX_LONG_CONTENT_LENGTH,
  MAX_LONG_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_IMAGE_ALT_LENGTH,
  MIN_LINK_LENGTH,
  MIN_LONG_CONTENT_LENGTH,
  MIN_LONG_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  imageField,
  normalField,
  svgImageField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

const createSocialItemSchema = () =>
  z.object({
    setting_social_id: z.number(),
  });

export const createBadgeSchema = (t: TFunction) =>
  z.object({
    label_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    label_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    link: englishField(t, MIN_LINK_LENGTH, MAX_LINK_LENGTH),
    image: imageField(t),
  });

export const createFooterSchema = (t: TFunction) =>
  z
    .object({
      statement_image: svgImageField(t),
      statement_desc_en: englishField(
        t,
        MIN_DESCRIPTION_LENGTH,
        MAX_DESCRIPTION_LENGTH,
      ),
      statement_desc_ar: normalField(
        t,
        MIN_DESCRIPTION_LENGTH,
        MAX_DESCRIPTION_LENGTH,
      ),
      statement_image_alt_en: englishField(
        t,
        MIN_IMAGE_ALT_LENGTH,
        MAX_IMAGE_ALT_LENGTH,
      ),
      statement_image_alt_ar: normalField(
        t,
        MIN_IMAGE_ALT_LENGTH,
        MAX_IMAGE_ALT_LENGTH,
      ),

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
      tagline_en: englishField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
      tagline_ar: normalField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),

      menu_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
      menu_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

      social_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
      social_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
      social_items: z.array(createSocialItemSchema()),

      badges: z.array(createBadgeSchema(t)).length(2),

      copyright_text_en: normalField(
        t,
        MIN_DESCRIPTION_LENGTH,
        MAX_DESCRIPTION_LENGTH,
      ),
      copyright_text_ar: normalField(
        t,
        MIN_DESCRIPTION_LENGTH,
        MAX_DESCRIPTION_LENGTH,
      ),
      copyright_items: z.array(createMenuItemSchema()),
    })
    .merge(createMenuItemsFieldSchema());

export type FooterFormValues = z.infer<ReturnType<typeof createFooterSchema>>;
export type FooterBadgeFormValues = z.infer<
  ReturnType<typeof createBadgeSchema>
>;
