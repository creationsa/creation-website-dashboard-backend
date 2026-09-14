import CountUp from "@/components/ui/CountUp";
import Header from "@/components/ui/Header";
import SmartMedia from "@/components/ui/SmartMedia";
import TextWithMotion from "@/components/ui/TextWithMotion";
import { LanguageType } from "@/i18n.config";
import { AdvancedOverviewContent } from "../../types";
import StatsSection from "./StatsSection";

interface AdvancedOverviewSectionProps {
  content: AdvancedOverviewContent;
  locale: LanguageType;
}

export default function AdvancedOverviewSection({
  content,
  locale,
}: AdvancedOverviewSectionProps) {
  const media = content.based_advanced_overview_media;

  return (
    <section className="container flex flex-col gap-10">
      <Header
        title={content.first_title}
        description={content.second_title || ""}
        subDescription={content.third_title}
        hasContainer={false}
        lang={locale}
      />

      <TextWithMotion text={content.upper_description} lang={locale} />

      <div className="relative aspect-video w-full md:aspect-21/9">
        <SmartMedia
          media={media}
          alt={media.alt || content.first_title || ""}
          className="w-full object-cover"
          sizes="(min-width: 1280px) 1280px, 100vw"
        />

        {content.overlay_label_number && content.overlay_label_title && (
          <div className="text-black-100 bg-tiffany-600 dark:bg-tiffany-100 absolute start-0 bottom-0 z-10 flex size-36 flex-col items-center justify-center gap-2 px-5 py-3 text-center sm:size-52 md:size-60 lg:size-80">
            <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl">
              <CountUp value={content.overlay_label_number} />
            </span>
            <span className="text-lg font-semibold uppercase sm:text-xl md:text-2xl lg:text-3xl">
              {content.overlay_label_title}
            </span>
          </div>
        )}
      </div>

      <TextWithMotion
        text={content.lower_description}
        lang={locale}
        direction="start"
      />

      <StatsSection
        stats={[
          { value: content.stat1_number, label: content.stat1_label },
          { value: content.stat2_number, label: content.stat2_label },
          { value: content.stat3_number, label: content.stat3_label },
          { value: content.stat4_number, label: content.stat4_label },
        ]}
      />
    </section>
  );
}
