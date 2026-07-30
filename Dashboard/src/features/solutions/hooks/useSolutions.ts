import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getSolutions } from "../api/getSolutions";

export function useSolutions(locale: LanguageType) {
  const {
    data: solutions,
    isPending: isSolutionsLoading,
    error,
  } = useQuery({
    queryKey: [...queryKeys.solutions, locale],
    queryFn: () => getSolutions(locale),
  });

  return {
    solutions,
    isSolutionsLoading,
    error,
  };
}
