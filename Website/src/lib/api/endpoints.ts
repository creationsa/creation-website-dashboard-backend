export const endpoints = {
  blogs: {
    root: "website/blogs",
    detail: (slug: string) => `website/blogs/${slug}`,
    home: "website/home-blogs",
    slugs: "website/blogs?only_slug=1",
  },
  seo: {
    root: (title: string) => `website/metadata/${title}`,
  },
  pageBuilder: {
    root: "website/page-builder",
  },
};
