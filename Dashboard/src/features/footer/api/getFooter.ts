import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { FooterProps } from "../types";

export async function getFooter(): Promise<FooterProps> {
  const { data } = await instance.get(endpoints.footer.root);

  return data?.data;
}
