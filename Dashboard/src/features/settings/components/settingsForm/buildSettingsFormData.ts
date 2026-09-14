import type { SettingsFormValues } from "./settingsSchema";

interface BuildSettingsFormDataOptions {
  logo_en?: string;
  logo_ar?: string;
}

export function buildSettingsFormData(
  values: SettingsFormValues,
  options: BuildSettingsFormDataOptions = {},
) {
  const { logo_en, logo_ar } = options;

  const formData = new FormData();

  if (logo_en) {
    formData.append("logo_en[media]", String(logo_en));
  }
  formData.append("logo_en[ar][alt]", values.logo_en_alt_ar);
  formData.append("logo_en[en][alt]", values.logo_en_alt_en);

  if (logo_ar) {
    formData.append("logo_ar[media]", String(logo_ar));
  }
  formData.append("logo_ar[ar][alt]", values.logo_ar_alt_ar);
  formData.append("logo_ar[en][alt]", values.logo_ar_alt_en);

  values.socials?.forEach((social, index) => {
    if (social.id) {
      formData.append(`socials[${index}][id]`, String(social.id));
    }
    formData.append(`socials[${index}][title_en]`, social.title_en || "");
    formData.append(`socials[${index}][title_ar]`, social.title_ar || "");
    formData.append(`socials[${index}][link]`, social.link || "");
  });

  formData.append("_method", "PUT");

  return formData;
}
