import { routes } from "@/app/navigation/routes";

export const resources = {
  blogs: {
    href: `${routes.blogs}/${routes.createBlog}`,
    titleKey: "blogs.titleWithArticle",
  },
  projects: {
    href: `${routes.projects}/${routes.createProject}`,
    titleKey: "projects.titleWithArticle",
  },
  solutions: {
    href: `${routes.solutions}/${routes.createSolution}`,
    titleKey: "solutions.titleWithArticle",
  },
  pages: {
    href: `${routes.pagesBuilder}/${routes.createPage}`,
    titleKey: "pages.titleWithArticle",
  },
};
