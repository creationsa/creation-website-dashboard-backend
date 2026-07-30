import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateProjectsMainData } from "../../hooks/useCreateProjectsMainData";
import { useUpdateProjectsMainData } from "../../hooks/useUpdateProjectsMainData";
import type { ProjectsMainDataProps } from "../../types";
import { buildProjectsMainFormData } from "./buildProjectsMainFormData";
import getProjectsDefaultValues from "./getMainProjectsFormDefaultValues";
import {
  createProjectsSchema,
  type ProjectsFormValues,
} from "./mainProjectsFormSchema";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";

export default function useProjectsForm(
  projectMainDataToEdit?: ProjectsMainDataProps,
) {
  const isEditingSession = Boolean(projectMainDataToEdit);

  const { t } = useTranslation();
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addProjectsMainData, addProjectsLoading } =
    useCreateProjectsMainData();
  const { updateProjectData, updateProjectsLoading } =
    useUpdateProjectsMainData();

  const schema = useMemo(() => createProjectsSchema(t), [t]);

  const form = useForm<ProjectsFormValues>({
    defaultValues: getProjectsDefaultValues(projectMainDataToEdit),
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleAddEditProject = async (data: ProjectsFormValues) => {
    const uploadedLogos = await Promise.all(
      (data.logos_section?.logos || []).map(async (logoItem) => {
        const uploadedImageUrl = await uploadIfFile(
          logoItem.logo_image,
          uploadAttachment,
          "pages",
        );

        return {
          ...logoItem,
          logo_image: uploadedImageUrl,
        };
      }),
    );

    const formattedData: ProjectsFormValues = {
      ...data,
      logos_section: {
        ...data.logos_section,
        logos: uploadedLogos,
      },
    };

    const formData = buildProjectsMainFormData(formattedData, {
      isEdit: isEditingSession,
    });

    if (isEditingSession) {
      updateProjectData(formData);
    } else {
      addProjectsMainData(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(
      addProjectsLoading || updateProjectsLoading || uploadLoading,
    ),
    isEditingSession,
    handleAddEditProject,
  };
}
