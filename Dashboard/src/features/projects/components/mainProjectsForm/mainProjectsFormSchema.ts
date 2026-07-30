import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createLogosSchema } from "@/shared/components/logosFields/logosSectionSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createProjectsSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseProjectsSchema = z.object({
    overview_description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    overview_description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    logos_section: createLogosSchema(t),
  });

  return headerSchema.merge(baseProjectsSchema);
};

export type ProjectsFormValues = z.infer<
  ReturnType<typeof createProjectsSchema>
>;
