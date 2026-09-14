import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { ClientsProps } from "../types";

export async function updateClients(payload: FormData): Promise<ClientsProps> {
  const { data } = await instance.post(endpoints.clients.root, payload);

  return data;
}
