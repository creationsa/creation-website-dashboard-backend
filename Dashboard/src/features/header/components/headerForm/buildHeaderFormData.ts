import type { HeaderFormValues } from "./headerSchema";

export function buildHeaderFormData(values: HeaderFormValues) {
  const formData = new FormData();

  formData.append(
    "show_language_switch",
    values.show_language_switch ? "1" : "0",
  );
  formData.append("show_theme_switch", values.show_theme_switch ? "1" : "0");

  values.menu_items?.forEach((item, index) => {
    formData.append(`menu_items[${index}][type]`, item.type);
    if (item.page_id) {
      formData.append(`menu_items[${index}][page_id]`, String(item.page_id));
    }
  });

  formData.append("_method", "PUT");

  return formData;
}
