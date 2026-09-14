import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { LanguageType } from "@/i18n.config";
import { ProjectSlug } from "./types";

export async function getProjectSlugs(
  locale: LanguageType,
): Promise<ProjectSlug[]> {
  return apiClient<ProjectSlug[]>(endpoints.projects.slugs, locale);
}
