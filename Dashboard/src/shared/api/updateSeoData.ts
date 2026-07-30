import type { Metadata } from "../types/seo";
import instance from "./axios";
import { endpoints } from "./endpoints";

export async function updateSeoData(
  id: number,
  payload: FormData,
): Promise<Metadata> {
  const { data } = await instance.post(endpoints.seo.byId(id), payload);

  return data?.data;
}
