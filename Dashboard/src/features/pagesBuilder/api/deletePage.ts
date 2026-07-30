import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";

export async function deletePage(id: number) {
  const { data } = await instance.delete(endpoints.pageBuilder.byId(id));

  return data;
}
