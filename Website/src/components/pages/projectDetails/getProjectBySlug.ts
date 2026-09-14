import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { SingleProjectBySlugProps } from "./types";

export async function getProjectBySlug(
  slug: string,
  locale: LanguageType,
): Promise<SingleProjectBySlugProps> {
  return apiClient<SingleProjectBySlugProps>(
    endpoints.projects.detail(slug),
    locale,
  );
}
