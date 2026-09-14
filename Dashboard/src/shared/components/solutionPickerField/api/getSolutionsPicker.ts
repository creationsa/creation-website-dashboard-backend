import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SolutionPickerItem } from "../types";

export async function getSolutionsPicker(): Promise<SolutionPickerItem[]> {
  const { data } = await instance.get(endpoints.solutions.picker);

  return data?.data;
}
