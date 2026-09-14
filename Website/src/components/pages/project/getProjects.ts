import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { ProjectItem } from "./types";

export async function getProjects(locale: LanguageType): Promise<ProjectItem[]> {
  return apiClient<ProjectItem[]>(endpoints.projects.root, locale);
}
