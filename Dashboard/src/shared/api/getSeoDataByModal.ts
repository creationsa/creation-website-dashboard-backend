import type { Metadata } from "../components/seoForm/types";
import instance from "./axios";
import { endpoints } from "./endpoints";

export async function getSeoDataByModal(forType: string): Promise<Metadata> {
  const { data } = await instance.get(endpoints.seo.byModal(forType));

  return data.data[0];
}
