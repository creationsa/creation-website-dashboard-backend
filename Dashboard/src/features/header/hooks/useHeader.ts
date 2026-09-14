import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getHeader } from "../api/getHeader";

export function useHeader() {
  const {
    data: headerData,
    isPending: isHeaderLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.header,
    queryFn: getHeader,
  });

  return {
    headerData,
    isHeaderLoading,
    error,
  };
}
