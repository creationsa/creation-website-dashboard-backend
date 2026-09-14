import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateSettings } from "../../hooks/useUpdateSettings";
import type { SettingItem } from "../../types";
import { buildSettingsFormData } from "./buildSettingsFormData";
import getSettingsDefaultValues from "./getSettingsDefaultValues";
import {
  createSettingsSchema,
  type SettingsFormValues,
} from "./settingsSchema";
import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";

export default function useSettingsForm(settingsToEdit?: SettingItem) {
  const { t } = useTranslation();

  const { updateSettings, updateSettingsLoading } = useUpdateSettings();
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();

  const schema = useMemo(() => createSettingsSchema(t), [t]);

  const form = useForm<SettingsFormValues>({
    defaultValues: getSettingsDefaultValues(settingsToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleUpdateSettings = async (data: SettingsFormValues) => {
    const [logo_en, logo_ar] = await Promise.all([
      uploadIfFile(data.logo_en, uploadAttachment, "settings"),
      uploadIfFile(data.logo_ar, uploadAttachment, "settings"),
    ]);

    const processedData: SettingsFormValues = {
      ...data,
      logo_en,
      logo_ar,
    };

    const formData = buildSettingsFormData(processedData, {
      logo_en,
      logo_ar,
    });

    updateSettings(formData, {
      onSuccess: () => form.reset(processedData),
    });
  };

  return {
    form,
    isLoading: Boolean(updateSettingsLoading || uploadLoading),
    handleUpdateSettings,
  };
}
