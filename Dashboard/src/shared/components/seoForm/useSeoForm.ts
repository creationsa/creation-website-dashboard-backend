import { useAddSeoData } from "@/shared/hooks/useAddSeoData";
import { useUpdateSeoData } from "@/shared/hooks/useUpdateSeoData";
import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import type { Metadata } from "@/shared/types/seo";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import getSeoDefaultValues from "./getSeoDefaultValues";
import { createSeoSchema, type SeoFormValues } from "./SeoSchema";

function formatKeywords(keywords: string[]) {
  if (!keywords?.length) return "";

  return `{${keywords.map((keyword) => `"${keyword}"`).join(",")}}`;
}

export default function useSeoForm(seoData?: Metadata, forType?: string) {
  const isEditMode = Boolean(seoData?.id);
  const { t } = useTranslation();

  const schema = useMemo(() => createSeoSchema(t), [t]);

  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addSeo, addSeoLoading } = useAddSeoData();
  const { updateSeo, updateSeoLoading } = useUpdateSeoData();

  const form = useForm<SeoFormValues>({
    defaultValues: getSeoDefaultValues(seoData),
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleSubmitSeo = async (data: SeoFormValues) => {
    const [englishImage, arabicImage] = await Promise.all([
      uploadIfFile(data.image_en, uploadAttachment, "metadata"),
      uploadIfFile(data.image_ar, uploadAttachment, "metadata"),
    ]);
    const formData = new FormData();

    formData.append("for", forType || "");

    formData.append("en[title]", data.title_en);
    formData.append("ar[title]", data.title_ar);

    formData.append("en[description]", data.seo_desc_en);
    formData.append("ar[description]", data.seo_desc_ar);

    if (englishImage) {
      formData.append("en[image]", String(englishImage));
    }

    if (arabicImage) {
      formData.append("ar[image]", String(arabicImage));
    }

    formData.append("keywords", formatKeywords(data.keywords));

    if (isEditMode) {
      formData.append("_method", "PUT");
    }

    if (isEditMode) {
      updateSeo({
        id: seoData!.id,
        formData,
      });
    } else {
      addSeo(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(addSeoLoading || updateSeoLoading || uploadLoading),
    handleSubmitSeo,
    isEditMode,
  };
}
