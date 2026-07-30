import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SolutionsMainDataProps } from "../types";

export async function getSolutionsData(): Promise<SolutionsMainDataProps> {
  const { data } = await instance.get(endpoints.solutions.root);

  return data?.data;
}
