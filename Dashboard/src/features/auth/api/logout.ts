import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";

export async function logout(): Promise<void> {
  await instance.post(endpoints.auth.logout);
}
