import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProjectsPicker } from "../api/getProjectsPicker";

export function useProjectsPicker() {
  const {
    data: projects,
    isPending: isProjectsPickerLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.projectsPicker,
    queryFn: getProjectsPicker,
  });

  return {
    projects,
    isProjectsPickerLoading,
    error,
  };
}
