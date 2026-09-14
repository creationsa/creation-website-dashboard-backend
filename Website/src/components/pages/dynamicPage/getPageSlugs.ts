import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export interface PageSlug {
  slug: string;
  updated_at: string;
}

export async function getPageSlugs(locale: LanguageType): Promise<PageSlug[]> {
  return apiClient<PageSlug[]>(endpoints.pageBuilder.slugs, locale);
}
