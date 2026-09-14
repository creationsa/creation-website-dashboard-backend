import { routes } from "@/app/navigation/routes";
import {
  BlogsIcon,
  ChartIcon,
  FooterIcon,
  GlobalIcon,
  HeaderIcon,
  PageBuilderIcon,
  ProjectIcon,
  SettingsIcon,
  SolutionIcon,
} from "@/shared/icons";
import type { SidebarLink } from "../types";

export const links: SidebarLink[] = [
  {
    href: "/",
    icon: ChartIcon,
    title: "statistics.statistics",
  },
  {
    href: routes.pagesBuilder,
    icon: PageBuilderIcon,
    title: "pages.title",
  },
  {
    href: routes.blogs,
    icon: BlogsIcon,
    title: "blogs.title",
    activePrefix: routes.blogs,
    submenuItems: [
      {
        href: `${routes.blogs}/${routes.blogsMainPage}`,
        title: "blogs.blogs_main_page",
      },
      {
        href: `${routes.blogs}/${routes.manageBlogs}`,
        title: "blogs.manage_blogs",
      },
      {
        href: `${routes.blogs}/${routes.blogsSeo}`,
        title: "general.seo_settings",
      },
    ],
  },
  {
    href: routes.projects,
    icon: ProjectIcon,
    title: "projects.title",
    activePrefix: routes.projects,
    submenuItems: [
      {
        href: `${routes.projects}/${routes.projectsMainPage}`,
        title: "projects.projects_main_page",
      },
      {
        href: `${routes.projects}/${routes.manageProjects}`,
        title: "projects.manage_projects",
      },
      {
        href: `${routes.projects}/${routes.projectsSeo}`,
        title: "general.seo_settings",
      },
    ],
  },
  {
    href: routes.solutions,
    icon: SolutionIcon,
    title: "solutions.title",
    activePrefix: routes.solutions,
    submenuItems: [
      {
        href: `${routes.solutions}/${routes.solutionsMainPage}`,
        title: "solutions.solutions_main_page",
      },
      {
        href: `${routes.solutions}/${routes.manageSolutions}`,
        title: "solutions.manage_solutions",
      },
      {
        href: `${routes.solutions}/${routes.solutionsSeo}`,
        title: "general.seo_settings",
      },
    ],
  },

  {
    href: routes.header,
    icon: HeaderIcon,
    title: "header.header",
  },
  {
    href: routes.footer,
    icon: FooterIcon,
    title: "footer.footer",
  },
  {
    href: routes.clients,
    icon: GlobalIcon,
    title: "clients.clients",
  },
  {
    href: routes.settings,
    icon: SettingsIcon,
    title: "settings.settings",
  },
];
