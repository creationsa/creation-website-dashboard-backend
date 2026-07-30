import PageBanner from "@/components/common/pageBanner";
import ContactForm from "@/components/pages/contact/contactForm";
import DeepDetails from "@/components/pages/solutionDetails/deepDetails";
import ImageCarousel from "@/components/pages/solutionDetails/imageCarousel";
import MainSection from "@/components/pages/solutionDetails/mainSection";
import { SOLUTION_DETAILS } from "@/components/pages/solutionDetails/solutionDetailsData";
import SolutionNavigation from "@/components/pages/solutionDetails/solutionNavigation";
import SolutionsTicker from "@/components/pages/solutionDetails/solutionsTicker";
import { SolutionDetailsProps } from "@/components/pages/solutionDetails/types";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: SolutionDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();

  const solutionConfig = SOLUTION_DETAILS.find(
    (solution) => solution.slug === slug,
  );

  if (!solutionConfig) {
    return {};
  }

  const [common, solution_details] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "solutionDetails"),
  ]);

  const solutionData = solution_details[solutionConfig.translationKey];

  if (!solutionData) {
    return {};
  }

  const title = `${common.creation} | ${solutionData.title}`;
  const description = solutionData.seo_description;

  const currentUrl = `https://www.creation.sa/${locale}/solutions/${slug}`;
  const imageUrl = `https://www.creation.sa/images/home/creation-seo-${locale}-cover.jpg`;

  return {
    title,
    description,

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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: solutionData.title,
          type: "image/jpeg",
        },
      ],
      url: currentUrl,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: currentUrl,
    },
  };
}

export function generateStaticParams() {
  return SOLUTION_DETAILS.map((s) => ({ slug: s.slug }));
}

export default async function SolutionDetails({
  params,
}: SolutionDetailsProps) {
  const { slug } = await params;
  const locale = await getCurrentLocale();

  const solutionConfig = SOLUTION_DETAILS.find(
    (solution) => solution.slug === slug,
  );

  if (!solutionConfig) {
    return notFound();
  }

  const [
    { home, previous, next },
    contact,
    form_errors,
    news,
    solution_details,
  ] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "contact"),
    getTrans(locale, "formErrors"),
    getTrans(locale, "news"),
    getTrans(locale, "solutionDetails"),
  ]);

  const solutionData = solution_details[solutionConfig.translationKey];

  if (!solutionData) {
    return notFound();
  }

  return (
    <>
      <PageBanner pageTitle={solutionData.title} home={home} />

      {/* MAIN SECTION */}
      <MainSection
        locale={locale}
        solutionData={solutionData}
        solution_details={solution_details}
      />

      {/* DEEP DETAILS */}
      <DeepDetails
        solutionData={solutionData}
        solution_details={solution_details}
      />

      {/* IMAGE SECTION */}
      <ImageCarousel
        images={solutionConfig.images}
        solutionTitle={solutionData.title}
      />

      {/* SOLUTION NAVIGATION */}
      <SolutionNavigation
        slug={slug}
        locale={locale}
        solution_details={solution_details}
        previousLabel={previous}
        nextLabel={next}
      />

      {/* NEWS */}
      <SolutionsTicker news={news} />

      {/* CONTACT FORM */}
      <ContactForm
        contact={contact}
        locale={locale}
        form_errors={form_errors}
      />
    </>
  );
}
