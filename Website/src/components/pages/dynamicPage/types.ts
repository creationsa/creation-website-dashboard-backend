import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "@/types/media";
import { BlogsTeaserContent } from "./sections/blogsTeaserSection/types";
import { CultureIdentityContent } from "./sections/cultureIdentitySection/types";
import { DisplayInfoContent } from "./sections/displayInfoSection/types";
import { FeaturedWorksContent } from "./sections/featuredWorksSection/types";
import { MediaContentSectionContent } from "./sections/mediaContentSection/types";
import { ReviewsContent } from "./sections/reviewsSection/types";
import { TextListContent } from "./sections/textListSection/types";

export interface DynamicPageProps {
  params: Promise<{
    locale: LanguageType;
    slug: string;
  }>;
}

export interface DynamicPageSeo {
  title: string;
  description: string;
  image: string | null;
  image_alt: string | null;
  image_type: string | null;
  keywords: string | null;
}

export interface HeaderContent {
  first_title?: string;
  second_title?: string;
  third_title?: string;
}

export interface CtaBannerContent {
  title: string;
  description: string;
  button_text: string;
  button_slug: string;
}

export interface TextItemContent {
  text: string;
}

export interface NewsTickerContent {
  has_border: boolean;
  has_container: boolean;
  items: TextItemContent[];
}

export type { SmartMediaContent };

export interface BannerContent {
  first_title: string;
  second_title: string;
  third_title: string;
  left_media: SmartMediaContent;
  right_media: SmartMediaContent;
}

export interface AchievementsContent extends HeaderContent {
  achievement_media: SmartMediaContent;
  description: string;
  stat_1_number: string;
  stat_1_label: string;
  stat_2_number: string;
  stat_2_label: string;
  stat_3_number: string;
  stat_3_label: string;
  stat_4_number: string;
  stat_4_label: string;
}

export interface AdvancedOverviewContent extends HeaderContent {
  upper_description: string;
  lower_description: string;
  overlay_label_number?: string;
  overlay_label_title?: string;
  stat1_number: string;
  stat1_label: string;
  stat2_number: string;
  stat2_label: string;
  stat3_number: string;
  stat3_label: string;
  stat4_number: string;
  stat4_label: string;
  based_advanced_overview_media: SmartMediaContent;
}

export interface AccordionContentBlock {
  subtitle: string | null;
  description: string;
}

export interface AccordionItemContent {
  title: string;
  content_blocks: AccordionContentBlock[];
}

export interface CustomAccordionWithButtonContent extends HeaderContent {
  layout_type: "with_button";
  accordion_items: AccordionItemContent[];
  action_button_text: string;
  action_button_slug: string;
}

export interface CustomAccordionHeadingOnlyContent extends HeaderContent {
  layout_type: "heading_only";
  accordion_items: AccordionItemContent[];
}

export interface CustomAccordionWithMediaContent extends HeaderContent {
  layout_type: "with_media";
  accordion_items: AccordionItemContent[];
  banner_media: SmartMediaContent;
  side_label: string;
}

export type CustomAccordionSectionContent =
  | CustomAccordionWithButtonContent
  | CustomAccordionHeadingOnlyContent
  | CustomAccordionWithMediaContent;

export type SectionContentMap = {
  banner_section: BannerContent;
  display_info_section: DisplayInfoContent;
  featured_works_section: FeaturedWorksContent;
  achievements_section: AchievementsContent;
  culture_identity_section: CultureIdentityContent;
  news_ticker_section: NewsTickerContent;
  media_content_section: MediaContentSectionContent;
  advanced_overview_section: AdvancedOverviewContent;
  custom_accordion_section: CustomAccordionSectionContent;
  cta_banner: CtaBannerContent;
  header: HeaderContent;
  logos_section: Record<string, never>;
  reviews_section: ReviewsContent;
  blogs_teaser_section: BlogsTeaserContent;
  contact_section: Record<string, never>;
  text_list_section: TextListContent;
};

export type SectionType = keyof SectionContentMap;

export type PageSection = {
  [K in SectionType]: { type: K; content: SectionContentMap[K] };
}[SectionType];

export interface DynamicPageData {
  title: string;
  slug: string;
  is_home: boolean;
  sections: PageSection[];
  seo: DynamicPageSeo;
}
