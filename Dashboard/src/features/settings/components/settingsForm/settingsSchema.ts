import {
  MAX_IMAGE_ALT_LENGTH,
  MAX_LINK_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_IMAGE_ALT_LENGTH,
  MIN_LINK_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  normalField,
  svgImageField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

const createSocialItemSchema = (t: TFunction) =>
  z.object({
    id: z.number().optional(),
    title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    link: englishField(t, MIN_LINK_LENGTH, MAX_LINK_LENGTH),
  });

export const createSettingsSchema = (t: TFunction) =>
  z.object({
    logo_en: svgImageField(t),
    logo_en_alt_en: englishField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),
    logo_en_alt_ar: normalField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),

    logo_ar: svgImageField(t),
    logo_ar_alt_en: englishField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),
    logo_ar_alt_ar: normalField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),

    socials: z.array(createSocialItemSchema(t)).min(1),
  });

export type SettingsFormValues = z.infer<
  ReturnType<typeof createSettingsSchema>
>;
