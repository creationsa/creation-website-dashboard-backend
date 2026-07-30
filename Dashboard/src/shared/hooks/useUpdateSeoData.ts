import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { queryKeys } from "../api/queryKeys";
import { updateSeoData as updateSeoDataApi } from "../api/updateSeoData";

export function useUpdateSeoData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateSeo,
    isPending: updateSeoLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateSeoDataApi(id, formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.seoModal("blogs"),
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateSeo,
    updateSeoLoading,
    error,
  };
}
