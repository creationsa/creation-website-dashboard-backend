import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createSettingsSchema = (t: TFunction) =>
  z.object({
    logo_en: imageField(t),
    logo_en_alt_en: englishField(t, 3, 100),
    logo_en_alt_ar: normalField(t, 3, 100),

    logo_ar: imageField(t),
    logo_ar_alt_en: englishField(t, 3, 100),
    logo_ar_alt_ar: normalField(t, 3, 100),

    instagram_title_en: englishField(t, 3, 100),
    instagram_title_ar: normalField(t, 3, 100),
    instagram_link: englishField(t, 3, 100),

    facebook_title_en: englishField(t, 3, 100),
    facebook_title_ar: normalField(t, 3, 100),
    facebook_link: englishField(t, 3, 100),

    behance_title_en: englishField(t, 3, 100),
    behance_title_ar: normalField(t, 3, 100),
    behance_link: englishField(t, 3, 100),

    linkedin_title_en: englishField(t, 3, 100),
    linkedin_title_ar: normalField(t, 3, 100),
    linkedin_link: englishField(t, 3, 100),
  });

export type SettingsFormValues = z.infer<
  ReturnType<typeof createSettingsSchema>
>;
