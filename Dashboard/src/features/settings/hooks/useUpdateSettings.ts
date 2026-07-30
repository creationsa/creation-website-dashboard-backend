import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateSettings as updateSettingsApi } from "../api/updateSettings";

export function useUpdateSettings() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateSettings,
    isPending: updateSettingsLoading,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => updateSettingsApi(formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.settings,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateSettings,
    updateSettingsLoading,
    error,
  };
}
