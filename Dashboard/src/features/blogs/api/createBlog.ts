import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { Blog } from "../types";

export async function createBlog(payload: FormData): Promise<Blog> {
  const { data } = await instance.post(endpoints.blogs.root, payload);

  return data;
}
