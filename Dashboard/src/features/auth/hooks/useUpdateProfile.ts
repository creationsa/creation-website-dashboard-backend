import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateProfile as updateProfileApi } from "../api/updateProfile";

export function useUpdateProfile() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isPending: isUpdateProfileLoading,
    error,
  } = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      updateProfileApi(formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateProfile,
    isUpdateProfileLoading,
    error,
  };
}
