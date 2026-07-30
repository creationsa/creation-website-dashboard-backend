import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { AllPagesProps } from "../types";

export async function getPages(locale: LanguageType): Promise<AllPagesProps[]> {
  const { data } = await instance.get(endpoints.pageBuilder.root, {
    headers: {
      "Accept-Language": locale,
    },
  });

  return data?.data;
}
