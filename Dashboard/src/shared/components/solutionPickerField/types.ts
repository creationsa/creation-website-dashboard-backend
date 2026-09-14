import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface SolutionPickerItem {
  id: number;
  title_en: string;
  title_ar: string;
  small_description_en: string;
  small_description_ar: string;
  slug_en: string;
}

export interface SolutionPickerFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  sourcePath: Path<T>;
  solutionIdPath: Path<T>;
  label: string;
  disabled?: boolean;
}
