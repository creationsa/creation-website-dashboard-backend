import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { BlogSlug } from "./types";
import { LanguageType } from "@/i18n.config";

export async function getBlogSlugs(locale: LanguageType): Promise<BlogSlug[]> {
  return apiClient<BlogSlug[]>(endpoints.blogs.slugs, locale);
}
