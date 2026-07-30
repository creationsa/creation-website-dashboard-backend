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

  if (values.logos_section) {
    formData.append(
      "logos_section[title_en]",
      values.logos_section.title_en || "",
    );
    formData.append(
      "logos_section[title_ar]",
      values.logos_section.title_ar || "",
    );

    values.logos_section.logos?.forEach((logo, index) => {
      if (logo.logo_image) {
        formData.append(
          `logos_section[logos][${index}][logo_image]`,
          logo.logo_image,
        );
      }
      formData.append(
        `logos_section[logos][${index}][alt_en]`,
        logo.alt_en || "",
      );
      formData.append(
        `logos_section[logos][${index}][alt_ar]`,
        logo.alt_ar || "",
      );
    });
  }

  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
}
