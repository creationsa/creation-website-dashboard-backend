import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { processMediaField } from "@/shared/utils/processMediaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
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
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addSolutionsMainData, addSolutionsLoading } =
    useCreateSolutionsMainData();
  const { updateSolutionsData, updateSolutionsLoading } =
    useUpdateSolutionsMainData();

  const schema = useMemo(() => createSolutionsSchema(t), [t]);

  const form = useForm<SolutionsFormValues>({
    defaultValues: getMainSolutionsFormDefaultValues(solutionMainDataToEdit),
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleAddEditSolutionsData = async (data: SolutionsFormValues) => {
    const [items, accordion_media] = await Promise.all([
      processFeaturedItemsMedia(data.items, uploadAttachment, "pages"),
      processMediaField(uploadAttachment, "pages", data.accordion_media),
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
      updateSolutionsData(formData);
    } else {
      addSolutionsMainData(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(
      addSolutionsLoading || updateSolutionsLoading || uploadLoading,
    ),
    isEditingSession,
    handleAddEditSolutionsData,
  };
}
