import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSeoDataById } from "../api/getSeoDataById";

export function useGetSeoDataById(id: number) {
  const {
    data: seoData,
    isPending: isSeoLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.seoId(id),
    queryFn: () => getSeoDataById(id),
  });

  return {
    seoData,
    isSeoLoading,
    error,
  };
}
