import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSolutionsData } from "../api/getSolutionsData";

export function useSolutionsMainData() {
  const {
    data: solutionsMainData,
    isPending: isSolutionsMainDataLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.solutionsMainData],
    queryFn: () => getSolutionsData(),
  });

  return {
    solutionsMainData,
    isSolutionsMainDataLoading,
    error,
  };
}
