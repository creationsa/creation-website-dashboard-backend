import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { HeaderProps } from "../types";

export async function updateHeader(payload: FormData): Promise<HeaderProps> {
  const { data } = await instance.post(endpoints.header.root, payload);

  return data;
}
