import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProjectsData } from "../api/getProjectsData";

export function useProjectsMainData() {
  const {
    data: projectsData,
    isPending: isProjectsDataLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.projectsMainData],
    queryFn: () => getProjectsData(),
  });

  return {
    projectsData,
    isProjectsDataLoading,
    error,
  };
}
