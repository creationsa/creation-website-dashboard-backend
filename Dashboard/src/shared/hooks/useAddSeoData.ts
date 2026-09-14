import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { addSeoData as addSeoDataApi } from "../api/addSeoData";

export function useAddSeoData() {
  const { t } = useTranslation();

  const {
    mutate: addSeo,
    isPending: addSeoLoading,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => addSeoDataApi(formData),
    onSuccess: () => {
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
