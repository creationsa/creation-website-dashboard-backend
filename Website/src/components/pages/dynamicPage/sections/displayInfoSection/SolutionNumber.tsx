import { SolutionNumberProps } from "./types";

export default function SolutionNumber({
  current,
  total,
}: SolutionNumberProps) {
  return (
    <div className="flex items-center gap-1 sm:justify-between sm:gap-0">
      <span>{current}</span>
      <span>/ {total}</span>
    </div>
  );
}
