import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { Project } from "../types";

export async function getProjects(locale: LanguageType): Promise<Project[]> {
  const { data } = await instance.get(endpoints.projects.allProjects, {
    headers: {
      "Accept-Language": locale,
    },
  });

  return data?.data;
}
