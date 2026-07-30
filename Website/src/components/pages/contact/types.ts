import {
  ContactTranslations,
  FormErrorsTranslation,
  InformationDetailsContent,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Control, UseFormRegisterReturn } from "react-hook-form";
import { ContactFormValues } from "./contactForm/contactSchema";

export interface ImportantInformationsProps {
  locale: LanguageType;
  contact: ContactTranslations;
}

export interface InfoItemProps {
  info: InformationDetailsContent;
}

export interface ContactFormProps {
  locale: LanguageType;
  contact: ContactTranslations;
  form_errors: FormErrorsTranslation;
}

export interface FormProps {
  contact: ContactTranslations;
  form_errors: FormErrorsTranslation;
  locale: LanguageType;
}

export type ContactActionErrors = {
  [K in keyof ContactFormValues]?: string[];
};

export interface ContactActionState {
  success: boolean;
  message: string | null;
  errors: ContactActionErrors | null;
}

export interface ContactErrorMessages {
  name_required: string;
  name_short: string;
  email_required: string;
  phone_invalid: string;
  company_required: string;
  country_required: string;
  email_invalid: string;
  message_required: string;
  message_short: string;
}

export interface LabelProps {
  name: string | undefined;
  label: string;
  error?: string;
  disabled?: boolean;
}

export interface ErrorProps {
  message?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  disabled?: boolean;
  label: string;
  register?: UseFormRegisterReturn;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
}

export interface Option {
  value: string;
  label: string;
}

export interface CountrySelectProps {
  name: keyof ContactFormValues;
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder: string;
  control: Control<ContactFormValues>;
  locale: LanguageType;
}

export interface LocationSectionProps {
  title: string;
  address: string;
  phone: string;
  email: string;
  image: StaticImageData;
  reverse?: boolean;
}
