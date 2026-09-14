import type { HeaderProps } from "../../types";
import type { HeaderFormValues } from "./headerSchema";

const HEADER_INITIAL_STATE: HeaderFormValues = {
  show_language_switch: true,
  show_theme_switch: true,
  menu_items: [],
};

export default function getHeaderDefaultValues(
  headerToEdit?: HeaderProps,
): HeaderFormValues {
  if (!headerToEdit) return HEADER_INITIAL_STATE;

  return {
    show_language_switch: headerToEdit.show_language_switch ?? true,
    show_theme_switch: headerToEdit.show_theme_switch ?? false,

    menu_items: headerToEdit.menu_items?.length
      ? headerToEdit.menu_items.map((item) => ({
          type: item.type,
          page_id: item.page_id,
        }))
      : [],
  };
}
