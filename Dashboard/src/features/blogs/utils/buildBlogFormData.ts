import type { BlogFormValues } from "../components/blogForm/blogSchema";

interface BuildBlogFormDataOptions {
  isEdit?: boolean;
  baseImageMedia?: string;
  coverImageMedia?: string;
}

export function buildBlogFormData(
  values: BlogFormValues,
  options: BuildBlogFormDataOptions = {},
) {
  const { isEdit, baseImageMedia, coverImageMedia } = options;

  const formData = new FormData();

  formData.append("show_in_home", values.show_in_home ? "1" : "0");

  formData.append("ar[title]", values.title_ar);
  formData.append("en[title]", values.title_en);

  formData.append("en[slug]", values.slug_en);

  formData.append("ar[seo_desc]", values.seo_desc_ar);
  formData.append("en[seo_desc]", values.seo_desc_en);

  if (baseImageMedia) {
    formData.append("base_image[media]", String(baseImageMedia));
  }

  formData.append("base_image[ar][alt]", values.base_image_alt_ar);
  formData.append("base_image[en][alt]", values.base_image_alt_en);

  if (coverImageMedia) {
    formData.append("cover_image[media]", String(coverImageMedia));
  }
  formData.append("cover_image[ar][alt]", values.cover_image_alt_ar);
  formData.append("cover_image[en][alt]", values.cover_image_alt_en);

  formData.append("ar[first_sub_title]", values.first_sub_title_ar);
  formData.append("en[first_sub_title]", values.first_sub_title_en);
  formData.append("ar[first_desc]", values.first_desc_ar);
  formData.append("en[first_desc]", values.first_desc_en);
  formData.append("ar[second_sub_title]", values.second_sub_title_ar);
  formData.append("en[second_sub_title]", values.second_sub_title_en);

  formData.append("ar[second_desc]", values.second_desc_ar);
  formData.append("en[second_desc]", values.second_desc_en);
  values.items.forEach((item, index) => {
    formData.append(`items[${index}][en][desc]`, item.en.desc);

    formData.append(`items[${index}][ar][desc]`, item.ar.desc);
  });

  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
}
