import type { UseFormReturn } from "react-hook-form";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";

export interface RowBlockProps {
  form: UseFormReturn<PageFormValues>;
  sectionIndex: number;
  blockIndex: number;
  disabled: boolean;
  onRemove: () => void;
  isDeleteDisabled: boolean;
}

export type LeftTextFieldsProps = Pick<
  RowBlockProps,
  "form" | "sectionIndex" | "blockIndex" | "disabled"
>;

export type ImageCardPrefix = "first_right" | "second_right";

export interface RightImageCardFieldsProps
  extends Pick<RowBlockProps, "form" | "sectionIndex" | "blockIndex" | "disabled"> {
  prefix: ImageCardPrefix;
  otherCardProjectId?: number | null;
}
