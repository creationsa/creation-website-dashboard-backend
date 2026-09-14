import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LanguageType } from "@/shared/hooks/useLanguage";
import type { MenuOption } from "../types";

export async function getMenuOptions(
  locale: LanguageType,
): Promise<MenuOption[]> {
  const { data } = await instance.get(endpoints.menuOptions.root, {
    headers: {
      "Accept-Language": locale,
    },
  });

  return data?.data;
}
