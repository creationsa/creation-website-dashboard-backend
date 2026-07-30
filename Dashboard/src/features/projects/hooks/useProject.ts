import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "../api/getProject";

export function useProject(id: number) {
  const {
    data: project,
    isPending: isProjectLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => getProject(id),
  });

  return {
    project,
    isProjectLoading,
    error,
  };
}
