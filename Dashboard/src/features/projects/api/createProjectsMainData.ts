import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { ProjectsMainDataProps } from "../types";

export async function createProjectsData(
  payload: FormData,
): Promise<ProjectsMainDataProps> {
  const { data } = await instance.post(endpoints.projects.root, payload);

  return data;
}
