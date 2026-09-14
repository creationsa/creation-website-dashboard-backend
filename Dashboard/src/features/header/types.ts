import type { UseFormReturn } from "react-hook-form";
import type { HeaderFormValues } from "./components/headerForm/headerSchema";

export interface HeaderMenuItemProps {
  type: "page" | "solutions" | "projects" | "blogs";
  page_id: number | null;
  page_title: string | null;
  page_slug: string | null;
}

export interface HeaderProps {
  show_language_switch: boolean;
  show_theme_switch: boolean;
  menu_items: HeaderMenuItemProps[];
}

export interface HeaderFormProps {
  headerData?: HeaderProps;
}

export interface SectionProps {
  form: UseFormReturn<HeaderFormValues>;
  disabled: boolean;
}
