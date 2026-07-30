import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SingleSolution } from "../types";

export async function updateSolution(
  id: number,
  payload: FormData,
): Promise<SingleSolution> {
  const { data } = await instance.post(endpoints.solutions.byId(id), payload);

  return data;
}
