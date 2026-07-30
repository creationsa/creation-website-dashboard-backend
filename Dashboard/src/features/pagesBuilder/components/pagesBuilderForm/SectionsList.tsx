import { SECTION_TYPES } from "../../constants/sectionTypes";
import AchievementsSection from "../../sections/achievementsSection";
import AdvancedOverviewSection from "../../sections/advancedOverviewSection";
import BannerSection from "../../sections/bannerSection";
import CtaBannerSection from "../../sections/ctaBanner";
import CultureIdentitySection from "../../sections/cultureIdentity";
import CustomAccordionSection from "../../sections/customAccordion";
import DisplayInformationSection from "../../sections/displayInformationSection";
import FeaturedWorksSection from "../../sections/featuredWorksSection";
import HeaderSection from "../../sections/header";
import LogosSection from "../../sections/logos";
import MediaContentSection from "../../sections/mediaContentSection";
import NewsTickerSection from "../../sections/newsTickerSection";
import type { SectionProps, SectionsListProps } from "../../types";

const SECTION_REGISTRY: Record<string, React.ComponentType<SectionProps>> = {
  [SECTION_TYPES.BANNER]: BannerSection,
  [SECTION_TYPES.LOGOS]: LogosSection,
  [SECTION_TYPES.ACHIEVEMENTS]: AchievementsSection,
  [SECTION_TYPES.DISPLAY_INFO]: DisplayInformationSection,
  [SECTION_TYPES.CULTURE_IDENTITY]: CultureIdentitySection,
  [SECTION_TYPES.NEWS_TICKER]: NewsTickerSection,
  [SECTION_TYPES.FEATURED_WORKS]: FeaturedWorksSection,
  [SECTION_TYPES.HEADER]: HeaderSection,
  [SECTION_TYPES.CTA_BANNER]: CtaBannerSection,
  [SECTION_TYPES.MEDIA_CONTENT]: MediaContentSection,
  [SECTION_TYPES.ADVANCED_OVERVIEW]: AdvancedOverviewSection,
  [SECTION_TYPES.CUSTOM_ACCORDION]: CustomAccordionSection,
};

export default function SectionsList({
  fields,
  form,
  disabled = false,
  onRemove,
}: SectionsListProps) {
  if (fields.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-10">
      {fields.map((field, index) => {
        const SectionComponent = SECTION_REGISTRY[field.type];

        if (!SectionComponent) return null;

        return (
          <SectionComponent
            key={field.id}
            form={form}
            disabled={disabled}
            index={index}
            onRemove={() => onRemove(index)}
          />
        );
      })}
    </div>
  );
}
