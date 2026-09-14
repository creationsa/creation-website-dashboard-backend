import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateFooter } from "../hooks/useUpdateFooter";
import type { FooterProps } from "../types";
import { buildFooterFormData } from "./buildFooterFormData";
import { createFooterSchema, type FooterFormValues } from "./footerSchema";
import getFooterDefaultValues from "./getFooterDefaultValues";

export default function useFooterForm(footerToEdit?: FooterProps) {
  const { t } = useTranslation();

  const { updateFooter, updateFooterLoading } = useUpdateFooter();
  const { mutateAsync: uploadAttachment } = useUploadAttachment();
  const [isUploading, setIsUploading] = useState(false);

  const schema = useMemo(() => createFooterSchema(t), [t]);

  const form = useForm<FooterFormValues>({
    defaultValues: getFooterDefaultValues(footerToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleUpdateFooter = async (data: FooterFormValues) => {
    setIsUploading(true);
    try {
      const [statement_image, ...badge_images] = await Promise.all([
        uploadIfFile(data.statement_image, uploadAttachment, "footer"),
        ...data.badges.map((badge) =>
          uploadIfFile(badge.image, uploadAttachment, "footer"),
        ),
      ]);

      const processedData: FooterFormValues = {
        ...data,
        statement_image,
        badges: data.badges.map((badge, index) => ({
          ...badge,
          image: badge_images[index],
        })),
      };

      const formData = buildFooterFormData(processedData, {
        statement_image,
        badge_images,
      });

      updateFooter(formData, {
        onSuccess: () => form.reset(processedData),
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    isLoading: Boolean(updateFooterLoading || isUploading),
    handleUpdateFooter,
  };
}
