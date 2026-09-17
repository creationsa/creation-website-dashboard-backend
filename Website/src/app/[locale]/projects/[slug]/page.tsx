import News from "@/components/common/news";
import PageBanner from "@/components/common/pageBanner";
import SmartMedia from "@/components/ui/SmartMedia";
import AboutTheProject from "@/components/pages/projectDetails/aboutTheProject";
import { getProjectBySlug } from "@/components/pages/projectDetails/getProjectBySlug";
import { getProjectSlugs } from "@/components/pages/projectDetails/getProjectSlugs";
import Images from "@/components/pages/projectDetails/images";
import ProjectNavigation from "@/components/pages/projectDetails/projectNavigation";
import Results from "@/components/pages/projectDetails/results";
import { ProjectDetailsProps } from "@/components/pages/projectDetails/types";
import { Languages } from "@/constants/enums";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseKeywords } from "../../../../utils/parseKeywords";

export async function generateMetadata({
  params,
}: ProjectDetailsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  let projectData;
  try {
    projectData = await getProjectBySlug(slug, locale);
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
  } = projectData.seo;
  const title = `${site_name} | ${seoTitle}`;
  const currentUrl = `https://www.creation.sa/${locale}/projects/${slug}`;

  const keywords = projectData.seo.keywords
    ? parseKeywords(projectData.seo.keywords)
    : undefined;

  return {
    title,
    description,

    ...(keywords?.length && { keywords }),

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/projects/${slug}`,
        en: `https://www.creation.sa/en/projects/${slug}`,
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
              alt: image_alt || projectData.title,
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
  const slugs = await getProjectSlugs(Languages.ENGLISH).catch(() => []);

  return slugs.flatMap((project) => [
    { locale: Languages.ARABIC, slug: project.slug_en },
    { locale: Languages.ENGLISH, slug: project.slug_en },
  ]);
}

export default async function ProjectDetails({ params }: ProjectDetailsProps) {
  const { slug, locale } = await params;

  let projectData;
  try {
    projectData = await getProjectBySlug(slug, locale);
  } catch {
    return notFound();
  }

  const { home, previous, next } = await getTrans(locale, "common");

  return (
    <>
      <PageBanner pageTitle={projectData.title} home={home} />

      {projectData.main_image?.file && (
        <section className="-mt-20 space-y-20">
          <div className="relative aspect-4001/1392 w-full">
            <SmartMedia
              media={projectData.main_image}
              alt={projectData.title}
              className="absolute inset-0 h-full w-full object-cover"
              quality={90}
              sizes="(min-width: 1280px) 1280px, 100vw"
            />
          </div>
        </section>
      )}

      <AboutTheProject
        locale={locale}
        data={projectData}
        certainImage={projectData.about_image}
      />

      <Results data={projectData} />

      <Images images={projectData.gallery} title={projectData.title} />

      {projectData.ticker_items.length > 0 && (
        <News data={projectData.ticker_items} />
      )}

      {/* PROJECT NAVIGATION */}
      {projectData.prev && projectData.next && (
        <ProjectNavigation
          locale={locale}
          prevItem={projectData.prev}
          nextItem={projectData.next}
          previousLabel={previous}
          nextLabel={next}
        />
      )}
    </>
  );
}
