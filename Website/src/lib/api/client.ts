import { LanguageType } from "@/i18n.config";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
  endpoint: string,
  locale: LanguageType,
  options?: RequestInit,
  revalidate: number = 60,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(locale && {
        "Accept-Language": locale,
      }),
      ...options?.headers,
    },
    next: { revalidate },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const json = await res.json();
  return json.data;
}
