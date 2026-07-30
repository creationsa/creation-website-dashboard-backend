import { StatsSectionProps } from "../types";
import StatsItem from "./StatsItem";

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-5 xl:ms-auto xl:gap-14">
      {stats.map((stat) => (
        <StatsItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}
