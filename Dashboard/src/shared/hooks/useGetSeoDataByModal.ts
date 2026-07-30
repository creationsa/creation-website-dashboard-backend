import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSeoDataByModal } from "../api/getSeoDataByModal";

export function useGetSeoDataByModal(modal: string) {
  const {
    data: seoData,
    isPending: isSeoLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.seoModal(modal),
    queryFn: () => getSeoDataByModal(modal),
  });

  return {
    seoData,
    isSeoLoading,
    error,
  };
}
