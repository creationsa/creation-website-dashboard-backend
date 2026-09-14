import { LanguageType } from "@/i18n.config";
import { HeaderContent } from "../../types";
import { SliderItemsProps } from "@/components/common/fullWidthItems/types";

export interface FeaturedWorksContent extends HeaderContent {
  items: SliderItemsProps[];
  layout_type: "full_width" | "contained";
  action_button_text?: string;
  action_button_slug?: string;
}

export interface ContainedSliderProps {
  projects: SliderItemsProps[];
  locale: LanguageType;
}

export interface ContainedSliderItemProps {
  item: SliderItemsProps;
  locale: LanguageType;
}

export interface FeaturedWorksSectionProps {
  content: FeaturedWorksContent;
  locale: LanguageType;
}
