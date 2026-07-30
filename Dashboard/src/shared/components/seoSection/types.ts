import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { SeoSectionFormValues } from "./SeoSectionSchema";

export interface SeoSectionProps<T extends FieldValues & SeoSectionFormValues> {
  form: UseFormReturn<T>;
  disabled: boolean;
}
