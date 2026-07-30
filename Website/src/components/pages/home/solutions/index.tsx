import Header from "@/components/ui/Header";
import SolutionItem from "./SolutionItem";
import { OUR_SOLUTIONS } from "./solutionsData";
import { SolutionsProps } from "./types";

export default function Solutions({
  solutions,
  project_details,
  locale,
}: SolutionsProps) {
  return (
    <section className="container">
      <Header
        title={solutions.header_title}
        description={solutions.header_description}
        subDescription={solutions.header_sub_description}
        lang={locale}
        hasContainer={false}
      />
      <div className="mt-10 flex flex-col gap-10">
        {OUR_SOLUTIONS.map((solution, index) => (
          <SolutionItem
            key={solution.title}
            solution={solution}
            index={index}
            total={OUR_SOLUTIONS.length}
            locale={locale}
            solutions={solutions}
            projectDetails={project_details}
          />
        ))}
      </div>
    </section>
  );
}
