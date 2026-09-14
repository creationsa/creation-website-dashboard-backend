import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { processMediaField } from "@/shared/utils/processMediaField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
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
  const { mutateAsync: uploadAttachment } = useUploadAttachment();
  const { addProject, addProjectLoading } = useCreateProject();
  const { updateProject, updateProjectLoading } = useUpdateProject();
  const [isUploading, setIsUploading] = useState(false);

  const schema = useMemo(() => createProjectSchema(t), [t]);

  const form = useForm<ProjectFormValues>({
    defaultValues: getProjectDefaultValues(projectToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleAddEditProject = async (data: ProjectFormValues) => {
    setIsUploading(true);
    try {
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
        processMediaField(uploadAttachment, "projects", data.first_cover_media),
        processMediaField(
          uploadAttachment,
          "projects",
          data.second_cover_media,
        ),
        processMediaField(uploadAttachment, "projects", data.first_media),
        processMediaField(uploadAttachment, "projects", data.second_media),
        processMediaField(uploadAttachment, "projects", data.third_media),
        processMediaField(uploadAttachment, "projects", data.fourth_media),
        processMediaField(uploadAttachment, "projects", data.fifth_media),
        processMediaField(uploadAttachment, "projects", data.sixth_media),
        processMediaField(uploadAttachment, "projects", data.seventh_media),
        processMediaField(uploadAttachment, "projects", data.eighth_media),
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
        updateProject(
          {
            id: projectToEdit!.id,
            formData,
          },
          { onSuccess: () => form.reset(processedData) },
        );
      } else {
        addProject(formData);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    isLoading: Boolean(
      isUploading || addProjectLoading || updateProjectLoading,
    ),
    isEditingSession,
    handleAddEditProject,
  };
}
