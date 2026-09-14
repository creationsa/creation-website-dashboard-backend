import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "@/types/media";
import { HeaderContent } from "../../types";

export interface SolutionItemProps {
  block: DisplayInfoBlock;
  index: number;
  total: number;
  locale: LanguageType;
}

export interface SolutionInfoProps {
  locale: LanguageType;
  current: string;
  total: string;
  left_block: DisplayInfoLeft;
}

export interface SolutionNumberProps {
  current: string;
  total: string;
}

export interface ProjectCardProps {
  project_details: DisplayInfoCard;
  locale: LanguageType;
  description: string;
}

export interface DisplayInfoLeft {
  title: string;
  description: string;
  slug: string | null;
  button_label: string;
}

export interface DisplayInfoCard {
  title: string;
  slug: string | null;
  image: SmartMediaContent | null;
}

export interface DisplayInfoBlock {
  left: DisplayInfoLeft;
  first_right: DisplayInfoCard;
  second_right: DisplayInfoCard;
  first_right_card_desc: string;
  second_right_card_desc: string;
}

export interface DisplayInfoContent extends HeaderContent {
  blocks: DisplayInfoBlock[];
}
