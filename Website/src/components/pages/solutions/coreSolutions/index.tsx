"use client";

import Header from "@/components/ui/Header";
import { SolutionsCoreProps } from "../types";
import SolutionCard from "./SolutionCard";

export default function CoreSolutions({
  mainData,
  solutions,
  locale,
}: SolutionsCoreProps) {
  return (
    <section className="container flex flex-col justify-between gap-20">
      {/* HEADER */}
      <Header
        title={mainData.first_title}
        description={mainData.second_title}
        subDescription={mainData.third_title}
        hasContainer={false}
        lang={locale}
        styles="w-full"
      />

      <ul className="grid grid-cols-1 gap-10 sm:ms-auto md:grid-cols-2 lg:w-2/3 lg:gap-x-10 lg:gap-y-16">
        {/* SOLUTIONS */}
        {solutions.map((solution) => (
          <SolutionCard
            key={solution.slug}
            solution={solution}
            locale={locale}
          />
        ))}
      </ul>
    </section>
  );
}
