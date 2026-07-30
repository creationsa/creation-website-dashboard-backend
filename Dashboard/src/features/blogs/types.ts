import type { UseFormReturn } from "react-hook-form";
import type { BlogFormValues } from "./components/blogForm/blogSchema";

export interface Blog {
  id: number;
  title: string;
  seo_desc: string;
  slug: string;
  base_image: BlogImageObject;
  created_at: string;
  show_in_home: boolean;
}
export interface BlogCardProps {
  blog: Blog;
}

export interface DeleteBlogProps {
  blog: Blog;
}

// SINGLE BLOG FORM BACKEND
export interface BlogContent {
  title: string;
  slug: string;
  seo_desc: string;
  first_sub_title: string;
  first_desc: string;
  second_desc: string;
  second_sub_title: string;
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
  created_at: string;
  en: BlogItemLocalization;
  ar: BlogItemLocalization;
}

export interface SingleBlog {
  id: number;
  show_in_home: boolean;
  base_image: string;
  base_image_object: BlogImageObject;
  cover_image: string;
  cover_image_object: BlogImageObject;
  items: BlogItem[];
  created_at: string;
  en: BlogContent;
  ar: BlogContent;
}

export interface BlogFormProps {
  blogToEdit?: SingleBlog;
}

export interface SectionProps {
  form: UseFormReturn<BlogFormValues>;
  disabled: boolean;
}

export interface BlogsGridProps {
  blogs: Blog[];
}
