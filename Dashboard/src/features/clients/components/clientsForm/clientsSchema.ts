import {
  MAX_IMAGE_ALT_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_IMAGE_ALT_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  normalField,
  svgImageField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createClientsSchema = (t: TFunction) =>
  z.object({
    title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    logos: z
      .array(
        z.object({
          logo_image: svgImageField(t),
          alt_en: englishField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),
          alt_ar: normalField(t, MIN_IMAGE_ALT_LENGTH, MAX_IMAGE_ALT_LENGTH),
        }),
      )
      .min(1, t("errors.fieldRequired")),
  });

export type ClientsFormValues = z.infer<ReturnType<typeof createClientsSchema>>;
