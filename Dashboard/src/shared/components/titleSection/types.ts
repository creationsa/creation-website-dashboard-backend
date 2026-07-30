import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { TitleSectionFormValues } from "./titleSectionSchema";

export interface TitleSectionProps<
  T extends FieldValues & TitleSectionFormValues,
> {
  form: UseFormReturn<T>;
  disabled: boolean;
}
