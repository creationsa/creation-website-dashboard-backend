import type { PageFormValues } from "../components/pagesBuilderForm/pageSchema";

interface BuildPageFormDataOptions {
  isEdit?: boolean;
}

export function buildPageFormData(
  values: PageFormValues,
  options: BuildPageFormDataOptions = {},
) {
  const { isEdit } = options;

  const formData = new FormData();

  formData.append("en[title]", values.page_title_en);
  formData.append("ar[title]", values.page_title_ar);
  formData.append("slug", values.page_slug_en);
  formData.append("is_home", values.is_home ? "1" : "0");

  formData.append("sections", JSON.stringify(values.sections));

  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
}
