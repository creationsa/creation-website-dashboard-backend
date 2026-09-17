import { MetadataRoute } from "next";
import { getPageSlugs } from "@/components/pages/dynamicPage/getPageSlugs";
import { getProjectSlugs } from "@/components/pages/projectDetails/getProjectSlugs";
import { getSolutionSlugs } from "@/components/pages/solutionDetails/getSolutionSlugs";
import { getBlogSlugs } from "@/components/pages/blogsDetails/getBlogSlugs";
import { Languages } from "@/constants/enums";

const BASE_URL = "https://www.creation.sa";
const LOCALES = ["ar", "en"] as const;

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function entries(
  pathAr: string,
  pathEn: string,
  options: {
    priority: number;
    changeFrequency: ChangeFrequency;
    lastModified?: string;
  },
): MetadataRoute.Sitemap {
  const paths = { ar: pathAr, en: pathEn };
  const lastModified = options.lastModified
    ? new Date(options.lastModified)
    : undefined;

  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${paths[locale]}`,
    ...(lastModified && { lastModified }),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: {
        ar: `${BASE_URL}/ar${paths.ar}`,
        en: `${BASE_URL}/en${paths.en}`,
      },
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, projects, solutions, blogs] = await Promise.all([
    getPageSlugs(Languages.ENGLISH).catch(() => []),
    getProjectSlugs(Languages.ENGLISH).catch(() => []),
    getSolutionSlugs(Languages.ENGLISH).catch(() => []),
    getBlogSlugs(Languages.ENGLISH).catch(() => []),
  ]);

  return [
    ...entries("", "", { priority: 1, changeFrequency: "weekly" }),

    ...entries("/solutions", "/solutions", {
      priority: 0.9,
      changeFrequency: "weekly",
    }),
    ...entries("/projects", "/projects", {
      priority: 0.9,
      changeFrequency: "weekly",
    }),
    ...entries("/blogs", "/blogs", {
      priority: 0.9,
      changeFrequency: "weekly",
    }),

    ...pages.flatMap((page) =>
      entries(`/${page.slug}`, `/${page.slug}`, {
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: page.updated_at,
      }),
    ),

    ...projects.flatMap((project) =>
      entries(`/projects/${project.slug_ar}`, `/projects/${project.slug_en}`, {
        priority: 0.8,
        changeFrequency: "monthly",
        lastModified: project.updated_at,
      }),
    ),

    ...solutions.flatMap((solution) =>
      entries(
        `/solutions/${solution.slug_ar}`,
        `/solutions/${solution.slug_en}`,
        {
          priority: 0.8,
          changeFrequency: "monthly",
          lastModified: solution.updated_at,
        },
      ),
    ),

    ...blogs.flatMap((blog) =>
      entries(`/blogs/${blog.slug_ar}`, `/blogs/${blog.slug_en}`, {
        priority: 0.6,
        changeFrequency: "monthly",
        lastModified: blog.updated_at,
      }),
    ),
  ];
}
