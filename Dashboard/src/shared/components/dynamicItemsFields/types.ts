import type { FieldValues, ArrayPath, UseFormReturn } from "react-hook-form";

export interface DynamicItemsFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  disabled: boolean;
  name: ArrayPath<T>;
}
