import type { Metadata } from "../types/seo";
import instance from "./axios";
import { endpoints } from "./endpoints";

export async function getSeoDataById(id: number): Promise<Metadata> {
  const { data } = await instance.get(endpoints.seo.byId(id));

  return data?.data;
}
