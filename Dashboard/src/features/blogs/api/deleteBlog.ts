import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";

export async function deleteBlog(id: number) {
  const { data } = await instance.delete(endpoints.blogs.byId(id));

  return data;
}
