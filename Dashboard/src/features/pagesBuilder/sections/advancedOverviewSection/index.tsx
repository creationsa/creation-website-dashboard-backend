import SmartMediaField from "@/shared/components/smartMediaField";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import type { SectionProps } from "../../types";
import Header from "../header";
import advancedOverview from "./assets/advanced-overview.png";
import OverviewStatsFields from "./OverviewStatsFields";
import OverviewTextFields from "./OverviewTextFields";

export default function AdvancedOverviewSection({
  form,
  index,
  disabled,
  onRemove,
}: SectionProps) {
  const { t } = useTranslation();

  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.advanced_overview_section.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview
        src={advancedOverview}
        alt={t("pages.advanced_overview_section.advanced_overview_preview")}
      />

      <Header form={form} index={index} disabled={disabled} />
      {/* 1. TEXT FIELDS */}
      <OverviewTextFields form={form} index={index} disabled={disabled} />

      {/* 2. REUSABLE SMART MEDIA FIELD */}
      <div className="rounded-xl border p-4">
        <SmartMediaField
          form={form}
          name={`sections.${index}.content.based_advanced_overview_media`}
          label={t("pages.advanced_overview_section.media_label")}
          disabled={disabled}
        />
      </div>

      {/* 3. COUNTERS / STATS FIELDS */}
      <OverviewStatsFields form={form} index={index} disabled={disabled} />

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
