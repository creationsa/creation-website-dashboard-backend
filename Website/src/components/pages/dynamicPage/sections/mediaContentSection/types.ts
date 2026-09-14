import { LanguageType } from "@/i18n.config";
import {
  AccordionItemContent,
  HeaderContent,
  SmartMediaContent,
  TextItemContent,
} from "../../types";

export interface MediaContentDescriptionContent extends HeaderContent {
  content_type: "description";
  is_media_right: boolean;
  media: SmartMediaContent;
  description: string;
}

export interface MediaContentAccordionContent extends HeaderContent {
  content_type: "accordion";
  is_media_right: boolean;
  media: SmartMediaContent;
  accordion_items: AccordionItemContent[];
}

export interface MediaContentListContent extends HeaderContent {
  content_type: "list";
  is_media_right: boolean;
  media: SmartMediaContent;
  list_items: TextItemContent[];
}

export type MediaContentSectionContent =
  | MediaContentDescriptionContent
  | MediaContentAccordionContent
  | MediaContentListContent;

export interface MediaContentSectionProps {
  content: MediaContentSectionContent;
  locale: LanguageType;
}

export interface MediaBlockProps {
  media: SmartMediaContent;
  is_media_right: boolean;
  is_list: boolean;
}

export interface ListContentProps {
  content: MediaContentListContent;
}

export interface RichContentProps {
  content: MediaContentDescriptionContent | MediaContentAccordionContent;
  locale: LanguageType;
}
