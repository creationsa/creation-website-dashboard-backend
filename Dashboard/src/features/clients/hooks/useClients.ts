import { queryKeys } from "@/shared/api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../api/getClients";

export function useClients() {
  const {
    data: clientsData,
    isPending: isClientsLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.clients,
    queryFn: getClients,
  });

  return {
    clientsData,
    isClientsLoading,
    error,
  };
}
