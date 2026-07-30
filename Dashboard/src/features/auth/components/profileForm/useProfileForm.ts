import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LoginResponse } from "../../types";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { createProfileSchema, type ProfileFormValues } from "./profileSchema";

export function useProfileForm(profile: LoginResponse) {
  const { t } = useTranslation();
  const { updateProfile, isUpdateProfileLoading } = useUpdateProfile();

  const schema = useMemo(() => createProfileSchema(t), [t]);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: profile.full_name,
      email: profile.email,
      phone_code: profile.phone_code,
      phone: profile.phone,
      gender: profile.gender,
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone_code", data.phone_code);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("_method", "PUT");

    updateProfile({ formData });
  };

  return {
    form,
    onSubmit,
    isUpdateProfileLoading,
  };
}
