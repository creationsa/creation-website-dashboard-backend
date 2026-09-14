import DynamicSvg from "@/components/ui/DynamicSvg";
import Link from "next/link";
import { SolutionCardProps } from "../types";

export default function SolutionCard({ locale, solution }: SolutionCardProps) {
  return (
    <li>
      <Link
        href={`/${locale}/solutions/${solution.slug}`}
        className="group flex flex-col gap-4"
        aria-label={solution.title}
      >
        {solution.icon && (
          <div className="dark:group-hover:bg-white-100 group-hover:bg-black-800 dark:bg-black-400 bg-white-700 flex w-fit items-center justify-center rounded-full p-2 transition-all duration-300 sm:p-4">
            <DynamicSvg
              src={solution.icon}
              className="svg-solution-wrapper size-7 sm:size-10"
              title={solution.title}
            />
          </div>
        )}
        <h3 className="text-lg transition-all duration-300 group-hover:underline sm:text-2xl">
          {solution.title}
        </h3>
        <p className="max-w-[90%] transition-all duration-300 group-hover:underline">
          {solution.small_description}
        </p>
      </Link>
    </li>
  );
}
