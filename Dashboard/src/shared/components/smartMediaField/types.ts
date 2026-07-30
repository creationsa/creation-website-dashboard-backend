import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface MediaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
}
