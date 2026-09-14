import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createPageTitleSettingsSectionSchema } from "@/shared/components/pageTitleSettingsSection/PageTitleSettingsSectionSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createProjectsSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);
  const slugSchema = createPageTitleSettingsSectionSchema(t);

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
  });

  return headerSchema.merge(baseProjectsSchema).merge(slugSchema);
};

export type ProjectsFormValues = z.infer<
  ReturnType<typeof createProjectsSchema>
>;
