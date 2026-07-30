import Navigation from "@/components/common/navigation";
import { SOLUTION_DETAILS } from "../solutionDetailsData";
import { SolutionNavigationProps } from "../types";

export default function SolutionNavigation({
  slug,
  locale,
  solution_details,
  previousLabel,
  nextLabel,
}: SolutionNavigationProps) {
  const currentIndex = SOLUTION_DETAILS.findIndex((s) => s.slug === slug);
  const total = SOLUTION_DETAILS.length;

  const prevSolution = SOLUTION_DETAILS[(currentIndex - 1 + total) % total];
  const nextSolution = SOLUTION_DETAILS[(currentIndex + 1) % total];

  return (
    <Navigation
      locale={locale}
      basePath="solutions"
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      prevItem={{
        slug: prevSolution.slug,
        title: solution_details[prevSolution.translationKey].title,
      }}
      nextItem={{
        slug: nextSolution.slug,
        title: solution_details[nextSolution.translationKey].title,
      }}
    />
  );
}
