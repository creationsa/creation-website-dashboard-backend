import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/getBlogs";

export function useBlogs(locale: LanguageType) {
  const {
    data: blogs,
    isPending: isBlogsLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.blogs, locale],
    queryFn: () => getBlogs(locale),
  });

  return {
    blogs,
    isBlogsLoading,
    error,
  };
}
