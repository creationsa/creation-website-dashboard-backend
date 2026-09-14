import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getBlogsPicker } from "../api/getBlogsPicker";

export function useBlogsPicker() {
  const {
    data: blogs,
    isPending: isBlogsPickerLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.blogsPicker,
    queryFn: getBlogsPicker,
  });

  return {
    blogs,
    isBlogsPickerLoading,
    error,
  };
}
