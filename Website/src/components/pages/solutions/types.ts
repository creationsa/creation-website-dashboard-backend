import { SliderItemsProps } from "@/components/common/fullWidthItems/types";
import { LanguageType } from "@/i18n.config";
export interface SolutionListItem {
  title: string;
  slug: string;
  image: string | null;
  small_description: string | null;
  icon: string | null;
}

export interface SolutionsAccordionContentBlock {
  subtitle: string | null;
  description: string;
}

export interface SolutionsAccordionItem {
  title: string;
  content_blocks: SolutionsAccordionContentBlock[];
}

export interface SolutionsMainData {
  first_title: string;
  second_title: string;
  third_title: string;
  core_desc: string;
  core_sub_desc: string;
  items_header: {
    first_title: string;
    second_title: string;
    third_title: string;
  };
  items: SliderItemsProps[];
  ticker_items: string[] | string;
  accordion_items_header: {
    first_title: string;
    second_title: string;
    third_title: string;
  };
  accordion_media: string | null;
  accordion_media_poster: string | null;
  accordion_items: SolutionsAccordionItem[];
}

export interface SolutionsCoreProps {
  solutions: SolutionListItem[];
  mainData: SolutionsMainData;
  locale: LanguageType;
}

export interface SolutionCardProps {
  solution: SolutionListItem;
  locale: LanguageType;
}

export interface WhatWeOfferProps {
  mainData: SolutionsMainData;
  locale: LanguageType;
}

export interface AllSolutionsProps {
  mainData: SolutionsMainData;
  locale: LanguageType;
}

export interface OurCapabilitiesProps {
  mainData: SolutionsMainData;
  locale: LanguageType;
}
