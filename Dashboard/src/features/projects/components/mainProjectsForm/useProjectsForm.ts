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

export default function useProjectsForm(
  projectMainDataToEdit?: ProjectsMainDataProps,
) {
  const isEditingSession = Boolean(projectMainDataToEdit);

  const { t } = useTranslation();
  const { addProjectsMainData, addProjectsLoading } =
    useCreateProjectsMainData();
  const { updateProjectData, updateProjectsLoading } =
    useUpdateProjectsMainData();

  const schema = useMemo(() => createProjectsSchema(t), [t]);

  const form = useForm<ProjectsFormValues>({
    defaultValues: getProjectsDefaultValues(projectMainDataToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleAddEditProject = async (data: ProjectsFormValues) => {
    const formData = buildProjectsMainFormData(data, {
      isEdit: isEditingSession,
    });

    if (isEditingSession) {
      updateProjectData(formData, {
        onSuccess: () => form.reset(data),
      });
    } else {
      addProjectsMainData(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(addProjectsLoading || updateProjectsLoading),
    isEditingSession,
    handleAddEditProject,
  };
}
