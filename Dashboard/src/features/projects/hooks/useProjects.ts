import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/getProjects";

export function useProjects(locale: LanguageType) {
  const {
    data: projects,
    isPending: isProjectsLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.projects, locale],
    queryFn: () => getProjects(locale),
  });

  return {
    projects,
    isProjectsLoading,
    error,
  };
}
