import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { BlogsMainDataProps } from "../types";

export async function updateBlogsMainData(
  payload: FormData,
): Promise<BlogsMainDataProps> {
  const { data } = await instance.post(endpoints.blogs.mainData, payload);

  return data;
}
