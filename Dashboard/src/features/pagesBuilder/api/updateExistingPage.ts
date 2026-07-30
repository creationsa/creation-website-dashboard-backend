import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { PageFormValues } from "../components/pagesBuilderForm/pageSchema";

export async function updateExistingPage(
  id: number,
  payload: FormData,
): Promise<PageFormValues> {
  const { data } = await instance.post(endpoints.pageBuilder.byId(id), payload);

  return data;
}
