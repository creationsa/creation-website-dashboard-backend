import { formatNumber } from "./numberFormat";
import ProjectCard from "./ProjectCard";
import SolutionInfo from "./SolutionInfo";
import { SolutionItemProps } from "./types";

export default function SolutionItem({
  solution,
  index,
  total,
  locale,
  solutions,
  projectDetails,
}: SolutionItemProps) {
  const current = formatNumber(index + 1);
  const totalFormatted = formatNumber(total);

  return (
    <div className="flex flex-col gap-8 border-b last:border-0 sm:pb-10 sm:last:border-b lg:grid xl:grid-cols-3">
      <SolutionInfo
        current={current}
        total={totalFormatted}
        title={solutions[solution.title]}
        description={solutions[solution.description]}
        link={`/${locale}/${solution.link}`}
        exploreLabel={solutions.explore_now}
      />

      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-x-visible xl:contents">
        {solution.projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            locale={locale}
            firstImage={project.firstImage}
            title={projectDetails[project.translationKey].title}
            description={
              projectDetails[project.translationKey]
                .about_project_paragraph_summary
            }
          />
        ))}
      </div>
    </div>
  );
}
