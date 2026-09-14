import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { PageTitleSettingsSectionFormValues } from "./PageTitleSettingsSectionSchema";

export interface PageTitleSettingsSectionProps<
  T extends FieldValues & PageTitleSettingsSectionFormValues,
> {
  form: UseFormReturn<T>;
  disabled: boolean;
}
