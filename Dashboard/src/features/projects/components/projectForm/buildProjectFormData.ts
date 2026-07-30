import { appendMediaObject } from "@/shared/utils/appendMediaObject";
import type { ProjectFormValues } from "./projectSchema";

interface BuildProjectFormDataOptions {
  isEdit?: boolean;
}

export function buildProjectFormData(
  values: ProjectFormValues,
  options: BuildProjectFormDataOptions = {},
) {
  const { isEdit } = options;

  const formData = new FormData();

  // 1. Text & Basic Info
  formData.append("title_en", values.title_en || "");
  formData.append("title_ar", values.title_ar || "");
  formData.append("slug_en", values.slug_en || "");
  formData.append("seo_desc_en", values.seo_desc_en || "");
  formData.append("seo_desc_ar", values.seo_desc_ar || "");

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

  // 2. Stats Section
  formData.append("stats_title_en", values.stats_title_en || "");
  formData.append("stats_title_ar", values.stats_title_ar || "");
  formData.append("stat_one_value", values.stat_one_value || "");
  formData.append("stat_one_label_en", values.stat_one_label_en || "");
  formData.append("stat_one_label_ar", values.stat_one_label_ar || "");
  formData.append("stat_two_value", values.stat_two_value || "");
  formData.append("stat_two_label_en", values.stat_two_label_en || "");
  formData.append("stat_two_label_ar", values.stat_two_label_ar || "");
  formData.append("stat_three_value", values.stat_three_value || "");
  formData.append("stat_three_label_en", values.stat_three_label_en || "");
  formData.append("stat_three_label_ar", values.stat_three_label_ar || "");

  // 3. Media Objects Append
  appendMediaObject(formData, "first_cover_media", values.first_cover_media);
  appendMediaObject(formData, "second_cover_media", values.second_cover_media);

  appendMediaObject(formData, "first_media", values.first_media);
  appendMediaObject(formData, "second_media", values.second_media);
  appendMediaObject(formData, "third_media", values.third_media);
  appendMediaObject(formData, "fourth_media", values.fourth_media);
  appendMediaObject(formData, "fifth_media", values.fifth_media);
  appendMediaObject(formData, "sixth_media", values.sixth_media);
  appendMediaObject(formData, "seventh_media", values.seventh_media);
  appendMediaObject(formData, "eighth_media", values.eighth_media);

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
