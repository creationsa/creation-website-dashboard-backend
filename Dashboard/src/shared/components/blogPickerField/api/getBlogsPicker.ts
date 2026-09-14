import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { BlogPickerItem } from "../types";

export async function getBlogsPicker(): Promise<BlogPickerItem[]> {
  const { data } = await instance.get(endpoints.blogs.picker);

  return data?.data;
}
