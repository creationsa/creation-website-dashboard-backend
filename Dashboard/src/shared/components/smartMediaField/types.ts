import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface MediaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
}

export interface MediaTypeToggleProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
}

export interface MediaFileFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  mediaType: unknown;
  disabled?: boolean;
}

export interface MediaImageAltFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  disabled?: boolean;
}

export interface MediaPosterFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  disabled?: boolean;
}
