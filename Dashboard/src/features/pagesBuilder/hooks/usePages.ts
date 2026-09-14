import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { ListQueryParams } from "@/shared/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPages } from "../api/getPages";

export function usePages(locale: LanguageType, params: ListQueryParams) {
  const {
    data,
    isPending: isPagesLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.pages, locale, params],
    queryFn: () => getPages(locale, params),
    placeholderData: keepPreviousData,
  });

  return {
    pages: data?.data,
    meta: data?.meta,
    isPagesLoading,
    error,
  };
}
