import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSolution } from "../api/getSolution";

export function useSolution(id: number) {
  const {
    data: solution,
    isPending: isSolutionLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.solution(id),
    queryFn: () => getSolution(id),
  });

  return {
    solution,
    isSolutionLoading,
    error,
  };
}
