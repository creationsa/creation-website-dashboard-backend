import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateClients } from "../../hooks/useUpdateClients";
import type { ClientsProps } from "../../types";
import { buildClientsFormData } from "./buildClientsFormData";
import { createClientsSchema, type ClientsFormValues } from "./clientsSchema";
import getClientsDefaultValues from "./getClientsDefaultValues";

export default function useClientsForm(clientsToEdit?: ClientsProps) {
  const { t } = useTranslation();

  const { updateClients, updateClientsLoading } = useUpdateClients();
  const { mutateAsync: uploadAttachment } = useUploadAttachment();
  const [isUploading, setIsUploading] = useState(false);

  const schema = useMemo(() => createClientsSchema(t), [t]);

  const form = useForm<ClientsFormValues>({
    defaultValues: getClientsDefaultValues(clientsToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleUpdateClients = async (data: ClientsFormValues) => {
    setIsUploading(true);
    try {
      const logos = await Promise.all(
        data.logos.map(async (logo) => ({
          ...logo,
          logo_image: await uploadIfFile(
            logo.logo_image,
            uploadAttachment,
            "clients",
          ),
        })),
      );

      const processedData: ClientsFormValues = { ...data, logos };

      const formData = buildClientsFormData(processedData);

      updateClients(formData, {
        onSuccess: () => form.reset(processedData),
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    isLoading: Boolean(updateClientsLoading || isUploading),
    handleUpdateClients,
  };
}
