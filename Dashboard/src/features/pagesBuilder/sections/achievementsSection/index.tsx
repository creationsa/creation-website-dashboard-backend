import SmartMediaField from "@/shared/components/smartMediaField";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import SectionPreview from "../../../../shared/components/sectionPreview";
import type { SectionProps } from "../../types";
import Header from "../header";
import achievements from "./assets/achievements.png";
import StatsConfigFields from "./StatsConfigFields";

export default function AchievementsSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();

  return (
    <>
      <SectionPreview
        src={achievements}
        alt={t("pages.achievements.achievements_preview")}
      />
      <Header form={form} index={index} disabled={disabled} />

      {/* 2. VIDEO & POSTER MEDIA CONFIG */}
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <SubHeadTitle title={t("pages.achievements.media_settings")} />
        <SmartMediaField
          form={form}
          name={`sections.${index}.content.achievement_media`}
          disabled={disabled}
        />
      </div>

      {/* 3. STATS COUNTERS & DESCRIPTION */}
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <SubHeadTitle title={t("pages.achievements.stats_settings")} />
        <StatsConfigFields form={form} index={index} disabled={disabled} />
      </div>
    </>
  );
}
