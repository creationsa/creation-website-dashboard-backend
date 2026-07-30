import type { FooterFormValues } from "./footerSchema";

interface BuildFooterFormDataOptions {
  statement_image?: string;
}

export function buildFooterFormData(
  values: FooterFormValues,
  options: BuildFooterFormDataOptions = {},
) {
  const { statement_image } = options;

  const formData = new FormData();

  if (statement_image) {
    formData.append("statement_image[media]", String(statement_image));
  }

  formData.append("en[statement_desc]", values.statement_desc_en);
  formData.append("ar[statement_desc]", values.statement_desc_ar);

  formData.append("_method", "PUT");

  return formData;
}
