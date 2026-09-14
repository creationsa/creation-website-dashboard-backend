import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { ListQueryParams } from "@/shared/types/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSolutions } from "../api/getSolutions";

export function useSolutions(locale: LanguageType, params: ListQueryParams) {
  const {
    data,
    isPending: isSolutionsLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.solutions, locale, params],
    queryFn: () => getSolutions(locale, params),
    placeholderData: keepPreviousData,
  });

  return {
    solutions: data?.data,
    meta: data?.meta,
    isSolutionsLoading,
    error,
  };
}
