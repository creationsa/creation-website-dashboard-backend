import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "@/types/media";

export interface SliderItemsProps {
  title: string;
  slug: string | null;
  image: SmartMediaContent | null;
}

export interface FullWidthSliderItemProps {
  item: SliderItemsProps;
  locale: LanguageType;
}

export interface FullWidthSliderProps {
  locale: LanguageType;
  items: SliderItemsProps[];
}
