import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { HeaderProps } from "../types";

export async function getHeader(): Promise<HeaderProps> {
  const { data } = await instance.get(endpoints.header.root);

  return data?.data;
}
