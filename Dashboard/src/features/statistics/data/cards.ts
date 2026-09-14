import { routes } from "@/app/navigation/routes";
import type { CardConfig } from "../types";
import {
  BlogsIcon,
  FooterIcon,
  GlobalIcon,
  PageBuilderIcon,
  ProjectIcon,
  SolutionIcon,
} from "@/shared/icons";

export const CARDS: CardConfig[] = [
  {
    key: "projects",
    label: "projects.title",
    href: `${routes.projects}/${routes.manageProjects}`,
    icon: ProjectIcon,
  },
  {
    key: "solutions",
    label: "solutions.title",
    href: `${routes.solutions}/${routes.manageSolutions}`,
    icon: SolutionIcon,
  },
  {
    key: "blogs",
    label: "blogs.title",
    href: `${routes.blogs}/${routes.manageBlogs}`,
    icon: BlogsIcon,
  },
  {
    key: "pages",
    label: "pages.title",
    href: routes.pagesBuilder,
    icon: PageBuilderIcon,
  },
  {
    key: "clients",
    label: "clients.clients",
    href: routes.clients,
    icon: GlobalIcon,
  },
  {
    key: "social_links",
    label: "footer.social_section",
    href: routes.footer,
    icon: FooterIcon,
  },
];
