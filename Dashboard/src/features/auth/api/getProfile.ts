import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LoginResponse } from "../types";

export async function getProfile(): Promise<LoginResponse> {
  const { data } = await instance.get(endpoints.auth.profile);

  return data?.data;
}
