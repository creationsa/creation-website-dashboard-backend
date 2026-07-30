import type { FooterProps } from "../types";
import type { FooterFormValues } from "./footerSchema";

const FOOTER_INITIAL_STATE = {
  statement_image: "",
  statement_desc_en: "",
  statement_desc_ar: "",
};

export default function getFooterDefaultValues(
  footerToEdit?: FooterProps,
): FooterFormValues {
  if (!footerToEdit) return FOOTER_INITIAL_STATE;
  return {
    statement_image: footerToEdit?.statement_image || "",
    statement_desc_en: footerToEdit?.statement_desc_en || "",
    statement_desc_ar: footerToEdit?.statement_desc_ar || "",
  };
}
