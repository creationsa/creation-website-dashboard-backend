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

  formData.append("en[instagram_title]", values.instagram_title_en);
  formData.append("ar[instagram_title]", values.instagram_title_ar);
  formData.append("instagram_link", values.instagram_link);

  formData.append("en[facebook_title]", values.facebook_title_en);
  formData.append("ar[facebook_title]", values.facebook_title_ar);
  formData.append("facebook_link", values.facebook_link);

  formData.append("en[behance_title]", values.behance_title_en);
  formData.append("ar[behance_title]", values.behance_title_ar);
  formData.append("behance_link", values.behance_link);

  formData.append("en[linkedin_title]", values.linkedin_title_en);
  formData.append("ar[linkedin_title]", values.linkedin_title_ar);
  formData.append("linkedin_link", values.linkedin_link);

  formData.append("_method", "PUT");

  return formData;
}
