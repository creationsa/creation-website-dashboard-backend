import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { Blog } from "../types";

export async function getBlogs(locale: LanguageType): Promise<Blog[]> {
  const { data } = await instance.get(endpoints.blogs.root, {
    headers: {
      "Accept-Language": locale,
    },
  });

  return data?.data;
}
