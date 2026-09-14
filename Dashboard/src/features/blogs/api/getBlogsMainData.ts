import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { BlogsMainDataProps } from "../types";

export async function getBlogsMainData(): Promise<BlogsMainDataProps> {
  const { data } = await instance.get(endpoints.blogs.mainData);

  return data?.data;
}
