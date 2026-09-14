import { queryKeys } from "@/shared/api/queryKeys";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getMenuOptions } from "../api/getMenuOptions";

export function useMenuOptions(locale: LanguageType) {
  const {
    data: menuOptions,
    isPending: isMenuOptionsLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.menuOptions(locale),
    queryFn: () => getMenuOptions(locale),
  });

  return {
    menuOptions,
    isMenuOptionsLoading,
    error,
  };
}
