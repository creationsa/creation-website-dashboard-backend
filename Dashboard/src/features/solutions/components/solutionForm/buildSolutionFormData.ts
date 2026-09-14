import { appendMediaObject } from "@/shared/utils/appendMediaObject";
import type { SolutionFormValues } from "./solutionSchema";

function appendCardIcon(
  formData: FormData,
  cardIcon: SolutionFormValues["card_icon"],
) {
  if (typeof cardIcon.file === "string") {
    formData.append("card_icon[file]", cardIcon.file);
  }
  formData.append("card_icon[alt_en]", cardIcon.alt_en || "");
  formData.append("card_icon[alt_ar]", cardIcon.alt_ar || "");
}

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
  formData.append("small_description_en", values.small_description_en || "");
  formData.append("small_description_ar", values.small_description_ar || "");

  appendCardIcon(formData, values.card_icon);

  formData.append("execution_title_en", values.execution_title_en || "");
  formData.append("execution_title_ar", values.execution_title_ar || "");

  values.execution_keys?.forEach((item, index) => {
    formData.append(`execution_keys[${index}][label_en]`, item.label_en || "");
    formData.append(`execution_keys[${index}][label_ar]`, item.label_ar || "");
    formData.append(`execution_keys[${index}][value_en]`, item.value_en || "");
    formData.append(`execution_keys[${index}][value_ar]`, item.value_ar || "");
  });

  values.items?.forEach((item, index) => {
    formData.append(`items[${index}][source]`, item.source);

    if (item.source === "project") {
      formData.append(`items[${index}][project_id]`, String(item.project_id));
      if (item.project_media_field) {
        formData.append(
          `items[${index}][project_media_field]`,
          item.project_media_field,
        );
      }
      return;
    }

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
