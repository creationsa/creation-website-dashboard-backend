import type { ComponentType, SVGProps } from "react";
import type { RecentItemType } from "../types";
import {
  BlogsIcon,
  PageBuilderIcon,
  ProjectIcon,
  SolutionIcon,
} from "@/shared/icons";
import { routes } from "@/app/navigation/routes";

export const TYPE_CONFIG: Record<
  RecentItemType,
  {
    labelKey: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: (id: number) => string;
  }
> = {
  project: {
    labelKey: "projects.title",
    icon: ProjectIcon,
    href: (id) => `${routes.projects}/${id}/update`,
  },
  solution: {
    labelKey: "solutions.title",
    icon: SolutionIcon,
    href: (id) => `${routes.solutions}/${id}/update`,
  },
  blog: {
    labelKey: "blogs.title",
    icon: BlogsIcon,
    href: (id) => `${routes.blogs}/${id}/update`,
  },
  page: {
    labelKey: "pages.title",
    icon: PageBuilderIcon,
    href: (id) => `${routes.pagesBuilder}/${id}/update`,
  },
};
