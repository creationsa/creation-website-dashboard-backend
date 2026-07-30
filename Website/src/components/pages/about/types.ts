import { AboutTranslations, TeamsTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface BaseAboutProps {
  locale: LanguageType;
  about: AboutTranslations;
}

export interface StatItemProps {
  value: string;
  label: string;
}

export interface StatsSectionProps {
  stats: StatItemProps[];
}

export interface TeamSectionProps {
  teams: TeamsTranslations;
  locale: LanguageType;
}

export interface SocialLinks {
  TwitterUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export interface SlideData extends SocialLinks {
  image: StaticImageData;
  title: string;
  description: string;
  detailLink: string;
}
