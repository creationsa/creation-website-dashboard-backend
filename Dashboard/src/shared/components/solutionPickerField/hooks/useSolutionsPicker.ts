import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSolutionsPicker } from "../api/getSolutionsPicker";

export function useSolutionsPicker() {
  const {
    data: solutions,
    isPending: isSolutionsPickerLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.solutionsPicker,
    queryFn: getSolutionsPicker,
  });

  return {
    solutions,
    isSolutionsPickerLoading,
    error,
  };
}
