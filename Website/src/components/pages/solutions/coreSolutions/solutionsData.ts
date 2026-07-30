import {
  BrandingIcon,
  DigitalMarketingIcon,
  ProductionIcon,
  WebsiteIcon,
} from "@/icons";
import { Solution } from "../types";

export const ALL_SOLUTIONS: Solution[] = [
  {
    icon: BrandingIcon,
    title: "branding",
    description: "branding_desc",
    link: "branding",
  },
  {
    icon: DigitalMarketingIcon,
    title: "digital_marketing",
    description: "digital_marketing_desc",
    link: "digital-marketing",
  },
  {
    icon: WebsiteIcon,
    title: "web_design",
    description: "web_design_desc",
    link: "web-design",
  },
  {
    icon: ProductionIcon,
    title: "production",
    description: "production_desc",
    link: "production",
  },
];
