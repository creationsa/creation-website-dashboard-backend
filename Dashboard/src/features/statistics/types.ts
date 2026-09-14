import type { ComponentType, SVGProps } from "react";

export interface StatisticsCounts {
  projects: number;
  solutions: number;
  blogs: number;
  clients: number;
  pages: number;
  social_links: number;
}

export type RecentItemType = "project" | "solution" | "blog" | "page";

export interface RecentItem {
  id: number;
  type: RecentItemType;
  title: string | null;
  updated_at: string;
}

export interface StatisticsProps {
  counts: StatisticsCounts;
  recent: RecentItem[];
}

export interface OverviewCardsProps {
  counts: StatisticsCounts;
}

export interface CardConfig {
  key: keyof StatisticsCounts;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface RecentActivityProps {
  items: RecentItem[];
}
