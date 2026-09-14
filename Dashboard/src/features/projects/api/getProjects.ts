import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type {
  ListQueryParams,
  PaginatedResult,
} from "@/shared/types/pagination";
import type { Project } from "../types";

export async function getProjects(
  locale: LanguageType,
  params: ListQueryParams,
): Promise<PaginatedResult<Project>> {
  const { data } = await instance.get(endpoints.projects.allProjects, {
    headers: {
      "Accept-Language": locale,
    },
    params,
  });

  return { data: data?.data, meta: data?.meta };
}
