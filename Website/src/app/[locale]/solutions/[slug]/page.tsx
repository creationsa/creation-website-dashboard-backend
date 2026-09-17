import ContactForm from "@/components/common/contactForm";
import News from "@/components/common/news";
import PageBanner from "@/components/common/pageBanner";
import DeepDetails from "@/components/pages/solutionDetails/deepDetails";
import { getSolutionBySlug } from "@/components/pages/solutionDetails/getSolutionBySlug";
import { getSolutionSlugs } from "@/components/pages/solutionDetails/getSolutionSlugs";
import ImageCarousel from "@/components/pages/solutionDetails/imageCarousel";
import MainSection from "@/components/pages/solutionDetails/mainSection";
import SolutionNavigation from "@/components/pages/solutionDetails/solutionNavigation";
import { SolutionDetailsProps } from "@/components/pages/solutionDetails/types";
import { Languages } from "@/constants/enums";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseKeywords } from "../../../../utils/parseKeywords";

export async function generateMetadata({
  params,
}: SolutionDetailsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  let solutionData;
  try {
    solutionData = await getSolutionBySlug(slug, locale);
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
  } = solutionData.seo;

  const title = `${site_name} | ${seoTitle}`;

  const currentUrl = `https://www.creation.sa/${locale}/solutions/${slug}`;
  const keywords = solutionData.seo.keywords
    ? parseKeywords(solutionData.seo.keywords)
    : undefined;

  return {
    title,
    description,

    ...(keywords?.length && { keywords }),

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/solutions/${slug}`,
        en: `https://www.creation.sa/en/solutions/${slug}`,
      },
    },

    openGraph: {
      type: "website",
      title,
      description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: image_alt || solutionData.title,
              type: image_type || "image/jpeg",
            },
          ]
        : [],
      url: currentUrl,
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
  const slugs = await getSolutionSlugs(Languages.ENGLISH).catch(() => []);

  return slugs.flatMap((solution) => [
    { locale: Languages.ARABIC, slug: solution.slug_en },
    { locale: Languages.ENGLISH, slug: solution.slug_en },
  ]);
}

export default async function SolutionDetails({
  params,
}: SolutionDetailsProps) {
  const { slug, locale } = await params;

  let solutionData;
  try {
    solutionData = await getSolutionBySlug(slug, locale);
  } catch {
    return notFound();
  }

  const [{ home, previous, next }, contact, form_errors] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "contact"),
    getTrans(locale, "formErrors"),
  ]);

  return (
    <>
      <PageBanner pageTitle={solutionData.title} home={home} />

      {/* MAIN SECTION */}
      <MainSection locale={locale} data={solutionData} />

      {/* DEEP DETAILS */}
      <DeepDetails data={solutionData} />

      {/* IMAGE SECTION */}
      <ImageCarousel
        images={solutionData.gallery}
        solutionTitle={solutionData.title}
      />

      {/* SOLUTION NAVIGATION */}
      {solutionData.prev && solutionData.next && (
        <SolutionNavigation
          locale={locale}
          prevItem={solutionData.prev}
          nextItem={solutionData.next}
          previousLabel={previous}
          nextLabel={next}
        />
      )}

      {/* NEWS */}
      <News data={solutionData.ticker_items} hasBorder />

      {/* CONTACT FORM */}
      <ContactForm
        contact={contact}
        locale={locale}
        form_errors={form_errors}
      />
    </>
  );
}
