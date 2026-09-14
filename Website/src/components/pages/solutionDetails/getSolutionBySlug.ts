import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { SingleSolutionBySlugProps } from "./types";

export async function getSolutionBySlug(
  slug: string,
  locale: LanguageType,
): Promise<SingleSolutionBySlugProps> {
  return apiClient<SingleSolutionBySlugProps>(
    endpoints.solutions.detail(slug),
    locale,
  );
}
