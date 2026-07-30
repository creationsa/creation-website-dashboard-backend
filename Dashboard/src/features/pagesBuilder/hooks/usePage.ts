import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCertainPage } from "../api/getCertainPage";

export function usePage(id: number) {
  const {
    data: page,
    isPending: isPageLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.page(id),
    queryFn: () => getCertainPage(id),
  });

  return {
    page,
    isPageLoading,
    error,
  };
}
