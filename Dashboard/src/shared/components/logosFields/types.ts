import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface LogosFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  prefix: string;
  disabled?: boolean;
}

export interface LogoItemFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  prefix: string;
  logoIndex: number;
  disabled?: boolean;
  isDeleteDisabled: boolean;
  onRemove: () => void;
}
