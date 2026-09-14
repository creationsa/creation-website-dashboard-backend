import type { ArrayPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface DynamicAccordionFieldsProps<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
> {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  itemInitialState: Record<string, unknown>;
  disabled?: boolean;
  managementLabel: string;
  addLabel: string;
  rowLabelKey: string;
}

export interface AccordionItemFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  rowLabel: string;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
}

export interface AccordionContentBlocksProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  disabled?: boolean;
}

export interface AccordionContentBlockFieldsProps<
  TFieldValues extends FieldValues,
> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  rowLabel: string;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
}
