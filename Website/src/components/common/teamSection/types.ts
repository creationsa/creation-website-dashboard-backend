import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface TeamSectionProps {
  title: string;
  description: string;
  subDescription: string;
  locale: LanguageType;
}

export interface SlideData {
  image: StaticImageData;
  title: string;
  description: string;
}
