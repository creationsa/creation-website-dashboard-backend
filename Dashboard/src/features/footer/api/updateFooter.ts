import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { FooterProps } from "../types";

export async function updateFooter(payload: FormData): Promise<FooterProps> {
  const { data } = await instance.post(endpoints.footer.root, payload);

  return data?.data;
}
