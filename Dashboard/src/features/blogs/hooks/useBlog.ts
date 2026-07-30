import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../api/getBlog";

export function useBlog(id: number) {
  const {
    data: blog,
    isPending: isBlogLoading,
    error,
  } = useQuery({ queryKey: queryKeys.blog(id), queryFn: () => getBlog(id) });

  return {
    blog,
    isBlogLoading,
    error,
  };
}
