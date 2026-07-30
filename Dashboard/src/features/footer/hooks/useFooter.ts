import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getFooter } from "../api/getFooter";

export function useFooter() {
  const {
    data: footerData,
    isPending: isFooterLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.footer,
    queryFn: getFooter,
  });

  return {
    footerData,
    isFooterLoading,
    error,
  };
}
