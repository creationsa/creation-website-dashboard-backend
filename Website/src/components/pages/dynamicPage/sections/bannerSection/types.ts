import { Variants } from "framer-motion";
import { SmartMediaContent } from "../../types";

export interface HeroMediaProps {
  media: SmartMediaContent;
  alt: string;
  className: string;
  variants: Variants;
  delay?: number;
  sizes: string;
}
