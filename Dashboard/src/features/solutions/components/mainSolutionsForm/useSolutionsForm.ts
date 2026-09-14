import type { FeaturedItem } from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { processMediaField } from "@/shared/utils/processMediaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateSolutionsMainData } from "../../hooks/useCreateSolutionsMainData";
import { useUpdateSolutionsMainData } from "../../hooks/useUpdateSolutionsMainData";
import type { SolutionsMainDataProps } from "../../types";
import { processFeaturedItemsMedia } from "../processFeaturedItemsMedia";
import { buildSolutionsMainFormData } from "./buildSolutionsMainFormData";
import getMainSolutionsFormDefaultValues from "./getMainSolutionsFormDefaultValues";
import {
  createSolutionsSchema,
  type SolutionsFormValues,
} from "./mainSolutionsFormSchema";

export default function useSolutionsForm(
  solutionMainDataToEdit?: SolutionsMainDataProps,
) {
  const isEditingSession = Boolean(solutionMainDataToEdit);

  const { t } = useTranslation();
  const { mutateAsync: uploadAttachment } = useUploadAttachment();
  const { addSolutionsMainData, addSolutionsLoading } =
    useCreateSolutionsMainData();
  const { updateSolutionsData, updateSolutionsLoading } =
    useUpdateSolutionsMainData();
  const [isUploading, setIsUploading] = useState(false);

  const schema = useMemo(() => createSolutionsSchema(t), [t]);

  const form = useForm<SolutionsFormValues>({
    defaultValues: getMainSolutionsFormDefaultValues(solutionMainDataToEdit),
    resolver: zodResolver(schema) as Resolver<SolutionsFormValues>,
    mode: "onTouched",
  });

  const handleAddEditSolutionsData = async (data: SolutionsFormValues) => {
    setIsUploading(true);
    try {
      const [items, accordion_media] = await Promise.all([
        processFeaturedItemsMedia<FeaturedItem>(
          data.items,
          uploadAttachment,
          "solutions",
        ),
        processMediaField(uploadAttachment, "solutions", data.accordion_media),
      ]);
      const processedData: SolutionsFormValues = {
        ...data,
        items,
        accordion_media,
      };
      const formData = buildSolutionsMainFormData(processedData, {
        isEdit: isEditingSession,
      });

      if (isEditingSession) {
        updateSolutionsData(formData, {
          onSuccess: () => form.reset(processedData),
        });
      } else {
        addSolutionsMainData(formData);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    isLoading: Boolean(
      isUploading || addSolutionsLoading || updateSolutionsLoading,
    ),
    isEditingSession,
    handleAddEditSolutionsData,
  };
}
