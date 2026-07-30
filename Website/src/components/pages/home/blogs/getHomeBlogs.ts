import { Blog } from "@/components/common/blogsCategories/types";
import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export async function getHomeBlogs(locale: LanguageType): Promise<Blog[]> {
  return apiClient<Blog[]>(endpoints.blogs.home, locale);
}
