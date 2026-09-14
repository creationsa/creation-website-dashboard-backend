import { LanguageType } from "@/i18n.config";
import { HeaderContent } from "../../types";
import { Blog, RelatedBlog } from "@/components/common/blogsCategories/types";

export interface BlogsTeaserContent extends HeaderContent {
  button_title: string;
  button_slug: string;
  items: Blog[] | RelatedBlog[];
}

export interface BlogsTeaserSectionProps {
  content: BlogsTeaserContent;
  locale: LanguageType;
}
