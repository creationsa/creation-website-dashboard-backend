import SelectField from "@/shared/ui/selectField";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SECTION_TYPES } from "../../constants/sectionTypes";
import type { SectionSelectorProps } from "../../types";

export default function SectionSelector({ onSelect }: SectionSelectorProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState<string | number | undefined>();

  const options = useMemo(
    () => [
      {
        label: t("pages.banner_section.section_title"),
        value: SECTION_TYPES.BANNER,
      },
      {
        label: t("pages.display_info_section.section_title"),
        value: SECTION_TYPES.DISPLAY_INFO,
      },
      {
        label: t("pages.featured_works.section_title"),
        value: SECTION_TYPES.FEATURED_WORKS,
      },
      {
        label: t("pages.achievements.section_title"),
        value: SECTION_TYPES.ACHIEVEMENTS,
      },
      {
        label: t("pages.culture_identity.section_title"),
        value: SECTION_TYPES.CULTURE_IDENTITY,
      },
      {
        label: t("pages.news_ticker.section_title"),
        value: SECTION_TYPES.NEWS_TICKER,
      },
      {
        label: t("pages.media_content_section.section_title"),
        value: SECTION_TYPES.MEDIA_CONTENT,
      },
      {
        label: t("pages.advanced_overview_section.section_title"),
        value: SECTION_TYPES.ADVANCED_OVERVIEW,
      },
      {
        label: t("pages.custom_accordion.section_title"),
        value: SECTION_TYPES.CUSTOM_ACCORDION,
      },
      {
        label: t("pages.cta_banner.section_title"),
        value: SECTION_TYPES.CTA_BANNER,
      },
      {
        label: t("pages.header"),
        value: SECTION_TYPES.HEADER,
      },
      {
        label: t("pages.logos.section_title"),
        value: SECTION_TYPES.LOGOS,
      },
    ],
    [t],
  );

  const handleChange = (selected: string | number | undefined) => {
    if (!selected) return;
    onSelect(String(selected));
    setValue(undefined);
  };

  return (
    <SelectField
      name="section-selector"
      label={t("pages.add_new_section")}
      value={value}
      options={options}
      onChange={handleChange}
      placeholder={t("pages.choose_section")}
    />
  );
}
