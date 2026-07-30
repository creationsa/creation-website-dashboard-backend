import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import type { SectionProps } from "../../types";
import banner from "./assets/banner.png";
import ImagesSection from "./ImagesSection";
import TitleSection from "./TitleSection";

export default function BannerSection({
  form,
  index,
  disabled,
  onRemove,
}: SectionProps) {
  const { t } = useTranslation();
  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.banner_section.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview
        src={banner}
        alt={t("pages.banner_section.banner_preview")}
      />
      {/* MAIN TITLE */}
      <TitleSection form={form} index={index} disabled={disabled} />

      {/* IMAGES */}
      <ImagesSection form={form} index={index} disabled={disabled} />

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
