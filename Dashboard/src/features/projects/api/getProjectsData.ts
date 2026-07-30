import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { ProjectsMainDataProps } from "../types";

export async function getProjectsData(): Promise<ProjectsMainDataProps> {
  const { data } = await instance.get(endpoints.projects.root);

  return data?.data;
}
