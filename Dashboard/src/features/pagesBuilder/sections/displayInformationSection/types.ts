import type { FieldErrors, UseFormReturn } from "react-hook-form";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";
import type { DisplayInfoFormValues } from "./displayInfoSchema";

export interface RowBlockProps {
  form: UseFormReturn<PageFormValues>;
  sectionIndex: number;
  blockIndex: number;
  disabled: boolean;
  onRemove: () => void;
  isDeleteDisabled: boolean;
}

export interface LeftTextFieldsProps extends Pick<
  RowBlockProps,
  "form" | "sectionIndex" | "blockIndex" | "disabled"
> {
  errors?: FieldErrors<DisplayInfoFormValues["blocks"][number]>;
}

export type ImageCardPrefix = "first_right" | "second_right";

export interface RightImageCardFieldsProps extends Pick<
  RowBlockProps,
  "form" | "sectionIndex" | "blockIndex" | "disabled"
> {
  prefix: ImageCardPrefix;
  errors?: FieldErrors<DisplayInfoFormValues["blocks"][number]>;
}
