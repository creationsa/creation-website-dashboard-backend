import { NetworkTranslations } from "@/dictionaries/types";
import { ComponentType, SVGProps } from "react";

export interface NetworkProps {
  network: NetworkTranslations;
}

export interface NetworksProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}
