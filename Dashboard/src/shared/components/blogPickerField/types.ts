import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface BlogPickerItem {
  id: number;
  title_en: string;
  title_ar: string;
  slug_en: string;
  base_image: string;
}

export interface BlogPickerFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  sourcePath: Path<T>;
  blogIdPath: Path<T>;
  label: string;
  disabled?: boolean;
}
