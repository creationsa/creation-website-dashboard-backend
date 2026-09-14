import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type {
  ListQueryParams,
  PaginatedResult,
} from "@/shared/types/pagination";
import type { Blog } from "../types";

export async function getBlogs(
  locale: LanguageType,
  params: ListQueryParams,
): Promise<PaginatedResult<Blog>> {
  const { data } = await instance.get(endpoints.blogs.root, {
    headers: {
      "Accept-Language": locale,
    },
    params,
  });

  return { data: data?.data, meta: data?.meta };
}
