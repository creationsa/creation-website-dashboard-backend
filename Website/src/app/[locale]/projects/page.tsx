import Clients from "@/components/common/clients";
import { getClients } from "@/components/common/clients/getClients";
import PageBanner from "@/components/common/pageBanner";
import AllProjects from "@/components/pages/project/AllProjects";
import { getProjects } from "@/components/pages/project/getProjects";
import { getProjectsMainData } from "@/components/pages/project/getProjectsMainData";
import { LanguageType } from "@/i18n.config";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { parseKeywords } from "../../../utils/parseKeywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageType }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const [{ site_name }, seoData] = await Promise.all([
    getSeoForPage("home", locale),
    getSeoForPage("projects", locale),
  ]);

  const {
    title: seoTitle,
    description,
    image,
    image_alt,
    image_type,
  } = seoData;

  const title = `${site_name} | ${seoTitle}`;

  const keywords = seoData.keywords
    ? parseKeywords(seoData.keywords)
    : undefined;

  const currentUrl = `https://www.creation.sa/${locale}/projects`;

  return {
    title,
    description,

    ...(keywords?.length && { keywords }),

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/projects`,
        en: `https://www.creation.sa/en/projects`,
      },
    },

    openGraph: {
      type: "website",
      url: currentUrl,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: image_alt,
          type: image_type || "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: currentUrl,
    },
  };
}

export default async function Project() {
  const locale = await getCurrentLocale();

  const [{ home }, project, clients, projects, mainData] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "project"),
    getClients(locale),
    getProjects(locale),
    getProjectsMainData(locale),
  ]);

  return (
    <>
      <PageBanner
        pageTitle={project.header_title}
        home={home}
        titleCut={project.title_cut}
      />

      <AllProjects mainData={mainData} locale={locale} projects={projects} />

      <Clients data={clients} />
    </>
  );
}
