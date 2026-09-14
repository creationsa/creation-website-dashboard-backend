import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { SolutionsMainData } from "./types";

export async function getSolutionsMainData(
  locale: LanguageType,
): Promise<SolutionsMainData> {
  return apiClient<SolutionsMainData>(endpoints.solutions.mainData, locale);
}
