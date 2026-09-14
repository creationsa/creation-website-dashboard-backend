import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { StatisticsProps } from "../types";

export async function getStatistics(): Promise<StatisticsProps> {
  const { data } = await instance.get(endpoints.statistics.root);

  return data?.data;
}
