"use client";

import Header from "@/components/ui/Header";
import { SolutionsCoreProps } from "../types";
import SolutionCard from "./SolutionCard";
import { ALL_SOLUTIONS } from "./solutionsData";

export default function CoreSolutions({
  solutions,
  locale,
}: SolutionsCoreProps) {
  return (
    <section className="container flex flex-col justify-between gap-20">
      {/* HEADER */}
      <Header
        title={solutions.core_services}
        description={solutions.core_services_description}
        subDescription={solutions.core_services_sub_description}
        hasContainer={false}
        lang={locale}
        styles="w-full"
      />

      <ul className="grid grid-cols-1 gap-10 sm:ms-auto md:grid-cols-2 lg:w-2/3 lg:gap-x-10 lg:gap-y-16">
        {/* SOLUTIONS */}
        {ALL_SOLUTIONS.map((solution) => (
          <SolutionCard
            key={solution.title}
            solution={solution}
            locale={locale}
            translations={solutions}
          />
        ))}
      </ul>
    </section>
  );
}
