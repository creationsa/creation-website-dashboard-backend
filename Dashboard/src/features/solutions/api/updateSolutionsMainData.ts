import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SolutionsMainDataProps } from "../types";

export async function updateSolutionsMainData(
  payload: FormData,
): Promise<SolutionsMainDataProps> {
  const { data } = await instance.post(endpoints.solutions.root, payload);

  return data;
}
