import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateBlogsMainData as updateBlogsMainDataApi } from "../api/updateBlogsMainData";

export function useUpdateBlogsMainData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateBlogsMainData,
    isPending: updateBlogsMainDataLoading,
    error,
  } = useMutation({
    mutationFn: updateBlogsMainDataApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.blogsMainData,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateBlogsMainData,
    updateBlogsMainDataLoading,
    error,
  };
}
