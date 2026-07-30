import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { processMediaField } from "@/shared/utils/processMediaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import type { SingleProject } from "../../types";
import { buildProjectFormData } from "./buildProjectFormData";
import getProjectDefaultValues from "./getProjectDefaultValues";
import { createProjectSchema, type ProjectFormValues } from "./projectSchema";

export default function useProjectForm(projectToEdit?: SingleProject) {
  const isEditingSession = Boolean(projectToEdit);

  const { t } = useTranslation();
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addProject, addProjectLoading } = useCreateProject();
  const { updateProject, updateProjectLoading } = useUpdateProject();

  const schema = useMemo(() => createProjectSchema(t), [t]);

  const form = useForm<ProjectFormValues>({
    defaultValues: getProjectDefaultValues(projectToEdit),
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleAddEditProject = async (data: ProjectFormValues) => {
    const [
      first_cover_media,
      second_cover_media,
      first_media,
      second_media,
      third_media,
      fourth_media,
      fifth_media,
      sixth_media,
      seventh_media,
      eighth_media,
    ] = await Promise.all([
      processMediaField(uploadAttachment, "pages", data.first_cover_media),
      processMediaField(uploadAttachment, "pages", data.second_cover_media),
      processMediaField(uploadAttachment, "pages", data.first_media),
      processMediaField(uploadAttachment, "pages", data.second_media),
      processMediaField(uploadAttachment, "pages", data.third_media),
      processMediaField(uploadAttachment, "pages", data.fourth_media),
      processMediaField(uploadAttachment, "pages", data.fifth_media),
      processMediaField(uploadAttachment, "pages", data.sixth_media),
      processMediaField(uploadAttachment, "pages", data.seventh_media),
      processMediaField(uploadAttachment, "pages", data.eighth_media),
    ]);

    const processedData: ProjectFormValues = {
      ...data,
      first_cover_media,
      second_cover_media,
      first_media,
      second_media,
      third_media,
      fourth_media,
      fifth_media,
      sixth_media,
      seventh_media,
      eighth_media,
    };

    const formData = buildProjectFormData(processedData, {
      isEdit: isEditingSession,
    });

    if (isEditingSession) {
      updateProject({
        id: projectToEdit!.id,
        formData,
      });
    } else {
      addProject(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(
      addProjectLoading || updateProjectLoading || uploadLoading,
    ),
    isEditingSession,
    handleAddEditProject,
  };
}
