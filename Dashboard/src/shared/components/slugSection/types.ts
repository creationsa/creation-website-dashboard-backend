import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { SlugSectionFormValues } from "./SlugSectionSchema";

export interface SlugSectionProps<
  T extends FieldValues & SlugSectionFormValues,
> {
  form: UseFormReturn<T>;
  disabled: boolean;
}
