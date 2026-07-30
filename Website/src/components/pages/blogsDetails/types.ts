import {
  BlogImageObject,
  BlogItem,
  RelatedBlog,
} from "@/components/common/blogsCategories/types";
import {
  BlogsTranslations,
  ProjectDetailsContent,
  ProjectDetailsTranslations,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

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

export interface MainSectionProps {
  certainImage: StaticImageData;
}

export interface ImportantContentProps {
  translations: ProjectDetailsTranslations;
  project: ProjectDetailsContent;
}

export interface AboutTheProjectProps {
  locale: LanguageType;
  project: ProjectDetailsContent;
  title: string;
  certainImage: StaticImageData;
}

export interface ResultsProps {
  projectData: ProjectDetailsContent;
  translations: ProjectDetailsTranslations;
  locale: LanguageType;
}

export interface ImagesProps {
  images: StaticImageData[];
}

export interface TwoGridProps {
  images: StaticImageData[];
  startIndex?: number;
}

export interface ImageItemProps {
  src: StaticImageData;
  full?: boolean;
  index?: number;
}

export interface ImgProps {
  src: StaticImageData;
  alt: string;
}

export interface ProjectNavigationProps {
  slug: string;
  locale: LanguageType;
  project_details: ProjectDetailsTranslations;
  previousLabel: string;
  nextLabel: string;
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
}
