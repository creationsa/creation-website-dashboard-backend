import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createBannerSchema = (t: TFunction) =>
  z.object({
    first_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    first_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

    second_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    second_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

    third_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    third_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),

    left_media: createMediaSchema(t),

    right_media: createMediaSchema(t),
  });

export type BannerFormValues = z.infer<ReturnType<typeof createBannerSchema>>;
