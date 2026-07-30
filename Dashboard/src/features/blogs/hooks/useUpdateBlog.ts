import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { updateBlog as updateBlogApi } from "../api/updateBlog";

export function useUpdateBlog() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: updateBlog,
    isPending: updateBlogLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateBlogApi(id, formData),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.blogs,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.blog(variables.id),
      });

      toast.success(t("general.updated_done"));
      navigate(routes.blogs);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateBlog,
    updateBlogLoading,
    error,
  };
}
