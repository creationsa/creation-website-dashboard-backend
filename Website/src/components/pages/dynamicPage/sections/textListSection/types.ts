import { LanguageType } from "@/i18n.config";
import { HeaderContent } from "../../types";

export interface TextBlockDescriptionContent {
  block_type: "description";
  description: string;
}

export interface TextListPointContent {
  label?: string;
  description: string;
}

export interface TextBlockListContent {
  block_type: "list";
  points: TextListPointContent[];
}

export type TextBlockContent =
  | TextBlockDescriptionContent
  | TextBlockListContent;

export interface TextListItemContent {
  header: string;
  blocks: TextBlockContent[];
}

export interface TextListContent extends HeaderContent {
  has_sticky_sidebar: boolean;
  sections_label?: string;
  sticky_description?: string;
  items: TextListItemContent[];
}

export interface TextBlockProps {
  block: TextBlockContent;
  index: number;
}

export interface StickySidebarProps {
  sectionsLabel: string;
  stickyDescription?: string;
  items: TextListItemContent[];
}

export interface TextListItemProps {
  item: TextListItemContent;
  index: number;
  hasStickySidebar: boolean;
}

export interface TextListSectionProps {
  content: TextListContent;
  locale: LanguageType;
}
