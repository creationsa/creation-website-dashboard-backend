import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateFooter as updateFooterApi } from "../api/updateFooter";

export function useUpdateFooter() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateFooter,
    isPending: updateFooterLoading,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => updateFooterApi(formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.footer,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateFooter,
    updateFooterLoading,
    error,
  };
}
