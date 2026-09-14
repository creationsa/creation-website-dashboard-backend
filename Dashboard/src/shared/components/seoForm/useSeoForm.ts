import { queryKeys } from "@/shared/api/queryKeys";
import { useAddSeoData } from "@/shared/hooks/useAddSeoData";
import { useUpdateSeoData } from "@/shared/hooks/useUpdateSeoData";
import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import type { Metadata } from "@/shared/components/seoForm/types";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import getSeoDefaultValues from "./getSeoDefaultValues";
import { createSeoSchema, type SeoFormValues } from "./SeoSchema";

function formatKeywords(keywords: string[]) {
  if (!keywords?.length) return "";

  return `{${keywords.map((keyword) => `"${keyword}"`).join(",")}}`;
}

export default function useSeoForm(
  seoData?: Metadata,
  forType?: string,
  metadataId?: number,
  metadataableType?: "page" | "project" | "solution",
) {
  const isEditMode = Boolean(seoData?.id);
  const isLinkedRecord = Boolean(metadataableType);
  const isHomeForm = forType === "home";
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const schema = useMemo(
    () => createSeoSchema(t, isLinkedRecord, isHomeForm),
    [t, isLinkedRecord, isHomeForm],
  );

  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addSeo, addSeoLoading } = useAddSeoData();
  const { updateSeo, updateSeoLoading } = useUpdateSeoData();

  const form = useForm<SeoFormValues>({
    defaultValues: getSeoDefaultValues(seoData),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleSubmitSeo = async (data: SeoFormValues) => {
    const [englishImage, arabicImage] = await Promise.all([
      uploadIfFile(data.image_en, uploadAttachment, "metadata"),
      uploadIfFile(data.image_ar, uploadAttachment, "metadata"),
    ]);

    const englishImageType =
      data.image_en instanceof File ? data.image_en.type : data.image_type_en;
    const arabicImageType =
      data.image_ar instanceof File ? data.image_ar.type : data.image_type_ar;

    const formData = new FormData();

    if (forType) {
      formData.append("for", forType);
    }

    if (metadataId) {
      formData.append("metadataable_id", String(metadataId));
      formData.append("metadataable_type", metadataableType || "");
    }

    formData.append("en[title]", data.title_en);
    formData.append("ar[title]", data.title_ar);

    formData.append("en[description]", data.seo_desc_en);
    formData.append("ar[description]", data.seo_desc_ar);

    if (englishImage) {
      formData.append("en[image]", String(englishImage));
      formData.append("en[image_alt]", data.image_alt_en || "");
      formData.append("en[image_type]", englishImageType || "");
    }

    if (arabicImage) {
      formData.append("ar[image]", String(arabicImage));
      formData.append("ar[image_alt]", data.image_alt_ar || "");
      formData.append("ar[image_type]", arabicImageType || "");
    }

    if (isHomeForm) {
      formData.append("en[site_name]", data.site_name_en || "");
      formData.append("ar[site_name]", data.site_name_ar || "");
    }

    formData.append("keywords", formatKeywords(data.keywords));

    if (isEditMode) {
      formData.append("_method", "PUT");
    }

    const invalidateAfterSave = () => {
      form.reset({
        ...data,
        image_en: englishImage,
        image_ar: arabicImage,
        image_type_en: englishImageType,
        image_type_ar: arabicImageType,
      });

      if (forType) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.seoModal(forType),
        });
      }
      if (metadataId && metadataableType === "page") {
        queryClient.invalidateQueries({ queryKey: queryKeys.page(metadataId) });
      } else if (metadataId && metadataableType === "project") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.project(metadataId),
        });
      } else if (metadataId && metadataableType === "solution") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.solution(metadataId),
        });
      }
    };

    if (isEditMode) {
      updateSeo(
        {
          id: seoData!.id,
          formData,
        },
        { onSuccess: invalidateAfterSave },
      );
    } else {
      addSeo(formData, { onSuccess: invalidateAfterSave });
    }
  };

  return {
    form,
    isLoading: Boolean(addSeoLoading || updateSeoLoading || uploadLoading),
    handleSubmitSeo,
    isEditMode,
  };
}
