import type { Metadata } from "@/shared/types/seo";
import type { SeoFormValues } from "./SeoSchema";

export default function getSeoDefaultValues(seoData?: Metadata): SeoFormValues {
  return {
    title_en: seoData?.en?.title || "",
    title_ar: seoData?.ar?.title || "",

    seo_desc_en: seoData?.en?.description || "",
    seo_desc_ar: seoData?.ar?.description || "",

    keywords:
      seoData?.keywords
        ?.replace(/[{}"]/g, "")
        .split(",")
        .map((keyword: string) => keyword.trim()) || [],

    image_en: seoData?.en?.image || "",
    image_ar: seoData?.ar?.image || "",
  };
}
