import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";

export async function deleteProject(id: number) {
  const { data } = await instance.delete(endpoints.projects.byId(id));

  return data;
}
