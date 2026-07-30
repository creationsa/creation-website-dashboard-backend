import BackgroundImageMainSection from "@/components/common/backgroundImageMainSection";
import News from "@/components/common/news";
import PageBanner from "@/components/common/pageBanner";
import AboutTheProject from "@/components/pages/projectDetails/aboutTheProject";
import Images from "@/components/pages/projectDetails/images";
import { PROJECT_DETAILS } from "@/components/pages/projectDetails/projectDetailsData";
import ProjectNavigation from "@/components/pages/projectDetails/projectNavigation";
import Results from "@/components/pages/projectDetails/results";
import { ProjectDetailsProps } from "@/components/pages/projectDetails/types";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: ProjectDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();

  const projectConfig = PROJECT_DETAILS.find(
    (project) => project.slug === slug,
  );

  if (!projectConfig) {
    return {};
  }

  const [project_details, common] = await Promise.all([
    getTrans(locale, "projectDetails"),
    getTrans(locale, "common"),
  ]);

  const projectData = project_details[projectConfig.translationKey];

  if (!projectData) {
    return {};
  }

  const title = `${common.creation} | ${projectData.title}`;
  const description = projectData.about_project_paragraph_summary;

  const currentUrl = `https://www.creation.sa/${locale}/projects/${slug}`;

  const image = `https://www.creation.sa/images/project/${projectConfig.seoImage}/creation_SEO_Image.jpg`;

  return {
    title,
    description,

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

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: projectData.title,
          type: "image/jpeg",
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

export function generateStaticParams() {
  return PROJECT_DETAILS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetails({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const locale = await getCurrentLocale();

  const projectConfig = PROJECT_DETAILS.find(
    (project) => project.slug === slug,
  );

  if (!projectConfig) {
    return notFound();
  }

  const [{ home, previous, next }, project_details] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "projectDetails"),
  ]);

  const projectData = project_details[projectConfig.translationKey];

  if (!projectData) {
    return notFound();
  }
  return (
    <>
      <PageBanner pageTitle={projectData.title} home={home} />

      <BackgroundImageMainSection
        certainImage={projectConfig.mainImage}
        alt={projectData.title}
      />

      <AboutTheProject
        locale={locale}
        project={projectData}
        title={project_details.about_project}
        certainImage={projectConfig.aboutImage}
      />

      <Results projectData={projectData} translations={project_details} />

      <Images
        images={projectConfig.images}
        title={projectData.title}
        translations={project_details}
      />

      <News data={project_details.items} noBackground />

      {/* PROJECT NAVIGATION */}
      <ProjectNavigation
        slug={slug}
        locale={locale}
        project_details={project_details}
        previousLabel={previous}
        nextLabel={next}
      />
    </>
  );
}
