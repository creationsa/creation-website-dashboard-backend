import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface MenuItemsFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

export interface MenuOption {
  type: "page" | "solutions" | "projects" | "blogs";
  id: number | null;
  title: string;
  slug: string;
}
