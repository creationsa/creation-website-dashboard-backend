import Header from "@/components/ui/Header";
import SolutionsTicker from "../../solutionDetails/solutionsTicker";
import { AllSolutionsProps } from "../types";

export default function AllSolutions({
  solutions,
  locale,
  news,
}: AllSolutionsProps) {
  return (
    <section className="container">
      {/* HEADER */}
      <Header
        description={solutions.all_services_description}
        subDescription={solutions.all_services_sub_description}
        lang={locale}
        hasContainer={false}
        inlineHeadings
        styles="w-full mb-20 xl:w-[80%]"
      />

      {/* NEWS */}
      <SolutionsTicker news={news} />
    </section>
  );
}
