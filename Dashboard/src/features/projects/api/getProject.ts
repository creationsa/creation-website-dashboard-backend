import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { SingleProject } from "../types";

export async function getProject(id: number): Promise<SingleProject> {
  const { data } = await instance.get(endpoints.projects.byId(id));

  return data?.data;
}
