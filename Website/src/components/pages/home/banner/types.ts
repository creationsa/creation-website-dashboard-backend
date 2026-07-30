import { BannerTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { Variants } from "framer-motion";
import { StaticImageData } from "next/image";

export interface BannerProps {
  banner: BannerTranslations;
  locale: LanguageType;
}

export interface AnimatedHeroImageProps {
  src: StaticImageData;
  alt: string;
  className: string;
  variants: Variants;
  delay?: number;
}
