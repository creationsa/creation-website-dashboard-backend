import Header from "@/components/ui/Header";
import { LanguageType } from "@/i18n.config";
import { AchievementsContent } from "../../types";
import AboutBackground from "./AboutBackground";
import AboutStats from "./AboutStats";

interface AchievementsSectionProps {
  content: AchievementsContent;
  locale: LanguageType;
}

export default function AchievementsSection({
  content,
  locale,
}: AchievementsSectionProps) {
  return (
    <section className="relative flex min-h-[80vh] flex-col gap-4 overflow-hidden md:min-h-screen">
      <Header
        title={content.first_title}
        description={content.second_title || ""}
        subDescription={content.third_title}
        inlineHeadings
        lang={locale}
      />

      <div className="relative flex-1 overflow-hidden">
        <AboutBackground
          media={content.achievement_media}
          alt={content.achievement_media.alt || content.first_title || ""}
        />

        <div className="relative z-10 container h-full">
          <AboutStats
            stats={[
              { value: content.stat_1_number, label: content.stat_1_label },
              { value: content.stat_2_number, label: content.stat_2_label },
              { value: content.stat_3_number, label: content.stat_3_label },
              { value: content.stat_4_number, label: content.stat_4_label },
            ]}
            description={content.description}
          />
        </div>
      </div>
    </section>
  );
}
