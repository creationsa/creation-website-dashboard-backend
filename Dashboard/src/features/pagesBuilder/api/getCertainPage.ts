import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { PageFormValues } from "../components/pagesBuilderForm/pageSchema";

export async function getCertainPage(id: number): Promise<PageFormValues> {
  const { data } = await instance.get(endpoints.pageBuilder.byId(id));

  return data?.data;
}
