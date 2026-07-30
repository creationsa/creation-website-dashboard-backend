import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.creation.sa";

  const pages = [
    "",
    "/about",
    "/solutions",
    "/solutions/branding",
    "/solutions/digital-marketing",
    "/solutions/web-design",
    "/solutions/production",
    "/projects",
    "/projects/mouj",
    "/projects/boulevard-world",
    "/projects/maybach-boutique",
    "/projects/errva",
    "/projects/tasier",
    "/projects/nozomi",
    "/projects/cupic",
    "/projects/phase",
    "/projects/darf",
    "/projects/btic-group",
    "/projects/damons",
    "/projects/shovel",
    "/blogs",
    "/blogs/eco-system-architecture",
    "/blogs/branding-transformation-structure",
    "/blogs/ai-powered-business-operations",
    "/blogs/beyond-digital-transformation",
    "/blogs/spatial-experience-design",
    "/blogs/quantum-resistant-digital-trust",
    "/blogs/hyper-localized-generative-ops",
    "/career",
    "/faq",
    "/contact",
  ];

  const locales = ["/ar", "/en"];

  const routes = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${locale}${page}`,
      lastModified: new Date(),
      priority: page === "" ? 1 : 0.8,
      changeFrequency: "monthly" as const,
    })),
  );

  return routes;
}
