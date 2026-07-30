import { BlogsTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { ReactNode } from "react";

// MAIN BLOG TYPES
export interface Blog {
  id: number;
  title: string;
  slug: string;
  base_image: BlogImageObject;
  show_in_home: boolean;
  created_at: string;
  seo_desc: string;
}

// RELATED BLOG TYPES "FOR EVERY SINGLE BLOG"
export interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  base_image: BlogImageObject;
  show_in_home: boolean;
  created_at: string;
}

export interface BlogsProps {
  blogsTranslation: BlogsTranslations;
  bigBottomPadding?: boolean;
  numbersToDisplay?: number;
  locale: LanguageType;
  allBlogsData: Blog[] | RelatedBlog[];
}

export interface BlogCardProps {
  blog: Blog | RelatedBlog;
  blogsTranslation: BlogsTranslations;
  bigBottomPadding?: boolean;
  locale: LanguageType;
}

export interface BlogContentProps {
  title: string;
  children: ReactNode;
}

export interface ImageLocalization {
  alt: string;
}

export interface BlogImageObject {
  id: number;
  media: string;
  alt: string;
  en: ImageLocalization;
  ar: ImageLocalization;
}

export interface BlogItemLocalization {
  desc: string;
}

export interface BlogItem {
  id: number;
  desc: string;
}
