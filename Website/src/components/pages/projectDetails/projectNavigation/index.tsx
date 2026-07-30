import Navigation from "@/components/common/navigation";
import { PROJECT_DETAILS } from "../projectDetailsData";
import { ProjectNavigationProps } from "../types";

export default function ProjectNavigation({
  slug,
  locale,
  project_details,
  previousLabel,
  nextLabel,
}: ProjectNavigationProps) {
  const currentIndex = PROJECT_DETAILS.findIndex((p) => p.slug === slug);
  const total = PROJECT_DETAILS.length;

  const prevProject = PROJECT_DETAILS[(currentIndex - 1 + total) % total];
  const nextProject = PROJECT_DETAILS[(currentIndex + 1) % total];

  return (
    <Navigation
      locale={locale}
      basePath="projects"
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      prevItem={{
        slug: prevProject.slug,
        title: project_details[prevProject.translationKey].title,
        image: prevProject.images[2],
      }}
      nextItem={{
        slug: nextProject.slug,
        title: project_details[nextProject.translationKey].title,
        image: nextProject.images[2],
      }}
    />
  );
}
