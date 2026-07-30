import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";

export async function deleteSolution(id: number) {
  const { data } = await instance.delete(endpoints.solutions.byId(id));

  return data;
}
