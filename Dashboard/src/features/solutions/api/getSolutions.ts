import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type {
  ListQueryParams,
  PaginatedResult,
} from "@/shared/types/pagination";
import type { SingleSolutionProps } from "../types";

export async function getSolutions(
  locale: LanguageType,
  params: ListQueryParams,
): Promise<PaginatedResult<SingleSolutionProps>> {
  const { data } = await instance.get(endpoints.solutions.allSolutions, {
    headers: {
      "Accept-Language": locale,
    },
    params,
  });

  return { data: data?.data, meta: data?.meta };
}
