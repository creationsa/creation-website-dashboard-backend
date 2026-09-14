import type { ReactNode } from "react";
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
  disabled?: boolean;
}

export interface PageMetaFieldsProps {
  form: UseFormReturn<PageFormValues>;
  disabled?: boolean;
}

export interface SectionSelectorProps {
  onSelect: (type: string) => void;
  disabled?: boolean;
}

export interface SectionsListProps {
  fields: FieldArrayWithId<PageFormValues, "sections">[];
  form: UseFormReturn<PageFormValues>;
  disabled?: boolean;
  onRemove: (index: number) => void;
  onMove: (from: number, to: number) => void;
}

export interface PageFormProps {
  dataToEdit?: PageFormValues;
  id?: number;
  metadataId?: number | null;
}

export interface SubHeadTitleProps {
  title: string;
}

export interface AllPagesProps {
  id: number;
  title: string;
  is_home: boolean;
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

export interface SectionAccordionProps {
  title: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onRemove: () => void;
  disabled?: boolean;
  children: ReactNode;
}
