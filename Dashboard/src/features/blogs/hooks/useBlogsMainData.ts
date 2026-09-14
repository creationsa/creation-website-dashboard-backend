import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getBlogsMainData } from "../api/getBlogsMainData";

export function useBlogsMainData() {
  const {
    data: blogsMainData,
    isPending: isBlogsMainDataLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.blogsMainData],
    queryFn: () => getBlogsMainData(),
  });

  return {
    blogsMainData,
    isBlogsMainDataLoading,
    error,
  };
}
