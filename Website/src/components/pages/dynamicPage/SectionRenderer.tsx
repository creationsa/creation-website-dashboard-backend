import { LanguageType } from "@/i18n.config";
import AchievementsSection from "./sections/achievementsSection";
import AdvancedOverviewSection from "./sections/advancedOverviewSection";
import BannerSection from "./sections/bannerSection";
import BlogsTeaserSection from "./sections/blogsTeaserSection";
import ContactSection from "./sections/ContactSection";
import CtaBannerSection from "./sections/ctaBannerSection";
import CultureIdentitySection from "./sections/cultureIdentitySection";
import CustomAccordionSection from "./sections/customAccordionSection";
import DisplayInfoSection from "./sections/displayInfoSection";
import FeaturedWorksSection from "./sections/featuredWorksSection";
import HeaderSection from "./sections/HeaderSection";
import LogosSection from "./sections/LogosSection";
import MediaContentSection from "./sections/mediaContentSection";
import NewsTickerSection from "./sections/NewsTickerSection";
import ReviewsSection from "./sections/reviewsSection";
import TextListSection from "./sections/textListSection";
import { PageSection } from "./types";

interface SectionRendererProps {
  section: PageSection;
  locale: LanguageType;
}

export default function SectionRenderer({
  section,
  locale,
}: SectionRendererProps) {
  switch (section.type) {
    case "custom_accordion_section":
      return (
        <CustomAccordionSection content={section.content} locale={locale} />
      );

    case "text_list_section":
      return <TextListSection content={section.content} locale={locale} />;

    case "banner_section":
      return <BannerSection content={section.content} locale={locale} />;

    case "media_content_section":
      return <MediaContentSection content={section.content} locale={locale} />;

    case "advanced_overview_section":
      return (
        <AdvancedOverviewSection content={section.content} locale={locale} />
      );

    case "culture_identity_section":
      return (
        <CultureIdentitySection content={section.content} locale={locale} />
      );

    case "header":
      return <HeaderSection content={section.content} locale={locale} />;

    case "achievements_section":
      return <AchievementsSection content={section.content} locale={locale} />;

    case "display_info_section":
      return <DisplayInfoSection content={section.content} locale={locale} />;

    case "cta_banner":
      return <CtaBannerSection content={section.content} locale={locale} />;

    case "contact_section":
      return <ContactSection locale={locale} />;

    case "news_ticker_section":
      return <NewsTickerSection content={section.content} />;

    case "logos_section":
      return <LogosSection locale={locale} />;

    case "featured_works_section":
      return <FeaturedWorksSection content={section.content} locale={locale} />;

    case "reviews_section":
      return <ReviewsSection content={section.content} locale={locale} />;

    case "blogs_teaser_section":
      return <BlogsTeaserSection content={section.content} locale={locale} />;

    default:
      return null;
  }
}
