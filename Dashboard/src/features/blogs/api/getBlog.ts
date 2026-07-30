import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SingleBlog } from "../types";

export async function getBlog(id: number): Promise<SingleBlog> {
  const { data } = await instance.get(endpoints.blogs.byId(id));

  return data?.data;
}
