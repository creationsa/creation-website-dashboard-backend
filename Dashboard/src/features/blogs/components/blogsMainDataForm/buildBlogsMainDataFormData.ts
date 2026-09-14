import type { BlogsMainDataFormValues } from "./blogsMainDataSchema";

export function buildBlogsMainDataFormData(values: BlogsMainDataFormValues) {
  const formData = new FormData();

  formData.append("nav_title_en", values.nav_title_en || "");
  formData.append("nav_title_ar", values.nav_title_ar || "");
  formData.append("slug_en", values.slug_en || "");

  return formData;
}
