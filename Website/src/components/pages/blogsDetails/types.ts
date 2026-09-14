import {
  BlogImageObject,
  BlogItem,
  RelatedBlog,
} from "@/components/common/blogsCategories/types";
import { BlogsTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface BlogDetailsProps {
  params: Promise<{
    locale: LanguageType;
    slug: string;
  }>;
}

export interface InsightsProps {
  thinking: BlogsTranslations;
  blogData: SingleBlogBySlugProps;
  locale: LanguageType;
}

export interface StrategiesProps {
  thinking: BlogsTranslations;
  blogData: SingleBlogBySlugProps;
  locale: LanguageType;
}

export interface NextTwoBlogsProps {
  locale: LanguageType;
  thinking: BlogsTranslations;
  relatedBlogs: RelatedBlog[];
}

export interface SingleBlogBySlugProps {
  id: number;
  title: string;
  slug: string;
  seo_desc: string;
  first_sub_title: string;
  first_desc: string;
  second_desc: string;
  second_sub_title: string;
  items: BlogItem[];
  base_image: string;
  base_image_object: BlogImageObject;
  cover_image: string;
  cover_image_object: BlogImageObject;
  related_blogs: RelatedBlog[];
  created_at: string;
}

export interface BlogSlug {
  slug_ar: string;
  slug_en: string;
  updated_at: string;
}
