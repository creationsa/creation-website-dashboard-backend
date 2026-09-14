import type { UseFormReturn } from "react-hook-form";
import type { ClientsFormValues } from "./components/clientsForm/clientsSchema";

export interface ClientLogoProps {
  logo_image: string;
  alt_en: string;
  alt_ar: string;
}

export interface ClientsProps {
  title_en: string;
  title_ar: string;
  logos: ClientLogoProps[];
}

export interface ClientsFormProps {
  clientsData?: ClientsProps;
}

export interface ClientTitleFieldsProps {
  form: UseFormReturn<ClientsFormValues>;
  disabled?: boolean;
}

export interface ClientLogosFieldsProps {
  form: UseFormReturn<ClientsFormValues>;
  disabled?: boolean;
}

export interface ClientLogoItemFieldsProps {
  form: UseFormReturn<ClientsFormValues>;
  logoIndex: number;
  disabled?: boolean;
  isDeleteDisabled: boolean;
  onRemove: () => void;
}
