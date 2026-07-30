import type { SolutionGridProps } from "../types";
import SolutionCard from "./SolutionCard";

export default function SolutionsGrid({ solutions }: SolutionGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {solutions.map((solution) => (
        <SolutionCard key={solution.id} solution={solution} />
      ))}
    </div>
  );
}
