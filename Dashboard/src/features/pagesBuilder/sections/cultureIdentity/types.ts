import type { FieldErrors, UseFormReturn } from "react-hook-form";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";
import type { CultureIdentityFormValues } from "./cultureIdentitySchema";

export interface CultureIdentitySectionProps {
  form: UseFormReturn<PageFormValues>;
  index: number;
  disabled: boolean;
  onRemove: () => void;
}

export interface SubComponentProps {
  form: UseFormReturn<PageFormValues>;
  index: number;
  disabled: boolean;
  sectionErrors: FieldErrors<CultureIdentityFormValues> | undefined;
}
