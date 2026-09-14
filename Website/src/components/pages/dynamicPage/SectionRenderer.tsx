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
      ); // done lsh al role w al focus aly fy al career fy al accordion

    case "text_list_section":
      return <TextListSection content={section.content} locale={locale} />; // DONE ✔

    case "banner_section":
      return <BannerSection content={section.content} locale={locale} />; // DONE ✔

    case "media_content_section":
      return <MediaContentSection content={section.content} locale={locale} />; // DONE ✔

    case "advanced_overview_section":
      return (
        <AdvancedOverviewSection content={section.content} locale={locale} />
      ); // DONE ✔

    case "culture_identity_section":
      return (
        <CultureIdentitySection content={section.content} locale={locale} />
      ); // DONE ✔

    case "header":
      return <HeaderSection content={section.content} locale={locale} />; // DONE ✔

    case "achievements_section":
      return <AchievementsSection content={section.content} locale={locale} />; // DONE ✔

    case "display_info_section":
      return <DisplayInfoSection content={section.content} locale={locale} />; // DONE ✔

    case "cta_banner":
      return <CtaBannerSection content={section.content} locale={locale} />; // DONE ✔

    case "contact_section":
      return <ContactSection locale={locale} />; // DONE ✔

    case "news_ticker_section":
      return <NewsTickerSection content={section.content} />; // DONE ✔

    case "logos_section":
      return <LogosSection locale={locale} />; // DONE ✔

    case "featured_works_section":
      return <FeaturedWorksSection content={section.content} locale={locale} />; // DONE ✔

    case "reviews_section":
      return <ReviewsSection content={section.content} locale={locale} />; // DONE ✔

    case "blogs_teaser_section":
      return <BlogsTeaserSection content={section.content} locale={locale} />; // DONE ✔

    default:
      return null;
  }
}
