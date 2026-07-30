import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
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
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addSolution, addSolutionLoading } = useCreateSolution();
  const { updateSolution, updateSolutionLoading } = useUpdateSolution();

  const schema = useMemo(() => createSolutionSchema(t), [t]);

  const form = useForm<SolutionFormValues>({
    defaultValues: getSolutionDefaultValues(solutionToEdit),
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleAddEditSolution = async (data: SolutionFormValues) => {
    const [items] = await Promise.all([
      processFeaturedItemsMedia(data.items, uploadAttachment, "pages"),
    ]);

    const processedData: SolutionFormValues = {
      ...data,
      items,
    };

    const formData = buildSolutionFormData(processedData, {
      isEdit: isEditingSession,
    });

    if (isEditingSession) {
      updateSolution({
        id: solutionToEdit!.id,
        formData,
      });
    } else {
      addSolution(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(
      addSolutionLoading || updateSolutionLoading || uploadLoading,
    ),
    isEditingSession,
    handleAddEditSolution,
  };
}
