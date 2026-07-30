import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SingleSolution } from "../types";

export async function createSolution(
  payload: FormData,
): Promise<SingleSolution> {
  const { data } = await instance.post(
    endpoints.solutions.allSolutions,
    payload,
  );

  return data;
}
