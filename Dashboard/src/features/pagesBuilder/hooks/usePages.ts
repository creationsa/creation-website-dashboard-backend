import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../api/getPages";

export function usePages(locale: LanguageType) {
  const {
    data: pages,
    isPending: isPagesLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.pages, locale],
    queryFn: () => getPages(locale),
  });

  return {
    pages,
    isPagesLoading,
    error,
  };
}
