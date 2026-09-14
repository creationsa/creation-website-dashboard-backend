import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import type { SectionProps } from "../../types";
import banner from "./assets/banner.png";
import ImagesSection from "./ImagesSection";
import TitleSection from "./TitleSection";

export default function BannerSection({ form, index, disabled }: SectionProps) {
  const { t } = useTranslation();
  return (
    <>
      <SectionPreview
        src={banner}
        alt={t("pages.banner_section.banner_preview")}
      />
      {/* MAIN TITLE */}
      <TitleSection form={form} index={index} disabled={disabled} />

      {/* IMAGES */}
      <ImagesSection form={form} index={index} disabled={disabled} />
    </>
  );
}
