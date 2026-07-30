import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { SingleBlogBySlugProps } from "./types";

export async function getBlogBySlug(
  slug: string,
  locale: LanguageType,
): Promise<SingleBlogBySlugProps> {
  return apiClient<SingleBlogBySlugProps>(endpoints.blogs.detail(slug), locale);
}
