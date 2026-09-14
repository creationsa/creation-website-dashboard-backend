import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateClients as updateClientsApi } from "../api/updateClients";

export function useUpdateClients() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateClients,
    isPending: updateClientsLoading,
    error,
  } = useMutation({
    mutationFn: updateClientsApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.clients,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateClients,
    updateClientsLoading,
    error,
  };
}
