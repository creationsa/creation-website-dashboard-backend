import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { LoginResponse } from "../types";

export async function login(payload: FormData): Promise<LoginResponse> {
  const { data } = await instance.post(endpoints.auth.login, payload);

  return data?.data;
}
