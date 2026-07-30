export const queryKeys = {
  blogs: ["blogs"] as const,
  blog: (id: number) => ["blog", id] as const,
  settings: ["settings"] as const,

  projectsMainData: ["projectsMainData"] as const,
  projects: ["projects"] as const,
  project: (id: number) => ["project", id] as const,

  solutionsMainData: ["solutionsMainData"] as const,
  solutions: ["solutions"] as const,
  solution: (id: number) => ["solution", id] as const,

  seo: ["seo"] as const,
  seoId: (id: number) => ["seoId", id] as const,
  seoModal: (modal: string) => ["seoModal", modal] as const,

  pages: ["pages"] as const,
  page: (id: number) => ["page", id] as const,

  footer: ["footer"] as const,
  profile: ["profile"] as const,
};
