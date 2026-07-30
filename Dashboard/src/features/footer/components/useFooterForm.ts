import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
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
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();

  const schema = useMemo(() => createFooterSchema(t), [t]);

  const form = useForm<FooterFormValues>({
    defaultValues: getFooterDefaultValues(footerToEdit),
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleUpdateFooter = async (data: FooterFormValues) => {
    const statement_image = await uploadIfFile(
      data.statement_image,
      uploadAttachment,
      "footer",
    );

    const formData = buildFooterFormData(data, {
      statement_image,
    });

    updateFooter(formData);
  };

  return {
    form,
    isLoading: Boolean(updateFooterLoading || uploadLoading),
    handleUpdateFooter,
  };
}
