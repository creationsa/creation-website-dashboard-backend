import type { ClientsProps } from "../../types";
import type { ClientsFormValues } from "./clientsSchema";

export const LOGO_ITEM_INITIAL_STATE = {
  logo_image: "",
  alt_en: "",
  alt_ar: "",
};

const CLIENTS_INITIAL_STATE: ClientsFormValues = {
  title_en: "",
  title_ar: "",
  logos: [{ ...LOGO_ITEM_INITIAL_STATE }],
};

export default function getClientsDefaultValues(
  clientsToEdit?: ClientsProps,
): ClientsFormValues {
  if (!clientsToEdit) return CLIENTS_INITIAL_STATE;

  return {
    title_en: clientsToEdit.title_en || "",
    title_ar: clientsToEdit.title_ar || "",
    logos: clientsToEdit.logos?.length
      ? clientsToEdit.logos
      : [{ ...LOGO_ITEM_INITIAL_STATE }],
  };
}
