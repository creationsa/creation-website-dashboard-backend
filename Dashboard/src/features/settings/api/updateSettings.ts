import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SettingItem } from "../types";

export async function updateSettings(
  payload: FormData,
): Promise<SettingItem[]> {
  const { data } = await instance.post(endpoints.settings.root, payload);

  return data?.data;
}
