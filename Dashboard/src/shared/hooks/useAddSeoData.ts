import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { queryKeys } from "../api/queryKeys";
import { addSeoData as addSeoDataApi } from "../api/addSeoData";

export function useAddSeoData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: addSeo,
    isPending: addSeoLoading,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => addSeoDataApi(formData),

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
    addSeo,
    addSeoLoading,
    error,
  };
}
