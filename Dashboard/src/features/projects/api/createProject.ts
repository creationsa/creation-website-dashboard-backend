import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { Project } from "../types";

export async function createProject(payload: FormData): Promise<Project> {
  const { data } = await instance.post(endpoints.projects.allProjects, payload);

  return data;
}
