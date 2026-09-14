import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSeoDataById } from "../api/getSeoDataById";

export function useGetSeoDataById(id?: number) {
  const {
    data: seoData,
    isPending,
    error,
  } = useQuery({
    queryKey: queryKeys.seoId(id ?? 0),
    queryFn: () => getSeoDataById(id!),
    enabled: Boolean(id),
  });

  return {
    seoData,
    isSeoLoading: Boolean(id) && isPending,
    error,
  };
}
