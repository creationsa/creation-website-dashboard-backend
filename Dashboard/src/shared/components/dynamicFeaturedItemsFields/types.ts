import type { ArrayPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface FeaturedItemFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  rowLabel: string;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
  hasTitleAndSlug?: boolean;
  allowProjectPicker?: boolean;
  excludeProjectIds?: number[];
}

export interface DynamicFeaturedItemsFieldsProps<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
> {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  itemInitialState: Record<string, unknown>;
  disabled?: boolean;
  hasTitleAndSlug?: boolean;
  allowProjectPicker?: boolean;
  managementLabel: string;
  addLabel: string;
  rowLabelKey: string;
}
