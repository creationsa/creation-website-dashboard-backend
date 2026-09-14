import { BlogsTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface BlogImageObject {
  id: number;
  media: string;
  alt: string;
  en: ImageLocalization;
  ar: ImageLocalization;
}

// MAIN BLOG TYPES
export interface Blog {
  id: number;
  title: string;
  slug: string;
  base_image: BlogImageObject;
  created_at: string;
  seo_desc: string;
}

// RELATED BLOG TYPES "FOR EVERY SINGLE BLOG"
export interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  base_image: BlogImageObject;
  created_at: string;
}

export interface BlogsProps {
  blogsTranslation: BlogsTranslations;
  bigBottomPadding?: boolean;
  locale: LanguageType;
  allBlogsData: Blog[] | RelatedBlog[];
}

export interface BlogCardProps {
  blog: Blog | RelatedBlog;
  blogsTranslation: BlogsTranslations;
  bigBottomPadding?: boolean;
  locale: LanguageType;
}

export interface ImageLocalization {
  alt: string;
}

export interface BlogItemLocalization {
  desc: string;
}

export interface BlogItem {
  id: number;
  desc: string;
}
