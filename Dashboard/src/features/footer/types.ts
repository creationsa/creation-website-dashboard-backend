import type { UseFormReturn } from "react-hook-form";
import type { FooterFormValues } from "./components/footerSchema";

export interface FooterProps {
  statement_image: string;
  statement_desc_en: string;
  statement_desc_ar: string;
}

export interface FooterFormProps {
  footerData?: FooterProps;
}

export interface SectionProps {
  form: UseFormReturn<FooterFormValues>;
  disabled: boolean;
}
