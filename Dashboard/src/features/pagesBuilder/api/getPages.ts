import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type {
  ListQueryParams,
  PaginatedResult,
} from "@/shared/types/pagination";
import type { AllPagesProps } from "../types";

export async function getPages(
  locale: LanguageType,
  params: ListQueryParams,
): Promise<PaginatedResult<AllPagesProps>> {
  const { data } = await instance.get(endpoints.pageBuilder.root, {
    headers: {
      "Accept-Language": locale,
    },
    params,
  });

  return { data: data?.data, meta: data?.meta };
}
