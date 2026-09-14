import type { FooterProps } from "../types";
import type { FooterFormValues } from "./footerSchema";

export const BADGE_INITIAL_STATE = {
  label_en: "",
  label_ar: "",
  link: "",
  image: "",
};

const FOOTER_INITIAL_STATE: FooterFormValues = {
  statement_image: "",
  statement_desc_en: "",
  statement_desc_ar: "",
  statement_image_alt_en: "",
  statement_image_alt_ar: "",

  description_en: "",
  description_ar: "",
  tagline_en: "",
  tagline_ar: "",
  menu_title_en: "",
  menu_title_ar: "",
  social_title_en: "",
  social_title_ar: "",
  copyright_text_en: "",
  copyright_text_ar: "",

  menu_items: [],
  copyright_items: [],
  social_items: [],

  badges: Array.from({ length: 2 }, () => ({ ...BADGE_INITIAL_STATE })),
};

export default function getFooterDefaultValues(
  footerToEdit?: FooterProps,
): FooterFormValues {
  if (!footerToEdit) return FOOTER_INITIAL_STATE;

  return {
    statement_image: footerToEdit.statement_image || "",
    statement_desc_en: footerToEdit.statement_desc_en || "",
    statement_desc_ar: footerToEdit.statement_desc_ar || "",
    statement_image_alt_en: footerToEdit.statement_image_alt_en || "",
    statement_image_alt_ar: footerToEdit.statement_image_alt_ar || "",

    description_en: footerToEdit.description_en || "",
    description_ar: footerToEdit.description_ar || "",
    tagline_en: footerToEdit.tagline_en || "",
    tagline_ar: footerToEdit.tagline_ar || "",
    menu_title_en: footerToEdit.menu_title_en || "",
    menu_title_ar: footerToEdit.menu_title_ar || "",
    social_title_en: footerToEdit.social_title_en || "",
    social_title_ar: footerToEdit.social_title_ar || "",
    copyright_text_en: footerToEdit.copyright_text_en || "",
    copyright_text_ar: footerToEdit.copyright_text_ar || "",

    menu_items: footerToEdit.menu_items?.length
      ? footerToEdit.menu_items.map((item) => ({
          type: item.type,
          page_id: item.page_id,
        }))
      : [],

    copyright_items: footerToEdit.copyright_items?.length
      ? footerToEdit.copyright_items.map((item) => ({
          type: item.type,
          page_id: item.page_id,
        }))
      : [],

    social_items: footerToEdit.social_items?.length
      ? footerToEdit.social_items.map((item) => ({
          setting_social_id: item.setting_social_id,
        }))
      : [],

    badges: footerToEdit.badges?.length === 2
      ? footerToEdit.badges
      : Array.from({ length: 2 }, () => ({ ...BADGE_INITIAL_STATE })),
  };
}
