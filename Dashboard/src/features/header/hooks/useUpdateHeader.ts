import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateHeader as updateHeaderApi } from "../api/updateHeader";

export function useUpdateHeader() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateHeader,
    isPending: updateHeaderLoading,
    error,
  } = useMutation({
    mutationFn: updateHeaderApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.header,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateHeader,
    updateHeaderLoading,
    error,
  };
}
