import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { DynamicPageData } from "./types";

export async function getPageBySlug(
  slug: string,
  locale: LanguageType,
): Promise<DynamicPageData> {
  return apiClient<DynamicPageData>(endpoints.pageBuilder.detail(slug), locale);
}
