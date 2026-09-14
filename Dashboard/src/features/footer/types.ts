import type { UseFormReturn } from "react-hook-form";
import type { FooterFormValues } from "./components/footerSchema";

export interface FooterMenuItemProps {
  type: "page" | "solutions" | "projects" | "blogs";
  page_id: number | null;
  page_title: string | null;
  page_slug: string | null;
}

export interface FooterSocialItemProps {
  setting_social_id: number;
  title_en: string | null;
  title_ar: string | null;
  link: string | null;
}

export interface FooterBadgeProps {
  label_en: string;
  label_ar: string;
  link: string;
  image: string;
}

export interface FooterProps {
  statement_image: string;
  statement_desc_en: string;
  statement_desc_ar: string;
  statement_image_alt_en: string;
  statement_image_alt_ar: string;

  description_en: string;
  description_ar: string;
  tagline_en: string;
  tagline_ar: string;

  menu_title_en: string;
  menu_title_ar: string;
  menu_items: FooterMenuItemProps[];

  social_title_en: string;
  social_title_ar: string;
  social_items: FooterSocialItemProps[];

  badges: FooterBadgeProps[];

  copyright_text_en: string;
  copyright_text_ar: string;
  current_year: number;
  copyright_items: FooterMenuItemProps[];
}

export interface FooterFormProps {
  footerData?: FooterProps;
}

export interface SectionProps {
  form: UseFormReturn<FooterFormValues>;
  disabled: boolean;
}
