import { Blog } from "@/components/common/blogsCategories/types";
import { BlogsTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface BlogsProps {
  blogs: BlogsTranslations;
  locale: LanguageType;
  all_blogs: Blog[];
}
