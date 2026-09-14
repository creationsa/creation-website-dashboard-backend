import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { ProjectsMainData } from "./types";

export async function getProjectsMainData(
  locale: LanguageType,
): Promise<ProjectsMainData> {
  return apiClient<ProjectsMainData>(endpoints.projects.mainData, locale);
}
