import PageBanner from "@/components/common/pageBanner";
import AllSolutions from "@/components/pages/solutions/allSolutions";
import CoreSolutions from "@/components/pages/solutions/coreSolutions";
import { getSolutions } from "@/components/pages/solutions/getSolutions";
import { getSolutionsMainData } from "@/components/pages/solutions/getSolutionsMainData";
import OurCapabilities from "@/components/pages/solutions/ourCapabilities";
import WhatWeOffer from "@/components/pages/solutions/whatWeOffer";
import { LanguageType } from "@/i18n.config";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { parseKeywords } from "../../../../utils/parseKeywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageType }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const [{ site_name }, seoData] = await Promise.all([
    getSeoForPage("home", locale),
    getSeoForPage("solutions", locale),
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

  const currentUrl = `https://www.creation.sa/${locale}/solutions`;

  return {
    title,
    description,

    ...(keywords?.length && { keywords }),

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/solutions`,
        en: `https://www.creation.sa/en/solutions`,
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

export default async function Solutions() {
  const locale = await getCurrentLocale();

  const [{ home }, solutions, mainData] = await Promise.all([
    getTrans(locale, "common"),
    getSolutions(locale),
    getSolutionsMainData(locale),
  ]);

  return (
    <>
      <PageBanner pageTitle={mainData.first_title} home={home} />

      <CoreSolutions
        solutions={solutions}
        locale={locale}
        mainData={mainData}
      />

      <WhatWeOffer mainData={mainData} locale={locale} />

      <AllSolutions mainData={mainData} locale={locale} />

      <OurCapabilities mainData={mainData} locale={locale} />
    </>
  );
}
