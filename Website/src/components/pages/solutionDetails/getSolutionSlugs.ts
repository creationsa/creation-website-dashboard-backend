import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { SolutionSlug } from "./types";

export async function getSolutionSlugs(
  locale: LanguageType,
): Promise<SolutionSlug[]> {
  return apiClient<SolutionSlug[]>(endpoints.solutions.slugs, locale);
}
