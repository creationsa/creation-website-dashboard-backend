import { createPageTitleSettingsSectionSchema } from "@/shared/components/pageTitleSettingsSection/PageTitleSettingsSectionSchema";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createBlogsMainDataSchema = (t: TFunction) => {
  return createPageTitleSettingsSectionSchema(t);
};

export type BlogsMainDataFormValues = z.infer<
  ReturnType<typeof createBlogsMainDataSchema>
>;
