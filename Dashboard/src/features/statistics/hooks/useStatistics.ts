import { queryKeys } from "@/shared/api/queryKeys";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api/getStatistics";

export function useStatistics() {
  const locale = useLanguage();

  const {
    data: statisticsData,
    isPending: isStatisticsLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.statistics(locale),
    queryFn: getStatistics,
  });

  return {
    statisticsData,
    isStatisticsLoading,
    error,
  };
}
