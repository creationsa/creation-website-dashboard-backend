import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { ProjectPickerItem } from "../types";

export async function getProjectsPicker(): Promise<ProjectPickerItem[]> {
  const { data } = await instance.get(endpoints.projects.picker);

  return data?.data;
}
