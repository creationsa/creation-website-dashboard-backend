import SmartMediaField from "@/shared/components/smartMediaField";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import type { SectionProps } from "../../types";
import Header from "../header";
import advancedOverview from "./assets/advanced-overview.png";
import OverviewStatsFields from "./OverviewStatsFields";
import OverviewTextFields from "./OverviewTextFields";

export default function AdvancedOverviewSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
}
