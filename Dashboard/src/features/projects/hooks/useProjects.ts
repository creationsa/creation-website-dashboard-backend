import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { ListQueryParams } from "@/shared/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";

export function useProjects(locale: LanguageType, params: ListQueryParams) {
  const {
    data,
    isPending: isProjectsLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.projects, locale, params],
    queryFn: () => getProjects(locale, params),
    placeholderData: keepPreviousData,
  });

  return {
    projects: data?.data,
    meta: data?.meta,
    isProjectsLoading,
    error,
  };
}
