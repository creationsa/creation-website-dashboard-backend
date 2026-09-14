import { SmartMediaContent } from "@/types/media";

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutBackgroundProps {
  media: SmartMediaContent;
  alt: string;
}

export interface AboutStatsProps {
  stats: AboutStat[];
  description: string;
}

export interface StatItemProps {
  value: string;
  label: string;
}
