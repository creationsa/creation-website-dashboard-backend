export const endpoints = {
  blogs: {
    root: "website/blogs",
    detail: (slug: string) => `website/blogs/${slug}`,
    home: "website/home-blogs",
    slugs: "website/blogs/slugs",
  },
  seo: {
    root: (title: string) => `website/metadata/${title}`,
  },
  header: {
    root: "website/header",
  },
  footer: {
    root: "website/footer",
  },
  clients: {
    root: "website/clients",
  },
  pageBuilder: {
    root: "website/page-builder",
    detail: (slug: string) => `website/page-builder/${slug}`,
    slugs: "website/page-builder/slugs",
  },
  projects: {
    root: "website/projects",
    detail: (slug: string) => `website/projects/${slug}`,
    slugs: "website/projects/slugs",
    mainData: "website/projects-main-data",
  },
  solutions: {
    root: "website/solutions",
    detail: (slug: string) => `website/solutions/${slug}`,
    slugs: "website/solutions/slugs",
    mainData: "website/solutions-main-data",
  },
};
