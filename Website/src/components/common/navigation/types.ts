import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface NavItemProps {
  href: string;
  label: string;
  title: string;
  image?: StaticImageData;
  isRTL: boolean;
  type: "prev" | "next";
}

export interface NavigationProps {
  locale: LanguageType;
  basePath: string;
  previousLabel: string;
  nextLabel: string;
  prevItem: { slug: string; title: string; image?: StaticImageData };
  nextItem: { slug: string; title: string; image?: StaticImageData };
}
