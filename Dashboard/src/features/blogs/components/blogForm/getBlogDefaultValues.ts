import { TITLE_SECTION_INITIAL_STATE } from "@/shared/components/titleSection/getTitleSectionDefaultValues";
import type { SingleBlog } from "../../types";
import type { BlogFormValues } from "./blogSchema";
import { SEO_SECTION_INITIAL_STATE } from "@/shared/components/seoSection/getSeoSectionDefaultValues";
import { SLUG_SECTION_INITIAL_STATE } from "@/shared/components/slugSection/getSlugSectionDefaultValues";

const BLOG_INITIAL_STATE = {
  show_in_home: false,

  ...TITLE_SECTION_INITIAL_STATE,
  ...SLUG_SECTION_INITIAL_STATE,
  ...SEO_SECTION_INITIAL_STATE,

  base_image: "",
  base_image_alt_en: "",
  base_image_alt_ar: "",

  cover_image: "",
  cover_image_alt_en: "",
  cover_image_alt_ar: "",

  first_sub_title_en: "",
  first_sub_title_ar: "",
  first_desc_en: "",
  first_desc_ar: "",
  second_desc_en: "",
  second_desc_ar: "",

  second_sub_title_en: "",
  second_sub_title_ar: "",
  items: [
    {
      ar: {
        desc: "",
      },
      en: {
        desc: "",
      },
    },
  ],
};

export default function getBlogDefaultValues(
  blogToEdit?: SingleBlog,
): BlogFormValues {
  if (!blogToEdit) return BLOG_INITIAL_STATE;
  return {
    show_in_home: blogToEdit?.show_in_home ?? false,

    title_en: blogToEdit?.en?.title || "",
    title_ar: blogToEdit?.ar?.title || "",

    slug_en: blogToEdit?.en?.slug || "",

    seo_desc_en: blogToEdit?.en?.seo_desc || "",
    seo_desc_ar: blogToEdit?.ar?.seo_desc || "",

    base_image: blogToEdit?.base_image_object?.media || "",
    base_image_alt_en: blogToEdit?.base_image_object?.en?.alt || "",
    base_image_alt_ar: blogToEdit?.base_image_object?.ar?.alt || "",

    cover_image: blogToEdit?.cover_image_object?.media || "",
    cover_image_alt_en: blogToEdit?.cover_image_object?.en?.alt || "",
    cover_image_alt_ar: blogToEdit?.cover_image_object?.ar?.alt || "",

    first_sub_title_en: blogToEdit?.en?.first_sub_title || "",
    first_sub_title_ar: blogToEdit?.ar?.first_sub_title || "",
    first_desc_en: blogToEdit?.en?.first_desc || "",
    first_desc_ar: blogToEdit?.ar?.first_desc || "",
    second_desc_en: blogToEdit?.en?.second_desc || "",
    second_desc_ar: blogToEdit?.ar?.second_desc || "",

    second_sub_title_en: blogToEdit?.en?.second_sub_title || "",
    second_sub_title_ar: blogToEdit?.ar?.second_sub_title || "",

    items:
      blogToEdit?.items?.map((item) => ({
        en: { desc: item.en?.desc || "" },
        ar: { desc: item.ar?.desc || "" },
      })) || BLOG_INITIAL_STATE.items,
  };
}
