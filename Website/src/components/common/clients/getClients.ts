import { LanguageType } from "@/i18n.config";
import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { ClientsData } from "./types";

export async function getClients(locale: LanguageType): Promise<ClientsData> {
  return apiClient<ClientsData>(endpoints.clients.root, locale, undefined, 3600);
}
