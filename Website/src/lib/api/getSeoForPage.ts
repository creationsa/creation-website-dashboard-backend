import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { LanguageType } from "@/i18n.config";

export interface SeoProps {
  id: number;
  title: string;
  canonical_tags: string;
  image: string;
  type: string;
  description: string;
  keywords: string;
}

export async function getSeoForPage(
  title: string,
  locale: LanguageType,
): Promise<SeoProps> {
  return apiClient<SeoProps>(endpoints.seo.root(title), locale);
}
