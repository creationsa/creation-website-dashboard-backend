import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { updateExistingPage } from "../api/updateExistingPage";

export function useUpdateExistingPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: updatePage,
    isPending: updatePageLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateExistingPage(id, formData),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pages,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.page(variables.id),
      });

      toast.success(t("general.updated_done"));
      navigate(routes.pagesBuilder);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updatePage,
    updatePageLoading,
    error,
  };
}
