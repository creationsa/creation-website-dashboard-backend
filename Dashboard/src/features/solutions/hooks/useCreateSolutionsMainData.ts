import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createSolutionsMainData } from "../api/createSolutionsMainData";

export function useCreateSolutionsMainData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: addSolutionsMainData,
    isPending: addSolutionsLoading,
    error,
  } = useMutation({
    mutationFn: createSolutionsMainData,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.solutionsMainData,
      });
      toast.success(t("general.created_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    addSolutionsMainData,
    addSolutionsLoading,
    error,
  };
}
