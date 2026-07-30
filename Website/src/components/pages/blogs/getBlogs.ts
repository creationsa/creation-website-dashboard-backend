import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { Blog } from "../../common/blogsCategories/types";
import { LanguageType } from "@/i18n.config";

export async function getBlogs(locale: LanguageType): Promise<Blog[]> {
  return apiClient<Blog[]>(endpoints.blogs.root, locale);
}
