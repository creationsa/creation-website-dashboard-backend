import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createFooterSchema = (t: TFunction) =>
  z.object({
    statement_image: imageField(t),
    statement_desc_en: englishField(t, 3, 500),
    statement_desc_ar: normalField(t, 3, 500),
  });

export type FooterFormValues = z.infer<ReturnType<typeof createFooterSchema>>;
