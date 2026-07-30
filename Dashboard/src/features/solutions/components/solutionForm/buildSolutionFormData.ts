import { appendMediaObject } from "@/shared/utils/appendMediaObject";
import type { SolutionFormValues } from "./solutionSchema";

interface BuildSolutionFormDataOptions {
  isEdit?: boolean;
}

export function buildSolutionFormData(
  values: SolutionFormValues,
  options: BuildSolutionFormDataOptions = {},
) {
  const { isEdit } = options;

  const formData = new FormData();

  // 1. Text & Basic Info
  formData.append("title_en", values.title_en || "");
  formData.append("title_ar", values.title_ar || "");
  formData.append("slug_en", values.slug_en || "");

  formData.append("first_title_en", values.first_title_en || "");
  formData.append("first_title_ar", values.first_title_ar || "");
  formData.append("second_title_en", values.second_title_en || "");
  formData.append("second_title_ar", values.second_title_ar || "");
  formData.append("third_title_en", values.third_title_en || "");
  formData.append("third_title_ar", values.third_title_ar || "");

  formData.append("proposition_title_en", values.proposition_title_en || "");
  formData.append("proposition_title_ar", values.proposition_title_ar || "");
  formData.append("proposition_desc_en", values.proposition_desc_en || "");
  formData.append("proposition_desc_ar", values.proposition_desc_ar || "");

  formData.append("execution_title_en", values.execution_title_en || "");
  formData.append("execution_title_ar", values.execution_title_ar || "");

  values.execution_keys?.forEach((item, index) => {
    formData.append(`executionKeys[${index}][label_en]`, item.label_en || "");
    formData.append(`executionKeys[${index}][label_ar]`, item.label_ar || "");
    formData.append(`executionKeys[${index}][value_en]`, item.value_en || "");
    formData.append(`executionKeys[${index}][value_ar]`, item.value_ar || "");
  });

  values.items?.forEach((item, index) => {
    appendMediaObject(
      formData,
      `items[${index}][feature_media]`,
      item.feature_media,
    );
  });

  values.ticker_items?.forEach((item, index) => {
    if (item.text_en)
      formData.append(`ticker_items[${index}][text_en]`, item.text_en);
    if (item.text_ar)
      formData.append(`ticker_items[${index}][text_ar]`, item.text_ar);
  });

  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
}
