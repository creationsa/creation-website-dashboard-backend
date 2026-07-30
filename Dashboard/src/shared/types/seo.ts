export interface MetadataContent {
  title: string;
  image: string;
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

export interface SeoFormProps {
  seoData?: Metadata;
  forType: string;
}

export interface KeywordsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}
