import type { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import type { PageFormValues } from "./components/pagesBuilderForm/pageSchema";

export interface SubSectionProps {
  form: UseFormReturn<PageFormValues>;
  index: number;
  disabled: boolean;
}

export interface SectionProps extends SubSectionProps {
  onRemove: () => void;
}

export interface DeleteSectionButtonProps {
  onRemove: () => void;
}

export interface PageMetaFieldsProps {
  form: UseFormReturn<PageFormValues>;
  disabled?: boolean;
}

export interface SectionSelectorProps {
  onSelect: (type: string) => void;
}

export interface SectionsListProps {
  fields: FieldArrayWithId<PageFormValues, "sections">[];
  form: UseFormReturn<PageFormValues>;
  disabled?: boolean;
  onRemove: (index: number) => void;
}

export interface PageFormProps {
  dataToEdit?: PageFormValues;
}

export interface BlockHeaderProps {
  index: number;
  onRemove: () => void;
  isDeleteDisabled: boolean;
}

export interface AddNewBlockProps {
  count: number;
  onAdd: () => void;
}

export interface SubHeadTitleProps {
  title: string;
}

export interface AllPagesProps {
  id: number;
  title: string;
}

export interface PagesGridProps {
  pages: AllPagesProps[];
}

export interface PagesCardProps {
  page: AllPagesProps;
}

export interface DeletePageProps {
  page: AllPagesProps;
}
