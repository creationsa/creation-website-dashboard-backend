import type { Metadata } from "@/shared/components/seoForm/types";
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
    image_alt_en: seoData?.en?.image_alt || "",
    image_alt_ar: seoData?.ar?.image_alt || "",
    image_type_en: seoData?.en?.image_type || "",
    image_type_ar: seoData?.ar?.image_type || "",

    site_name_en: seoData?.en?.site_name || "",
    site_name_ar: seoData?.ar?.site_name || "",
  };
}
