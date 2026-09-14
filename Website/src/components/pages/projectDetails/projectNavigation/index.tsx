import Navigation from "@/components/common/navigation";
import { ProjectNavigationProps } from "../types";

export default function ProjectNavigation({
  locale,
  previousLabel,
  nextLabel,
  prevItem,
  nextItem,
}: ProjectNavigationProps) {
  return (
    <Navigation
      locale={locale}
      basePath="projects"
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      prevItem={{
        slug: prevItem.slug,
        title: prevItem.title,
        image: prevItem.image ?? undefined,
      }}
      nextItem={{
        slug: nextItem.slug,
        title: nextItem.title,
        image: nextItem.image ?? undefined,
      }}
    />
  );
}
