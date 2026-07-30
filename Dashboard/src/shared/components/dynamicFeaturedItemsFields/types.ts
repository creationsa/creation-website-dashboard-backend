import type { ArrayPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface FeaturedItemFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  itemIndex: number;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
  hasTitleAndSlug?: boolean;
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
}
