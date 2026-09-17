import PageBanner from "@/components/common/pageBanner";
import SectionRenderer from "@/components/pages/dynamicPage/SectionRenderer";
import { getPageBySlug } from "@/components/pages/dynamicPage/getPageBySlug";
import { getPageSlugs } from "@/components/pages/dynamicPage/getPageSlugs";
import { DynamicPageProps } from "@/components/pages/dynamicPage/types";
import { Languages } from "@/constants/enums";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseKeywords } from "../../../utils/parseKeywords";

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (slug === "home") return {};

  let pageData;
  try {
    pageData = await getPageBySlug(slug, locale);
  } catch {
    return {};
  }

  const { site_name } = await getSeoForPage("home", locale);

  const {
    title: seoTitle,
    description,
    image,
    image_alt,
    image_type,
  } = pageData.seo;

  const keywords = pageData.seo.keywords
    ? parseKeywords(pageData.seo.keywords)
    : undefined;

  const title = `${site_name} | ${seoTitle}`;
  const currentUrl = `https://www.creation.sa/${locale}/${slug}`;

  return {
    title,
    description,

    ...(keywords?.length && {
      keywords,
    }),

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/${slug}`,
        en: `https://www.creation.sa/en/${slug}`,
      },
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: currentUrl,

      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: image_alt || pageData.title,
              type: image_type || "image/png",
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
      site: currentUrl,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getPageSlugs(Languages.ENGLISH).catch(() => []);

  return slugs.flatMap(({ slug }) => [
    { locale: Languages.ARABIC, slug },
    { locale: Languages.ENGLISH, slug },
  ]);
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug, locale } = await params;

  if (slug === "home") return notFound();

  let pageData;
  try {
    pageData = await getPageBySlug(slug, locale);
  } catch {
    return notFound();
  }

  const { home } = await getTrans(locale, "common");

  return (
    <>
      <PageBanner pageTitle={pageData.title} home={home} />

      {pageData.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} locale={locale} />
      ))}
    </>
  );
}
