import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SettingItem } from "../types";

export async function getSettings(): Promise<SettingItem> {
  const { data } = await instance.get(endpoints.settings.root);

  return data?.data;
}
