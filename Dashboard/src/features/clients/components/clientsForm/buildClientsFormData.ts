import type { ClientsFormValues } from "./clientsSchema";

export function buildClientsFormData(values: ClientsFormValues) {
  const formData = new FormData();

  formData.append("title_en", values.title_en || "");
  formData.append("title_ar", values.title_ar || "");

  values.logos?.forEach((logo, index) => {
    if (logo.logo_image) {
      formData.append(`logos[${index}][logo_image]`, String(logo.logo_image));
    }
    formData.append(`logos[${index}][alt_en]`, logo.alt_en || "");
    formData.append(`logos[${index}][alt_ar]`, logo.alt_ar || "");
  });

  formData.append("_method", "PUT");

  return formData;
}
