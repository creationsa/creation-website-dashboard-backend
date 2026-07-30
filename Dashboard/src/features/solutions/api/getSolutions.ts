import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { SingleSolutionProps } from "../types";

export async function getSolutions(
  locale: LanguageType,
): Promise<SingleSolutionProps[]> {
  const { data } = await instance.get(endpoints.solutions.allSolutions, {
    headers: {
      "Accept-Language": locale,
    },
  });

  return data?.data;
}
