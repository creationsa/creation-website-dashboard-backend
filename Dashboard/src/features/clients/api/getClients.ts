import instance from "@/shared/api/axios";
import { endpoints } from "@/shared/api/endpoints";
import type { ClientsProps } from "../types";

export async function getClients(): Promise<ClientsProps> {
  const { data } = await instance.get(endpoints.clients.root);

  return data?.data;
}
