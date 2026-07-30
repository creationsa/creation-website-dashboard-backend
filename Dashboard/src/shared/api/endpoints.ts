export const endpoints = {
  auth: {
    login: "/dashboard/admin/login",
    logout: "/dashboard/admin/logout",
    profile: "/dashboard/admin/profile",
    updateProfile: "/dashboard/admin/profile/update",
  },
  blogs: {
    root: "/dashboard/admin/blogs",
    byId: (id: number | string) => `/dashboard/admin/blogs/${id}`,
  },
  seo: {
    root: "/dashboard/admin/metadata",
    byId: (id: number | string) => `/dashboard/admin/metadata/${id}`,
    byModal: (forType: string) => `/dashboard/admin/metadata?for=${forType}`,
  },
  pageBuilder: {
    root: "/dashboard/admin/page",
    byId: (id: number | string) => `/dashboard/admin/page/${id}`,
  },
  projects: {
    root: "/dashboard/admin/projects",

    allProjects: "/dashboard/admin/allProjects",
    byId: (id: number | string) => `/dashboard/admin/allProjects/${id}`,
  },
  solutions: {
    root: "/dashboard/admin/solutions",

    allSolutions: "/dashboard/admin/allSolutions",
    byId: (id: number | string) => `/dashboard/admin/allSolutions/${id}`,
  },
  settings: {
    root: "/dashboard/admin/settings",
  },
  footer: {
    root: "/dashboard/admin/footer",
  },
};
