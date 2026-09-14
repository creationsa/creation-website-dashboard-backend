import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { SolutionListItem } from "./types";

export async function getSolutions(
  locale: LanguageType,
): Promise<SolutionListItem[]> {
  return apiClient<SolutionListItem[]>(endpoints.solutions.root, locale);
}
