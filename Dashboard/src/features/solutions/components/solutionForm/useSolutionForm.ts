import type { MediaOnlyFeaturedItem } from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateSolution } from "../../hooks/useCreateSolution";
import { useUpdateSolution } from "../../hooks/useUpdateSolution";
import type { SingleSolution } from "../../types";
import { processFeaturedItemsMedia } from "../processFeaturedItemsMedia";
import { buildSolutionFormData } from "./buildSolutionFormData";
import getSolutionDefaultValues from "./getSolutionDefaultValues";
import {
  createSolutionSchema,
  type SolutionFormValues,
} from "./solutionSchema";

export default function useSolutionForm(solutionToEdit?: SingleSolution) {
  const isEditingSession = Boolean(solutionToEdit);

  const { t } = useTranslation();
  const { mutateAsync: uploadAttachment } = useUploadAttachment();
  const { addSolution, addSolutionLoading } = useCreateSolution();
  const { updateSolution, updateSolutionLoading } = useUpdateSolution();
  const [isUploading, setIsUploading] = useState(false);

  const schema = useMemo(() => createSolutionSchema(t), [t]);

  const form = useForm<SolutionFormValues>({
    defaultValues: getSolutionDefaultValues(solutionToEdit),
    resolver: zodResolver(schema) as Resolver<SolutionFormValues>,
    mode: "onTouched",
  });

  const handleAddEditSolution = async (data: SolutionFormValues) => {
    setIsUploading(true);
    try {
      const [items, cardIconFile] = await Promise.all([
        processFeaturedItemsMedia<MediaOnlyFeaturedItem>(
          data.items,
          uploadAttachment,
          "solutions",
        ),
        uploadIfFile(data.card_icon.file, uploadAttachment, "solutions"),
      ]);

      const processedData: SolutionFormValues = {
        ...data,
        items,
        card_icon: { ...data.card_icon, file: cardIconFile },
      };

      const formData = buildSolutionFormData(processedData, {
        isEdit: isEditingSession,
      });

      if (isEditingSession) {
        updateSolution(
          {
            id: solutionToEdit!.id,
            formData,
          },
          { onSuccess: () => form.reset(processedData) },
        );
      } else {
        addSolution(formData);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    isLoading: Boolean(
      isUploading || addSolutionLoading || updateSolutionLoading,
    ),
    isEditingSession,
    handleAddEditSolution,
  };
}
