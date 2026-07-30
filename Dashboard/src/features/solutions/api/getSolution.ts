import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SingleSolution } from "../types";

export async function getSolution(id: number): Promise<SingleSolution> {
  const { data } = await instance.get(endpoints.solutions.byId(id));

  return data?.data;
}
