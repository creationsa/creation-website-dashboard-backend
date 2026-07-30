import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createDynamicItemsSchema = (t: TFunction) =>
  z
    .array(
      z.object({
        text_en: englishField(t, 2, 500),
        text_ar: normalField(t, 2, 500),
      }),
    )
    .min(1, t("errors.required"));

export type DynamicItemsFormValues = z.infer<
  ReturnType<typeof createDynamicItemsSchema>
>;
