import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface HeaderFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  disabled: boolean;
  prefix?: string;
}
