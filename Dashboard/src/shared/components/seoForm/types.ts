import type { SeoFormValues } from "@/shared/components/seoForm/SeoSchema";
import type { UseFormReturn } from "react-hook-form";

export interface MetadataContent {
  title: string;
  image: string;
  image_alt: string;
  image_type: string;
  site_name: string;
  description: string;
}

export interface Metadata {
  id: number;
  title: string;
  for: string;
  image: string;
  description: string;
  keywords: string;
  en: MetadataContent;
  ar: MetadataContent;
}

export interface SeoMediaOption {
  label: string;
  url: string;
  type: "image" | "video";
}

export interface SeoFormProps {
  seoData?: Metadata;
  forType?: string;
  metadataId?: number;
  metadataableType?: "page" | "project" | "solution";
  mediaOptions?: SeoMediaOption[];
}

export interface KeywordsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export interface SeoSectionProps {
  form: UseFormReturn<SeoFormValues>;
  disabled: boolean;
}

export interface SeoImagesSectionProps extends SeoSectionProps {
  isLinkedRecord: boolean;
  mediaOptions?: SeoMediaOption[];
}

export interface SeoLocalizedImageFieldProps extends SeoSectionProps {
  locale: "en" | "ar";
  isLinkedRecord: boolean;
  mediaOptions?: SeoMediaOption[];
}

export interface SeoKeywordsSectionProps extends SeoSectionProps {
  isLinkedRecord: boolean;
}

export interface SeoImagePickerFieldProps {
  name: string;
  label: string;
  value?: File | string | null;
  onChange: (value: File | string | null) => void;
  error?: string;
  disabled?: boolean;
  mediaOptions: SeoMediaOption[];
}
