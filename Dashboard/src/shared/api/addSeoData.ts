import type { Metadata } from "../components/seoForm/types";
import instance from "./axios";
import { endpoints } from "./endpoints";

export async function addSeoData(payload: FormData): Promise<Metadata> {
  const { data } = await instance.post(endpoints.seo.root, payload);

  return data?.data;
}
