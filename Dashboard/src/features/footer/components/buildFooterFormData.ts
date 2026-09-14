import type { FooterFormValues } from "./footerSchema";

interface BuildFooterFormDataOptions {
  statement_image?: string;
  badge_images?: string[];
}

export function buildFooterFormData(
  values: FooterFormValues,
  options: BuildFooterFormDataOptions = {},
) {
  const { statement_image, badge_images } = options;

  const formData = new FormData();

  if (statement_image) {
    formData.append("statement_image[media]", String(statement_image));
  }

  formData.append("en[statement_desc]", values.statement_desc_en);
  formData.append("ar[statement_desc]", values.statement_desc_ar);
  formData.append("en[statement_image_alt]", values.statement_image_alt_en);
  formData.append("ar[statement_image_alt]", values.statement_image_alt_ar);

  formData.append("en[description]", values.description_en);
  formData.append("ar[description]", values.description_ar);
  formData.append("en[tagline]", values.tagline_en);
  formData.append("ar[tagline]", values.tagline_ar);
  formData.append("en[menu_title]", values.menu_title_en);
  formData.append("ar[menu_title]", values.menu_title_ar);
  formData.append("en[social_title]", values.social_title_en);
  formData.append("ar[social_title]", values.social_title_ar);
  formData.append("en[copyright_text]", values.copyright_text_en);
  formData.append("ar[copyright_text]", values.copyright_text_ar);

  values.menu_items?.forEach((item, index) => {
    formData.append(`menu_items[${index}][type]`, item.type);
    if (item.page_id) {
      formData.append(`menu_items[${index}][page_id]`, String(item.page_id));
    }
  });

  values.copyright_items?.forEach((item, index) => {
    formData.append(`copyright_items[${index}][type]`, item.type);
    if (item.page_id) {
      formData.append(
        `copyright_items[${index}][page_id]`,
        String(item.page_id),
      );
    }
  });

  values.social_items?.forEach((item, index) => {
    formData.append(
      `social_items[${index}][setting_social_id]`,
      String(item.setting_social_id),
    );
  });

  values.badges?.forEach((badge, index) => {
    formData.append(`badges[${index}][label_en]`, badge.label_en || "");
    formData.append(`badges[${index}][label_ar]`, badge.label_ar || "");
    formData.append(`badges[${index}][link]`, badge.link || "");

    const image =
      badge_images?.[index] ??
      (typeof badge.image === "string" ? badge.image : "");
    if (image) {
      formData.append(`badges[${index}][image]`, image);
    }
  });

  formData.append("_method", "PUT");

  return formData;
}
