import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SECTION_TITLE_KEYS } from "../../constants/sectionTitles";
import { SECTION_TYPES } from "../../constants/sectionTypes";
import AchievementsSection from "../../sections/achievementsSection";
import AdvancedOverviewSection from "../../sections/advancedOverviewSection";
import BannerSection from "../../sections/bannerSection";
import CtaBannerSection from "../../sections/ctaBanner";
import CultureIdentitySection from "../../sections/cultureIdentity";
import ContactSection from "../../sections/contactSection";
import CustomAccordionSection from "../../sections/customAccordion";
import DisplayInformationSection from "../../sections/displayInformationSection";
import FeaturedWorksSection from "../../sections/featuredWorksSection";
import HeaderSection from "../../sections/header";
import BlogsTeaserSection from "../../sections/blogsTeaser";
import LogosSection from "../../sections/logos";
import MediaContentSection from "../../sections/mediaContentSection";
import NewsTickerSection from "../../sections/newsTickerSection";
import ReviewsSection from "../../sections/reviewsSection";
import TextListSection from "../../sections/textListSection";
import type { SectionProps, SectionsListProps } from "../../types";
import SectionAccordion from "./SectionAccordion";

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
  [SECTION_TYPES.REVIEWS]: ReviewsSection,
  [SECTION_TYPES.BLOGS_TEASER]: BlogsTeaserSection,
  [SECTION_TYPES.CONTACT]: ContactSection,
  [SECTION_TYPES.TEXT_LIST]: TextListSection,
};

export default function SectionsList({
  fields,
  form,
  disabled = false,
  onRemove,
  onMove,
}: SectionsListProps) {
  const { t } = useTranslation();
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>(
    {},
  );

  if (fields.length === 0) return null;

  const toggleCollapse = (fieldId: string) => {
    setCollapsedIds((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  return (
    <div className="mt-4 flex flex-col gap-10">
      {fields.map((field, index) => {
        const SectionComponent = SECTION_REGISTRY[field.type];

        if (!SectionComponent) return null;

        const titleKey = SECTION_TITLE_KEYS[field.type];
        const title = `( ${index + 1} ) ${titleKey ? t(titleKey) : field.type}`;

        return (
          <SectionAccordion
            key={field.id}
            title={title}
            isCollapsed={Boolean(collapsedIds[field.id])}
            onToggleCollapse={() => toggleCollapse(field.id)}
            onMoveUp={() => onMove(index, index - 1)}
            onMoveDown={() => onMove(index, index + 1)}
            canMoveUp={index > 0}
            canMoveDown={index < fields.length - 1}
            onRemove={() => onRemove(index)}
            disabled={disabled}
          >
            <SectionComponent
              form={form}
              disabled={disabled}
              index={index}
              onRemove={() => onRemove(index)}
            />
          </SectionAccordion>
        );
      })}
    </div>
  );
}
