import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface NavItemMedia {
  type: "image" | "video";
  file: string | null;
  poster: string | null;
}

export type NavItemImage = string | StaticImageData | NavItemMedia;

export interface NavItemProps {
  href: string;
  label: string;
  title: string;
  image?: NavItemImage;
  isRTL: boolean;
  type: "prev" | "next";
}

export interface NavigationProps {
  locale: LanguageType;
  basePath: string;
  previousLabel: string;
  nextLabel: string;
  prevItem: { slug: string; title: string; image?: NavItemImage };
  nextItem: { slug: string; title: string; image?: NavItemImage };
}
