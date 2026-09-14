import Navigation from "@/components/common/navigation";
import { SolutionNavigationProps } from "../types";

export default function SolutionNavigation({
  locale,
  previousLabel,
  nextLabel,
  prevItem,
  nextItem,
}: SolutionNavigationProps) {
  return (
    <Navigation
      locale={locale}
      basePath="solutions"
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      prevItem={{
        slug: prevItem.slug,
        title: prevItem.title,
      }}
      nextItem={{
        slug: nextItem.slug,
        title: nextItem.title,
      }}
    />
  );
}
