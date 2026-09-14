import type { ProjectsFormValues } from "./mainProjectsFormSchema";

interface BuildProjectFormDataOptions {
  isEdit?: boolean;
}

export function buildProjectsMainFormData(
  values: ProjectsFormValues,
  options: BuildProjectFormDataOptions = {},
) {
  const { isEdit } = options;

  const formData = new FormData();

  formData.append("first_title_en", values.first_title_en || "");
  formData.append("first_title_ar", values.first_title_ar || "");
  formData.append("second_title_en", values.second_title_en || "");
  formData.append("second_title_ar", values.second_title_ar || "");
  formData.append("third_title_en", values.third_title_en || "");
  formData.append("third_title_ar", values.third_title_ar || "");

  formData.append(
    "overview_description_en",
    values.overview_description_en || "",
  );
  formData.append(
    "overview_description_ar",
    values.overview_description_ar || "",
  );

  formData.append("nav_title_en", values.nav_title_en || "");
  formData.append("nav_title_ar", values.nav_title_ar || "");
  formData.append("slug_en", values.slug_en || "");

  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
}
