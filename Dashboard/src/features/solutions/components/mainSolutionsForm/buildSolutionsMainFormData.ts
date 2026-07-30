import { appendMediaObject } from "@/shared/utils/appendMediaObject";
import type { SolutionsFormValues } from "./mainSolutionsFormSchema";

interface BuildSolutionFormDataOptions {
  isEdit?: boolean;
}

export function buildSolutionsMainFormData(
  values: SolutionsFormValues,
  options: BuildSolutionFormDataOptions = {},
) {
  const { isEdit } = options;

  const formData = new FormData();

  formData.append("first_title_en", values.first_title_en || "");
  formData.append("first_title_ar", values.first_title_ar || "");
  formData.append("second_title_en", values.second_title_en || "");
  formData.append("second_title_ar", values.second_title_ar || "");
  formData.append("third_title_en", values.third_title_en || "");
  formData.append("third_title_ar", values.third_title_ar || "");

  formData.append("core_desc_en", values.core_desc_en || "");
  formData.append("core_desc_ar", values.core_desc_ar || "");

  formData.append(
    "items_header_first_title_en",
    values.items_header.first_title_en || "",
  );
  formData.append(
    "items_header_first_title_ar",
    values.items_header.first_title_ar || "",
  );
  formData.append(
    "items_header_second_title_en",
    values.items_header.second_title_en || "",
  );
  formData.append(
    "items_header_second_title_ar",
    values.items_header.second_title_ar || "",
  );
  formData.append(
    "items_header_third_title_en",
    values.items_header.third_title_en || "",
  );
  formData.append(
    "items_header_third_title_ar",
    values.items_header.third_title_ar || "",
  );

  values.items?.forEach((item, index) => {
    appendMediaObject(
      formData,
      `items[${index}][feature_media]`,
      item.feature_media,
    );

    formData.append(`items[${index}][item_title_en]`, item.item_title_en || "");
    formData.append(`items[${index}][item_title_ar]`, item.item_title_ar || "");
    formData.append(`items[${index}][item_slug_en]`, item.item_slug_en || "");
  });

  values.ticker_items?.forEach((item, index) => {
    if (item.text_en)
      formData.append(`ticker_items[${index}][text_en]`, item.text_en);
    if (item.text_ar)
      formData.append(`ticker_items[${index}][text_ar]`, item.text_ar);
  });

  values.accordion_items?.forEach((item, index) => {
    formData.append(`accordion_items[${index}][title_en]`, item.title_en);
    formData.append(`accordion_items[${index}][title_ar]`, item.title_ar);
    formData.append(`accordion_items[${index}][content_en]`, item.content_en);
    formData.append(`accordion_items[${index}][content_ar]`, item.content_ar);
  });

  appendMediaObject(formData, "accordion_media", values.accordion_media);

  formData.append(
    "accordion_items_header_first_title_ar ",
    values.accordion_items_header.first_title_ar || "",
  );
  formData.append(
    "accordion_items_header_first_title_en ",
    values.accordion_items_header.first_title_en || "",
  );
  formData.append(
    "accordion_items_header_second_title_ar ",
    values.accordion_items_header.second_title_ar || "",
  );
  formData.append(
    "accordion_items_header_second_title_en ",
    values.accordion_items_header.second_title_en || "",
  );
  formData.append(
    "accordion_items_header_third_title_ar ",
    values.accordion_items_header.third_title_ar || "",
  );
  formData.append(
    "accordion_items_header_third_title_en ",
    values.accordion_items_header.third_title_en || "",
  );

  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
}
