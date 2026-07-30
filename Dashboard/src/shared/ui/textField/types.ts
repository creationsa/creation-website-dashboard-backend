import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface LabelProps {
  name: string | undefined;
  label: string | undefined;
  error?: string;
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

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  rows?: number;
}
