import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { ListQueryParams } from "@/shared/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/getBlogs";

export function useBlogs(locale: LanguageType, params: ListQueryParams) {
  const {
    data,
    isPending: isBlogsLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.blogs, locale, params],
    queryFn: () => getBlogs(locale, params),
    placeholderData: keepPreviousData,
  });

  return {
    blogs: data?.data,
    meta: data?.meta,
    isBlogsLoading,
    error,
  };
}
