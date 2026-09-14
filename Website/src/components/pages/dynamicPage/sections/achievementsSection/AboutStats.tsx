import StatItem from "./StatItem";
import { AboutStatsProps } from "./types";

export default function AboutStats({ stats, description }: AboutStatsProps) {
  return (
    <div className="dark:bg-black-800 bg-white-200 flex h-full w-fit flex-col gap-4 p-10">
      <div className="grid grid-cols-2 gap-6 sm:gap-10">
        {stats.map((stat, index) => (
          <StatItem key={index} value={stat.value} label={stat.label} />
        ))}
      </div>

      <div className="border-t" />

      <p className="max-w-[466px]">{description}</p>
    </div>
  );
}
