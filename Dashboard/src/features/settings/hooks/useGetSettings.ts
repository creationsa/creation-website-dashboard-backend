import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/getSettings";

export function useGetSettings() {
  const {
    data: settings,
    isPending: isSettingsLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.settings,
    queryFn: getSettings,
  });

  return {
    settings,
    isSettingsLoading,
    error,
  };
}
