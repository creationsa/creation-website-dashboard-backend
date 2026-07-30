import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateSolutionsMainData as updateSolutionsMainDataApi } from "../api/updateSolutionsMainData";

export function useUpdateSolutionsMainData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateSolutionsData,
    isPending: updateSolutionsLoading,
    error,
  } = useMutation({
    mutationFn: updateSolutionsMainDataApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.solutionsMainData,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateSolutionsData,
    updateSolutionsLoading,
    error,
  };
}
