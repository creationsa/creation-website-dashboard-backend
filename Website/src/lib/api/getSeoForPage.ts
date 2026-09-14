import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { LanguageType } from "@/i18n.config";

export interface SeoProps {
  id: number;
  title: string;
  canonical_tags: string;
  image: string;
  image_alt: string;
  image_type: string;
  site_name: string;
  type: string;
  description: string;
  keywords: string;
}

const FALLBACK_SEO: SeoProps = {
  id: 0,
  title: "Creation",
  canonical_tags: "",
  image: "",
  image_alt: "",
  image_type: "",
  site_name: "Creation",
  type: "website",
  description: "",
  keywords: "",
};

export async function getSeoForPage(
  title: string,
  locale: LanguageType,
): Promise<SeoProps> {
  try {
    return await apiClient<SeoProps>(endpoints.seo.root(title), locale);
  } catch (error) {
    // A page whose SEO row hasn't been saved from the dashboard yet (or a
    // transient API failure) must not take the whole page down — fall
    // back to safe defaults instead of throwing out of generateMetadata.
    console.error(`Failed to load SEO metadata for "${title}":`, error);
    return FALLBACK_SEO;
  }
}
